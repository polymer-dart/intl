var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Intl_1, TextDirection_1, Bidi_1, DateFormat_1, NumberFormat_1, _NumberFormatParser_1, _StringIterator_1, _MicroMoney_1, _CompactNumberFormat_1, _DateFormatQuotedField_1;
/** Library asset:intl/lib/intl.dart */
import { is, isNot } from "@dart2ts/dart/_common";
import { defaultConstructor, namedConstructor, namedFactory, defaultFactory, DartClass, Implements, op, Op, OperatorMethods, Abstract, AbstractProperty } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./src/intl_helpers";
import * as lib4 from "./src/plural_rules";
import * as convert from "@dart2ts/dart/convert";
import * as math from "@dart2ts/dart/math";
import * as lib8 from "./number_symbols_data";
import * as lib9 from "./src/date_format_internal";
export var toBeginningOfSentenceCase = (input, locale) => {
    if (input == null || new core.DartString(input).isEmpty)
        return input;
    return `${_upperCaseLetter(input[0], locale)}${new core.DartString(input).substring(1)}`;
};
export var _upperCaseLetter = (input, locale) => {
    if (locale != null) {
        if (input == "i" && new core.DartString(locale).startsWith("tr") || new core.DartString(locale).startsWith("az")) {
            return "İ";
        }
    }
    return new core.DartString(input).toUpperCase();
};
export var _dayOfYear = (month, day, leapYear) => {
    if (month == 1)
        return day;
    if (month == 2)
        return day + 31;
    return ordinalDayFromMarchFirst(month, day) + 59 + (leapYear ? 1 : 0);
};
export var _isLeapYear = (date) => {
    let feb29 = new core.DartDateTime(date.year, 2, 29);
    return feb29.month == 2;
};
export var ordinalDayFromMarchFirst = (month, day) => {
    return new core.DartDouble(((30.6 * month) - 91.4)).floor() + day;
};
export var _iterable = (s) => {
    return new _StringIterable(s);
};
export var _iterator = (s) => {
    return new _StringIterator(s);
};
let Intl = Intl_1 = class Intl {
    constructor(aLocale) {
    }
    static get defaultLocale() {
        let zoneLocale = op(Op.INDEX, async.DartZone.current, Symbol.for('Intl.locale') /* TODO (SymbolLiteralImpl): #Intl.locale */);
        return op(Op.EQUALS, zoneLocale, null) ? Intl_1._defaultLocale : zoneLocale;
    }
    static set defaultLocale(newLocale) {
        Intl_1._defaultLocale = newLocale;
    }
    static get _defaultLocale() {
        return this.__$_defaultLocale;
    }
    static set _defaultLocale(__$value) {
        this.__$_defaultLocale = __$value;
    }
    static get systemLocale() {
        if (this.__$systemLocale === undefined) {
            this.__$systemLocale = 'en_US';
        }
        return this.__$systemLocale;
    }
    static set systemLocale(__$value) {
        this.__$systemLocale = __$value;
    }
    date(pattern, desiredLocale) {
        let actualLocale = (desiredLocale == null) ? this.locale : desiredLocale;
        return new DateFormat(pattern, actualLocale);
    }
    Intl(aLocale) {
        this._locale = aLocale != null ? aLocale : Intl_1.getCurrentLocale();
    }
    static message(message_str, _namedArguments) {
        let { desc, examples, locale, name, args, meaning, skip } = Object.assign({
            "desc": '',
            "examples": new core.DartMap.literal([])
        }, _namedArguments);
        return Intl_1._message(message_str, locale, name, args, meaning);
    }
    static _message(message_str, locale, name, args, meaning) {
        return lib3.properties.messageLookup.lookupMessage(message_str, locale, name, args, meaning);
    }
    get locale() {
        return this._locale;
    }
    static verifiedLocale(newLocale, localeExists, _namedArguments) {
        let { onFailure } = Object.assign({
            "onFailure": Intl_1._throwLocaleError.bind(this)
        }, _namedArguments);
        if (newLocale == null) {
            return Intl_1.verifiedLocale(Intl_1.getCurrentLocale(), localeExists, {
                onFailure: onFailure
            });
        }
        if (localeExists(newLocale)) {
            return newLocale;
        }
        for (let each of new core.DartList.literal(Intl_1.canonicalizedLocale(newLocale), Intl_1.shortLocale(newLocale), "fallback")) {
            if (localeExists(each)) {
                return each;
            }
        }
        return onFailure(newLocale);
    }
    static _throwLocaleError(localeName) {
        throw new core.ArgumentError(`Invalid locale '${localeName}'`);
    }
    static shortLocale(aLocale) {
        if (new core.DartString(aLocale).length < 2)
            return aLocale;
        return new core.DartString(new core.DartString(aLocale).substring(0, 2)).toLowerCase();
    }
    static canonicalizedLocale(aLocale) {
        if (aLocale == null)
            return Intl_1.getCurrentLocale();
        if (aLocale == "C")
            return "en_ISO";
        if (new core.DartString(aLocale).length < 5)
            return aLocale;
        if (aLocale[2] != '-' && (aLocale[2] != '_'))
            return aLocale;
        let region = new core.DartString(aLocale).substring(3);
        if (new core.DartString(region).length <= 3)
            region = new core.DartString(region).toUpperCase();
        return `${aLocale[0]}${aLocale[1]}_${region}`;
    }
    static plural(howMany, _namedArguments) {
        let { zero, one, two, few, many, other, desc, examples, locale, name, args, meaning, skip } = Object.assign({}, _namedArguments);
        return Intl_1._plural(howMany, {
            zero: zero, one: one, two: two, few: few, many: many, other: other, locale: locale, name: name, args: args, meaning: meaning
        });
    }
    static _plural(howMany, _namedArguments) {
        let { zero, one, two, few, many, other, locale, name, args, meaning } = Object.assign({}, _namedArguments);
        let translated = Intl_1._message(null, locale, name, args, meaning);
        return (translated || Intl_1.pluralLogic(howMany, {
            zero: zero, one: one, two: two, few: few, many: many, other: other, locale: locale
        }));
    }
    static pluralLogic(howMany, _namedArguments) {
        let { zero, one, two, few, many, other, locale, meaning } = Object.assign({}, _namedArguments);
        if (op(Op.EQUALS, other, null)) {
            throw new core.ArgumentError("The 'other' named argument must be provided");
        }
        if (howMany == null) {
            throw new core.ArgumentError("The howMany argument to plural cannot be null");
        }
        if (howMany == 0 && zero != null)
            return zero;
        if (howMany == 1 && one != null)
            return one;
        if (howMany == 2 && two != null)
            return two;
        let pluralRule = Intl_1._pluralRule(locale, howMany);
        let pluralCase = pluralRule();
        switch (pluralCase) {
            case lib4.PluralCase.ZERO:
                return (zero || other);
            case lib4.PluralCase.ONE:
                return (one || other);
            case lib4.PluralCase.TWO:
                return ((two || few) || other);
            case lib4.PluralCase.FEW:
                return (few || other);
            case lib4.PluralCase.MANY:
                return (many || other);
            case lib4.PluralCase.OTHER:
                return other;
            default:
                throw new core.ArgumentError.value(howMany, "howMany", "Invalid plural argument");
        }
    }
    static get _cachedPluralRule() {
        return this.__$_cachedPluralRule;
    }
    static set _cachedPluralRule(__$value) {
        this.__$_cachedPluralRule = __$value;
    }
    static get _cachedPluralLocale() {
        return this.__$_cachedPluralLocale;
    }
    static set _cachedPluralLocale(__$value) {
        this.__$_cachedPluralLocale = __$value;
    }
    static _pluralRule(locale, howMany) {
        lib4.startRuleEvaluation(howMany);
        let verifiedLocale = Intl_1.verifiedLocale(locale, lib4.localeHasPluralRules, {
            onFailure: (locale) => {
                return 'default';
            }
        });
        if (Intl_1._cachedPluralLocale == verifiedLocale) {
            return Intl_1._cachedPluralRule;
        }
        else {
            Intl_1._cachedPluralRule = lib4.properties.pluralRules.get(verifiedLocale);
            Intl_1._cachedPluralLocale = verifiedLocale;
            return Intl_1._cachedPluralRule;
        }
    }
    static gender(targetGender, _namedArguments) {
        let { female, male, other, desc, examples, locale, name, args, meaning, skip } = Object.assign({}, _namedArguments);
        return Intl_1._gender(targetGender, {
            male: male, female: female, other: other, locale: locale, name: name, args: args, meaning: meaning
        });
    }
    static _gender(targetGender, _namedArguments) {
        let { female, male, other, desc, examples, locale, name, args, meaning } = Object.assign({}, _namedArguments);
        let translated = Intl_1._message(null, locale, name, args, meaning);
        return (translated || Intl_1.genderLogic(targetGender, {
            female: female, male: male, other: other, locale: locale
        }));
    }
    static genderLogic(targetGender, _namedArguments) {
        let { female, male, other, locale } = Object.assign({}, _namedArguments);
        if (op(Op.EQUALS, other, null)) {
            throw new core.ArgumentError("The 'other' named argument must be specified");
        }
        switch (targetGender) {
            case "female":
                return op(Op.EQUALS, female, null) ? other : female;
            case "male":
                return op(Op.EQUALS, male, null) ? other : male;
            default:
                return other;
        }
    }
    static select(choice, cases, _namedArguments) {
        let { desc, examples, locale, name, args, meaning, skip } = Object.assign({}, _namedArguments);
        return Intl_1._select(choice, cases, {
            locale: locale, name: name, args: args, meaning: meaning
        });
    }
    static _select(choice, cases, _namedArguments) {
        let { locale, name, args, meaning } = Object.assign({}, _namedArguments);
        let translated = Intl_1._message(null, locale, name, args, meaning);
        return (translated || Intl_1.selectLogic(choice, cases));
    }
    static selectLogic(choice, cases) {
        choice = `${choice}`;
        let exact = cases.get(choice);
        if (exact != null)
            return exact;
        let other = cases.get("other");
        if (op(Op.EQUALS, other, null))
            throw new core.ArgumentError("The 'other' case must be specified");
        return other;
    }
    static withLocale(locale, _function) {
        let canonical = Intl_1.canonicalizedLocale(locale);
        return async.runZoned(_function, {
            zoneValues: new core.DartMap.literal([
                [/* TODO (SymbolLiteralImpl): #Intl.locale */ Symbol.for('Intl.locale'), canonical]
            ])
        });
    }
    static getCurrentLocale() {
        if (Intl_1.defaultLocale == null)
            Intl_1.defaultLocale = Intl_1.systemLocale;
        return Intl_1.defaultLocale;
    }
    toString() {
        return `Intl(${this.locale})`;
    }
};
__decorate([
    defaultConstructor
], Intl.prototype, "Intl", null);
Intl = Intl_1 = __decorate([
    DartClass
], Intl);
export { Intl };
let BidiFormatter = class BidiFormatter {
    LTR(alwaysSpan) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.LTR;
        this._alwaysSpan = alwaysSpan;
    }
    RTL(alwaysSpan) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.RTL;
        this._alwaysSpan = alwaysSpan;
    }
    UNKNOWN(alwaysSpan) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.UNKNOWN;
        this._alwaysSpan = alwaysSpan;
    }
    get isRTL() {
        return op(Op.EQUALS, this.contextDirection, TextDirection.RTL);
    }
    wrapWithSpan(text, _namedArguments) {
        let { isHtml, resetDir, direction } = Object.assign({
            "isHtml": false,
            "resetDir": true
        }, _namedArguments);
        if (op(Op.EQUALS, direction, null))
            direction = this.estimateDirection(text, {
                isHtml: isHtml
            });
        let result;
        if (!isHtml)
            text = new convert.HtmlEscape().convert(text);
        let directionChange = this.contextDirection.isDirectionChange(direction);
        if (this._alwaysSpan || directionChange) {
            let spanDirection = '';
            if (directionChange) {
                spanDirection = ` dir=${direction.spanText}`;
            }
            result = `<span${spanDirection}>${text}</span>`;
        }
        else {
            result = text;
        }
        return op(Op.PLUS, result, (resetDir ? this._resetDir(text, direction, isHtml) : ''));
    }
    wrapWithUnicode(text, _namedArguments) {
        let { isHtml, resetDir, direction } = Object.assign({
            "isHtml": false,
            "resetDir": true
        }, _namedArguments);
        if (op(Op.EQUALS, direction, null))
            direction = this.estimateDirection(text, {
                isHtml: isHtml
            });
        let result = text;
        if (this.contextDirection.isDirectionChange(direction)) {
            let marker = op(Op.EQUALS, direction, TextDirection.RTL) ? Bidi.RLE : Bidi.LRE;
            result = `${marker}${text}${Bidi.PDF}`;
        }
        return result + (resetDir ? this._resetDir(text, direction, isHtml) : '');
    }
    estimateDirection(text, _namedArguments) {
        let { isHtml } = Object.assign({
            "isHtml": false
        }, _namedArguments);
        return Bidi.estimateDirectionOfText(text, {
            isHtml: isHtml
        });
    }
    _resetDir(text, direction, isHtml) {
        if ((op(Op.EQUALS, this.contextDirection, TextDirection.LTR) && (op(Op.EQUALS, direction, TextDirection.RTL) || Bidi.endsWithRtl(text, isHtml))) || (op(Op.EQUALS, this.contextDirection, TextDirection.RTL) && (op(Op.EQUALS, direction, TextDirection.LTR) || Bidi.endsWithLtr(text, isHtml)))) {
            return op(Op.EQUALS, this.contextDirection, TextDirection.LTR) ? Bidi.LRM : Bidi.RLM;
        }
        else {
            return '';
        }
    }
};
__decorate([
    namedConstructor
], BidiFormatter.prototype, "LTR", null);
__decorate([
    namedConstructor
], BidiFormatter.prototype, "RTL", null);
__decorate([
    namedConstructor
], BidiFormatter.prototype, "UNKNOWN", null);
BidiFormatter = __decorate([
    DartClass
], BidiFormatter);
export { BidiFormatter };
let TextDirection = TextDirection_1 = class TextDirection {
    static get LTR() {
        if (this.__$LTR === undefined) {
            this.__$LTR = new TextDirection_1._('LTR', 'ltr');
        }
        return this.__$LTR;
    }
    static get RTL() {
        if (this.__$RTL === undefined) {
            this.__$RTL = new TextDirection_1._('RTL', 'rtl');
        }
        return this.__$RTL;
    }
    static get UNKNOWN() {
        if (this.__$UNKNOWN === undefined) {
            this.__$UNKNOWN = new TextDirection_1._('UNKNOWN', 'ltr');
        }
        return this.__$UNKNOWN;
    }
    _(value, spanText) {
        this.value = value;
        this.spanText = spanText;
    }
    isDirectionChange(otherDirection) {
        return otherDirection != TextDirection_1.UNKNOWN && this != otherDirection;
    }
};
__decorate([
    namedConstructor
], TextDirection.prototype, "_", null);
TextDirection = TextDirection_1 = __decorate([
    DartClass
], TextDirection);
export { TextDirection };
let Bidi = Bidi_1 = class Bidi {
    constructor() {
    }
    static get LRE() {
        if (this.__$LRE === undefined) {
            this.__$LRE = '‪';
        }
        return this.__$LRE;
    }
    static get RLE() {
        if (this.__$RLE === undefined) {
            this.__$RLE = '‫';
        }
        return this.__$RLE;
    }
    static get PDF() {
        if (this.__$PDF === undefined) {
            this.__$PDF = '‬';
        }
        return this.__$PDF;
    }
    static get LRM() {
        if (this.__$LRM === undefined) {
            this.__$LRM = '‎';
        }
        return this.__$LRM;
    }
    static get RLM() {
        if (this.__$RLM === undefined) {
            this.__$RLM = '‏';
        }
        return this.__$RLM;
    }
    static get _RTL_DETECTION_THRESHOLD() {
        if (this.__$_RTL_DETECTION_THRESHOLD === undefined) {
            this.__$_RTL_DETECTION_THRESHOLD = 0.4;
        }
        return this.__$_RTL_DETECTION_THRESHOLD;
    }
    static set _RTL_DETECTION_THRESHOLD(__$value) {
        this.__$_RTL_DETECTION_THRESHOLD = __$value;
    }
    static get _LTR_CHARS() {
        if (this.__$_LTR_CHARS === undefined) {
            this.__$_LTR_CHARS = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590' + '\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
        }
        return this.__$_LTR_CHARS;
    }
    static get _RTL_CHARS() {
        if (this.__$_RTL_CHARS === undefined) {
            this.__$_RTL_CHARS = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
        }
        return this.__$_RTL_CHARS;
    }
    static stripHtmlIfNeeded(text) {
        return new core.DartString(text).replaceAll(new core.DartRegExp('<[^>]*>|&[^;]+;'), ' ');
    }
    static startsWithLtr(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp(`^[^${Bidi_1._RTL_CHARS}]*[${Bidi_1._LTR_CHARS}]`).hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static startsWithRtl(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp(`^[^${Bidi_1._LTR_CHARS}]*[${Bidi_1._RTL_CHARS}]`).hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static endsWithLtr(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp(`[${Bidi_1._LTR_CHARS}][^${Bidi_1._RTL_CHARS}]*$`).hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static endsWithRtl(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp(`[${Bidi_1._RTL_CHARS}][^${Bidi_1._LTR_CHARS}]*$`).hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static hasAnyLtr(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp('[' + `${Bidi_1._LTR_CHARS}` + ']').hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static hasAnyRtl(text, isHtml) {
        isHtml = isHtml || false;
        return new core.DartRegExp('[' + `${Bidi_1._RTL_CHARS}` + ']').hasMatch(isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text);
    }
    static get _rtlLocaleRegex() {
        if (this.__$_rtlLocaleRegex === undefined) {
            this.__$_rtlLocaleRegex = new core.DartRegExp('^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_]' + '(Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))' + '($|-|_)', {
                caseSensitive: false
            });
        }
        return this.__$_rtlLocaleRegex;
    }
    static set _rtlLocaleRegex(__$value) {
        this.__$_rtlLocaleRegex = __$value;
    }
    static get _lastLocaleCheckedForRtl() {
        return this.__$_lastLocaleCheckedForRtl;
    }
    static set _lastLocaleCheckedForRtl(__$value) {
        this.__$_lastLocaleCheckedForRtl = __$value;
    }
    static get _lastRtlCheck() {
        return this.__$_lastRtlCheck;
    }
    static set _lastRtlCheck(__$value) {
        this.__$_lastRtlCheck = __$value;
    }
    static isRtlLanguage(languageString) {
        let language = (languageString || Intl.getCurrentLocale());
        if (Bidi_1._lastLocaleCheckedForRtl != language) {
            Bidi_1._lastLocaleCheckedForRtl = language;
            Bidi_1._lastRtlCheck = Bidi_1._rtlLocaleRegex.hasMatch(language);
        }
        return Bidi_1._lastRtlCheck;
    }
    static enforceRtlInHtml(html) {
        return Bidi_1._enforceInHtmlHelper(html, 'rtl');
    }
    static enforceRtlInText(text) {
        return `${Bidi_1.RLE}${text}${Bidi_1.PDF}`;
    }
    static enforceLtrInHtml(html) {
        return Bidi_1._enforceInHtmlHelper(html, 'ltr');
    }
    static enforceLtrInText(text) {
        return `${Bidi_1.LRE}${text}${Bidi_1.PDF}`;
    }
    static _enforceInHtmlHelper(html, direction) {
        if (new core.DartString(html).startsWith('<')) {
            let buffer = new core.DartStringBuffer();
            let startIndex = 0;
            let match = new core.DartRegExp('<\w+').firstMatch(html);
            if (match != null) {
                ((_) => {
                    {
                        _.write(new core.DartString(html).substring(startIndex, match.end));
                        _.write(` dir=${direction}`);
                        return _;
                    }
                })(buffer);
                startIndex = match.end;
            }
            return (((_) => {
                {
                    _.write(new core.DartString(html).substring(startIndex));
                    return _;
                }
            })(buffer)).toString();
        }
        return `\n<span dir=${direction}>${html}</span>`;
    }
    static guardBracketInHtml(str, isRtlContext) {
        let useRtl = isRtlContext == null ? Bidi_1.hasAnyRtl(str) : isRtlContext;
        let matchingBrackets = new core.DartRegExp('(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)');
        return Bidi_1._guardBracketHelper(str, matchingBrackets, `<span dir=${useRtl ? "rtl" : "ltr"}>`, '</span>');
    }
    static guardBracketInText(str, isRtlContext) {
        let useRtl = isRtlContext == null ? Bidi_1.hasAnyRtl(str) : isRtlContext;
        let mark = useRtl ? Bidi_1.RLM : Bidi_1.LRM;
        return Bidi_1._guardBracketHelper(str, new core.DartRegExp('(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)'), mark, mark);
    }
    static _guardBracketHelper(str, regexp, before, after) {
        let buffer = new core.DartStringBuffer();
        let startIndex = 0;
        regexp.allMatches(str).forEach((match) => {
            ((_) => {
                {
                    _.write(new core.DartString(str).substring(startIndex, match.start));
                    _.write(before);
                    _.write(new core.DartString(str).substring(match.start, match.end));
                    _.write(after);
                    return _;
                }
            })(buffer);
            startIndex = match.end;
        });
        return (((_) => {
            {
                _.write(new core.DartString(str).substring(startIndex));
                return _;
            }
        })(buffer)).toString();
    }
    static estimateDirectionOfText(text, _namedArguments) {
        let { isHtml } = Object.assign({
            "isHtml": false
        }, _namedArguments);
        text = isHtml ? Bidi_1.stripHtmlIfNeeded(text) : text;
        let rtlCount = 0;
        let total = 0;
        let hasWeaklyLtr = false;
        for (let token of new core.DartString(text).split(new core.DartRegExp('\s+'))) {
            if (Bidi_1.startsWithRtl(token)) {
                rtlCount++;
                total++;
            }
            else if (new core.DartRegExp('^http://').hasMatch(token)) {
                hasWeaklyLtr = true;
            }
            else if (Bidi_1.hasAnyLtr(token)) {
                total++;
            }
            else if (new core.DartRegExp('\d').hasMatch(token)) {
                hasWeaklyLtr = true;
            }
        }
        if (total == 0) {
            return hasWeaklyLtr ? TextDirection.LTR : TextDirection.UNKNOWN;
        }
        else if (rtlCount > Bidi_1._RTL_DETECTION_THRESHOLD * total) {
            return TextDirection.RTL;
        }
        else {
            return TextDirection.LTR;
        }
    }
    static normalizeHebrewQuote(str) {
        let buf = new core.DartStringBuffer();
        if (new core.DartString(str).length > 0) {
            buf.write(new core.DartString(str).substring(0, 1));
        }
        for (let i = 1; i < new core.DartString(str).length; i++) {
            if (new core.DartString(str).substring(i, i + 1) == '"' && new core.DartRegExp('[֑-ײ]').hasMatch(new core.DartString(str).substring(i - 1, i))) {
                buf.write('״');
            }
            else if (new core.DartString(str).substring(i, i + 1) == "'" && new core.DartRegExp('[֑-ײ]').hasMatch(new core.DartString(str).substring(i - 1, i))) {
                buf.write('׳');
            }
            else {
                buf.write(new core.DartString(str).substring(i, i + 1));
            }
        }
        return buf.toString();
    }
    static detectRtlDirectionality(str, _namedArguments) {
        let { isHtml } = Object.assign({
            "isHtml": false
        }, _namedArguments);
        return op(Op.EQUALS, Bidi_1.estimateDirectionOfText(str, {
            isHtml: isHtml
        }), TextDirection.RTL);
    }
    Bidi() {
    }
};
__decorate([
    defaultConstructor
], Bidi.prototype, "Bidi", null);
Bidi = Bidi_1 = __decorate([
    DartClass
], Bidi);
export { Bidi };
let _CompactStyleBase = class _CompactStyleBase {
    constructor() {
    }
    styleForSign(number) { throw 'abstract'; }
    get totalDigits() { throw 'abstract'; }
    get divisor() { throw 'abstract'; }
    get allStyles() { throw 'abstract'; }
    _CompactStyleBase() {
    }
};
__decorate([
    Abstract
], _CompactStyleBase.prototype, "styleForSign", null);
__decorate([
    AbstractProperty
], _CompactStyleBase.prototype, "totalDigits", null);
__decorate([
    AbstractProperty
], _CompactStyleBase.prototype, "divisor", null);
__decorate([
    AbstractProperty
], _CompactStyleBase.prototype, "allStyles", null);
__decorate([
    defaultConstructor
], _CompactStyleBase.prototype, "_CompactStyleBase", null);
_CompactStyleBase = __decorate([
    DartClass
], _CompactStyleBase);
export { _CompactStyleBase };
export var _CompactFormatType;
(function (_CompactFormatType) {
    _CompactFormatType[_CompactFormatType["COMPACT_DECIMAL_SHORT_PATTERN"] = 0] = "COMPACT_DECIMAL_SHORT_PATTERN";
    _CompactFormatType[_CompactFormatType["COMPACT_DECIMAL_LONG_PATTERN"] = 1] = "COMPACT_DECIMAL_LONG_PATTERN";
    _CompactFormatType[_CompactFormatType["COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN"] = 2] = "COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN";
})(_CompactFormatType || (_CompactFormatType = {}));
let DateFormat = DateFormat_1 = class DateFormat {
    constructor(newPattern, locale) {
    }
    DateFormat(newPattern, locale) {
        this._locale = Intl.verifiedLocale(locale, DateFormat_1.localeExists.bind(this));
        this.addPattern(newPattern);
    }
    format(date) {
        let result = new core.DartStringBuffer();
        this._formatFields.forEach((field) => {
            return result.write(field.format(date));
        });
        return result.toString();
    }
    formatDuration(reference) {
        return '';
    }
    formatDurationFrom(duration, date) {
        return '';
    }
    parse(inputString, utc) {
        utc = utc || false;
        return this._parse(inputString, {
            utc: utc, strict: false
        });
    }
    parseLoose(inputString, utc) {
        utc = utc || false;
        try {
            return this._parse(inputString, {
                utc: utc, strict: true
            });
        }
        catch (__error__) {
            if (is(__error__, core.FormatException)) {
                return this._parseLoose(new core.DartString(inputString).toLowerCase(), utc);
            }
        }
    }
    _parseLoose(inputString, utc) {
        let dateFields = new _DateBuilder();
        if (utc)
            dateFields.utc = true;
        let stream = new _Stream(inputString);
        this._formatFields.forEach((f) => {
            return f.parseLoose(stream, dateFields);
        });
        if (!stream.atEnd()) {
            throw new core.FormatException(`Characters remaining after date parsing in ${inputString}`);
        }
        dateFields.verify(inputString);
        return dateFields.asDate();
    }
    parseStrict(inputString, utc) {
        utc = utc || false;
        return this._parse(inputString, {
            utc: utc, strict: true
        });
    }
    _parse(inputString, _namedArguments) {
        let { utc, strict } = Object.assign({
            "utc": false,
            "strict": false
        }, _namedArguments);
        let dateFields = new _DateBuilder();
        if (utc)
            dateFields.utc = true;
        dateFields._dateOnly = this.dateOnly;
        let stream = new _Stream(inputString);
        this._formatFields.forEach((f) => {
            return f.parse(stream, dateFields);
        });
        if (strict && !stream.atEnd()) {
            throw new core.FormatException(`Characters remaining after date parsing in ${inputString}`);
        }
        if (strict)
            dateFields.verify(inputString);
        return dateFields.asDate();
    }
    get dateOnly() {
        return this._dateOnly = (this._dateOnly) || (this._checkDateOnly);
    }
    get _checkDateOnly() {
        return this._formatFields.every((each) => {
            return each.forDate;
        });
    }
    parseUTC(inputString) {
        return this.parse(inputString, true);
    }
    parseUtc(inputString) {
        return this.parse(inputString, true);
    }
    get locale() {
        return this._locale;
    }
    static allLocalesWithSymbols() {
        return new core.DartList.from(lib9.properties.dateTimeSymbols.keys);
    }
    d(locale) {
        this.DateFormat("d", locale);
    }
    E(locale) {
        this.DateFormat("E", locale);
    }
    EEEE(locale) {
        this.DateFormat("EEEE", locale);
    }
    LLL(locale) {
        this.DateFormat("LLL", locale);
    }
    LLLL(locale) {
        this.DateFormat("LLLL", locale);
    }
    M(locale) {
        this.DateFormat("M", locale);
    }
    Md(locale) {
        this.DateFormat("Md", locale);
    }
    MEd(locale) {
        this.DateFormat("MEd", locale);
    }
    MMM(locale) {
        this.DateFormat("MMM", locale);
    }
    MMMd(locale) {
        this.DateFormat("MMMd", locale);
    }
    MMMEd(locale) {
        this.DateFormat("MMMEd", locale);
    }
    MMMM(locale) {
        this.DateFormat("MMMM", locale);
    }
    MMMMd(locale) {
        this.DateFormat("MMMMd", locale);
    }
    MMMMEEEEd(locale) {
        this.DateFormat("MMMMEEEEd", locale);
    }
    QQQ(locale) {
        this.DateFormat("QQQ", locale);
    }
    QQQQ(locale) {
        this.DateFormat("QQQQ", locale);
    }
    y(locale) {
        this.DateFormat("y", locale);
    }
    yM(locale) {
        this.DateFormat("yM", locale);
    }
    yMd(locale) {
        this.DateFormat("yMd", locale);
    }
    yMEd(locale) {
        this.DateFormat("yMEd", locale);
    }
    yMMM(locale) {
        this.DateFormat("yMMM", locale);
    }
    yMMMd(locale) {
        this.DateFormat("yMMMd", locale);
    }
    yMMMEd(locale) {
        this.DateFormat("yMMMEd", locale);
    }
    yMMMM(locale) {
        this.DateFormat("yMMMM", locale);
    }
    yMMMMd(locale) {
        this.DateFormat("yMMMMd", locale);
    }
    yMMMMEEEEd(locale) {
        this.DateFormat("yMMMMEEEEd", locale);
    }
    yQQQ(locale) {
        this.DateFormat("yQQQ", locale);
    }
    yQQQQ(locale) {
        this.DateFormat("yQQQQ", locale);
    }
    H(locale) {
        this.DateFormat("H", locale);
    }
    Hm(locale) {
        this.DateFormat("Hm", locale);
    }
    Hms(locale) {
        this.DateFormat("Hms", locale);
    }
    j(locale) {
        this.DateFormat("j", locale);
    }
    jm(locale) {
        this.DateFormat("jm", locale);
    }
    jms(locale) {
        this.DateFormat("jms", locale);
    }
    jmv(locale) {
        this.DateFormat("jmv", locale);
    }
    jmz(locale) {
        this.DateFormat("jmz", locale);
    }
    jv(locale) {
        this.DateFormat("jv", locale);
    }
    jz(locale) {
        this.DateFormat("jz", locale);
    }
    m(locale) {
        this.DateFormat("m", locale);
    }
    ms(locale) {
        this.DateFormat("ms", locale);
    }
    s(locale) {
        this.DateFormat("s", locale);
    }
    add_d() {
        return this.addPattern("d");
    }
    add_E() {
        return this.addPattern("E");
    }
    add_EEEE() {
        return this.addPattern("EEEE");
    }
    add_LLL() {
        return this.addPattern("LLL");
    }
    add_LLLL() {
        return this.addPattern("LLLL");
    }
    add_M() {
        return this.addPattern("M");
    }
    add_Md() {
        return this.addPattern("Md");
    }
    add_MEd() {
        return this.addPattern("MEd");
    }
    add_MMM() {
        return this.addPattern("MMM");
    }
    add_MMMd() {
        return this.addPattern("MMMd");
    }
    add_MMMEd() {
        return this.addPattern("MMMEd");
    }
    add_MMMM() {
        return this.addPattern("MMMM");
    }
    add_MMMMd() {
        return this.addPattern("MMMMd");
    }
    add_MMMMEEEEd() {
        return this.addPattern("MMMMEEEEd");
    }
    add_QQQ() {
        return this.addPattern("QQQ");
    }
    add_QQQQ() {
        return this.addPattern("QQQQ");
    }
    add_y() {
        return this.addPattern("y");
    }
    add_yM() {
        return this.addPattern("yM");
    }
    add_yMd() {
        return this.addPattern("yMd");
    }
    add_yMEd() {
        return this.addPattern("yMEd");
    }
    add_yMMM() {
        return this.addPattern("yMMM");
    }
    add_yMMMd() {
        return this.addPattern("yMMMd");
    }
    add_yMMMEd() {
        return this.addPattern("yMMMEd");
    }
    add_yMMMM() {
        return this.addPattern("yMMMM");
    }
    add_yMMMMd() {
        return this.addPattern("yMMMMd");
    }
    add_yMMMMEEEEd() {
        return this.addPattern("yMMMMEEEEd");
    }
    add_yQQQ() {
        return this.addPattern("yQQQ");
    }
    add_yQQQQ() {
        return this.addPattern("yQQQQ");
    }
    add_H() {
        return this.addPattern("H");
    }
    add_Hm() {
        return this.addPattern("Hm");
    }
    add_Hms() {
        return this.addPattern("Hms");
    }
    add_j() {
        return this.addPattern("j");
    }
    add_jm() {
        return this.addPattern("jm");
    }
    add_jms() {
        return this.addPattern("jms");
    }
    add_jmv() {
        return this.addPattern("jmv");
    }
    add_jmz() {
        return this.addPattern("jmz");
    }
    add_jv() {
        return this.addPattern("jv");
    }
    add_jz() {
        return this.addPattern("jz");
    }
    add_m() {
        return this.addPattern("m");
    }
    add_ms() {
        return this.addPattern("ms");
    }
    add_s() {
        return this.addPattern("s");
    }
    static get ABBR_MONTH() {
        if (this.__$ABBR_MONTH === undefined) {
            this.__$ABBR_MONTH = 'MMM';
        }
        return this.__$ABBR_MONTH;
    }
    static get DAY() {
        if (this.__$DAY === undefined) {
            this.__$DAY = 'd';
        }
        return this.__$DAY;
    }
    static get ABBR_WEEKDAY() {
        if (this.__$ABBR_WEEKDAY === undefined) {
            this.__$ABBR_WEEKDAY = 'E';
        }
        return this.__$ABBR_WEEKDAY;
    }
    static get WEEKDAY() {
        if (this.__$WEEKDAY === undefined) {
            this.__$WEEKDAY = 'EEEE';
        }
        return this.__$WEEKDAY;
    }
    static get ABBR_STANDALONE_MONTH() {
        if (this.__$ABBR_STANDALONE_MONTH === undefined) {
            this.__$ABBR_STANDALONE_MONTH = 'LLL';
        }
        return this.__$ABBR_STANDALONE_MONTH;
    }
    static get STANDALONE_MONTH() {
        if (this.__$STANDALONE_MONTH === undefined) {
            this.__$STANDALONE_MONTH = 'LLLL';
        }
        return this.__$STANDALONE_MONTH;
    }
    static get NUM_MONTH() {
        if (this.__$NUM_MONTH === undefined) {
            this.__$NUM_MONTH = 'M';
        }
        return this.__$NUM_MONTH;
    }
    static get NUM_MONTH_DAY() {
        if (this.__$NUM_MONTH_DAY === undefined) {
            this.__$NUM_MONTH_DAY = 'Md';
        }
        return this.__$NUM_MONTH_DAY;
    }
    static get NUM_MONTH_WEEKDAY_DAY() {
        if (this.__$NUM_MONTH_WEEKDAY_DAY === undefined) {
            this.__$NUM_MONTH_WEEKDAY_DAY = 'MEd';
        }
        return this.__$NUM_MONTH_WEEKDAY_DAY;
    }
    static get ABBR_MONTH_DAY() {
        if (this.__$ABBR_MONTH_DAY === undefined) {
            this.__$ABBR_MONTH_DAY = 'MMMd';
        }
        return this.__$ABBR_MONTH_DAY;
    }
    static get ABBR_MONTH_WEEKDAY_DAY() {
        if (this.__$ABBR_MONTH_WEEKDAY_DAY === undefined) {
            this.__$ABBR_MONTH_WEEKDAY_DAY = 'MMMEd';
        }
        return this.__$ABBR_MONTH_WEEKDAY_DAY;
    }
    static get MONTH() {
        if (this.__$MONTH === undefined) {
            this.__$MONTH = 'MMMM';
        }
        return this.__$MONTH;
    }
    static get MONTH_DAY() {
        if (this.__$MONTH_DAY === undefined) {
            this.__$MONTH_DAY = 'MMMMd';
        }
        return this.__$MONTH_DAY;
    }
    static get MONTH_WEEKDAY_DAY() {
        if (this.__$MONTH_WEEKDAY_DAY === undefined) {
            this.__$MONTH_WEEKDAY_DAY = 'MMMMEEEEd';
        }
        return this.__$MONTH_WEEKDAY_DAY;
    }
    static get ABBR_QUARTER() {
        if (this.__$ABBR_QUARTER === undefined) {
            this.__$ABBR_QUARTER = 'QQQ';
        }
        return this.__$ABBR_QUARTER;
    }
    static get QUARTER() {
        if (this.__$QUARTER === undefined) {
            this.__$QUARTER = 'QQQQ';
        }
        return this.__$QUARTER;
    }
    static get YEAR() {
        if (this.__$YEAR === undefined) {
            this.__$YEAR = 'y';
        }
        return this.__$YEAR;
    }
    static get YEAR_NUM_MONTH() {
        if (this.__$YEAR_NUM_MONTH === undefined) {
            this.__$YEAR_NUM_MONTH = 'yM';
        }
        return this.__$YEAR_NUM_MONTH;
    }
    static get YEAR_NUM_MONTH_DAY() {
        if (this.__$YEAR_NUM_MONTH_DAY === undefined) {
            this.__$YEAR_NUM_MONTH_DAY = 'yMd';
        }
        return this.__$YEAR_NUM_MONTH_DAY;
    }
    static get YEAR_NUM_MONTH_WEEKDAY_DAY() {
        if (this.__$YEAR_NUM_MONTH_WEEKDAY_DAY === undefined) {
            this.__$YEAR_NUM_MONTH_WEEKDAY_DAY = 'yMEd';
        }
        return this.__$YEAR_NUM_MONTH_WEEKDAY_DAY;
    }
    static get YEAR_ABBR_MONTH() {
        if (this.__$YEAR_ABBR_MONTH === undefined) {
            this.__$YEAR_ABBR_MONTH = 'yMMM';
        }
        return this.__$YEAR_ABBR_MONTH;
    }
    static get YEAR_ABBR_MONTH_DAY() {
        if (this.__$YEAR_ABBR_MONTH_DAY === undefined) {
            this.__$YEAR_ABBR_MONTH_DAY = 'yMMMd';
        }
        return this.__$YEAR_ABBR_MONTH_DAY;
    }
    static get YEAR_ABBR_MONTH_WEEKDAY_DAY() {
        if (this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY === undefined) {
            this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY = 'yMMMEd';
        }
        return this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY;
    }
    static get YEAR_MONTH() {
        if (this.__$YEAR_MONTH === undefined) {
            this.__$YEAR_MONTH = 'yMMMM';
        }
        return this.__$YEAR_MONTH;
    }
    static get YEAR_MONTH_DAY() {
        if (this.__$YEAR_MONTH_DAY === undefined) {
            this.__$YEAR_MONTH_DAY = 'yMMMMd';
        }
        return this.__$YEAR_MONTH_DAY;
    }
    static get YEAR_MONTH_WEEKDAY_DAY() {
        if (this.__$YEAR_MONTH_WEEKDAY_DAY === undefined) {
            this.__$YEAR_MONTH_WEEKDAY_DAY = 'yMMMMEEEEd';
        }
        return this.__$YEAR_MONTH_WEEKDAY_DAY;
    }
    static get YEAR_ABBR_QUARTER() {
        if (this.__$YEAR_ABBR_QUARTER === undefined) {
            this.__$YEAR_ABBR_QUARTER = 'yQQQ';
        }
        return this.__$YEAR_ABBR_QUARTER;
    }
    static get YEAR_QUARTER() {
        if (this.__$YEAR_QUARTER === undefined) {
            this.__$YEAR_QUARTER = 'yQQQQ';
        }
        return this.__$YEAR_QUARTER;
    }
    static get HOUR24() {
        if (this.__$HOUR24 === undefined) {
            this.__$HOUR24 = 'H';
        }
        return this.__$HOUR24;
    }
    static get HOUR24_MINUTE() {
        if (this.__$HOUR24_MINUTE === undefined) {
            this.__$HOUR24_MINUTE = 'Hm';
        }
        return this.__$HOUR24_MINUTE;
    }
    static get HOUR24_MINUTE_SECOND() {
        if (this.__$HOUR24_MINUTE_SECOND === undefined) {
            this.__$HOUR24_MINUTE_SECOND = 'Hms';
        }
        return this.__$HOUR24_MINUTE_SECOND;
    }
    static get HOUR() {
        if (this.__$HOUR === undefined) {
            this.__$HOUR = 'j';
        }
        return this.__$HOUR;
    }
    static get HOUR_MINUTE() {
        if (this.__$HOUR_MINUTE === undefined) {
            this.__$HOUR_MINUTE = 'jm';
        }
        return this.__$HOUR_MINUTE;
    }
    static get HOUR_MINUTE_SECOND() {
        if (this.__$HOUR_MINUTE_SECOND === undefined) {
            this.__$HOUR_MINUTE_SECOND = 'jms';
        }
        return this.__$HOUR_MINUTE_SECOND;
    }
    static get HOUR_MINUTE_GENERIC_TZ() {
        if (this.__$HOUR_MINUTE_GENERIC_TZ === undefined) {
            this.__$HOUR_MINUTE_GENERIC_TZ = 'jmv';
        }
        return this.__$HOUR_MINUTE_GENERIC_TZ;
    }
    static get HOUR_MINUTE_TZ() {
        if (this.__$HOUR_MINUTE_TZ === undefined) {
            this.__$HOUR_MINUTE_TZ = 'jmz';
        }
        return this.__$HOUR_MINUTE_TZ;
    }
    static get HOUR_GENERIC_TZ() {
        if (this.__$HOUR_GENERIC_TZ === undefined) {
            this.__$HOUR_GENERIC_TZ = 'jv';
        }
        return this.__$HOUR_GENERIC_TZ;
    }
    static get HOUR_TZ() {
        if (this.__$HOUR_TZ === undefined) {
            this.__$HOUR_TZ = 'jz';
        }
        return this.__$HOUR_TZ;
    }
    static get MINUTE() {
        if (this.__$MINUTE === undefined) {
            this.__$MINUTE = 'm';
        }
        return this.__$MINUTE;
    }
    static get MINUTE_SECOND() {
        if (this.__$MINUTE_SECOND === undefined) {
            this.__$MINUTE_SECOND = 'ms';
        }
        return this.__$MINUTE_SECOND;
    }
    static get SECOND() {
        if (this.__$SECOND === undefined) {
            this.__$SECOND = 's';
        }
        return this.__$SECOND;
    }
    get _formatFields() {
        if (this._formatFieldsPrivate == null) {
            if (this._pattern == null)
                this._useDefaultPattern();
            this._formatFieldsPrivate = this.parsePattern(this._pattern);
        }
        return this._formatFieldsPrivate;
    }
    _useDefaultPattern() {
        this.add_yMMMMd();
        this.add_jms();
    }
    static get _matchers() {
        if (this.__$_matchers === undefined) {
            this.__$_matchers = new core.DartList.literal(new core.DartRegExp("^'(?:[^']|'')*'"), new core.DartRegExp("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)"), new core.DartRegExp("^[^'GyMkSEahKHcLQdDmsvzZ]+"));
        }
        return this.__$_matchers;
    }
    static set _matchers(__$value) {
        this.__$_matchers = __$value;
    }
    _appendPattern(inputPattern, separator) {
        separator = separator || ' ';
        this._pattern = this._pattern == null ? inputPattern : `${this._pattern}${separator}${inputPattern}`;
    }
    addPattern(inputPattern, separator) {
        separator = separator || ' ';
        this._formatFieldsPrivate = null;
        if (inputPattern == null)
            return this;
        if (!this._availableSkeletons.containsKey(inputPattern)) {
            this._appendPattern(inputPattern, separator);
        }
        else {
            this._appendPattern(this._availableSkeletons.get(inputPattern), separator);
        }
        return this;
    }
    get pattern() {
        return this._pattern;
    }
    get _availableSkeletons() {
        return op(Op.INDEX, lib9.properties.dateTimePatterns, this.locale);
    }
    get dateSymbols() {
        if (this._locale != lib9.properties.lastDateSymbolLocale) {
            lib9.properties.lastDateSymbolLocale = this._locale;
            lib9.properties.cachedDateSymbols = op(Op.INDEX, lib9.properties.dateTimeSymbols, this._locale);
        }
        return lib9.properties.cachedDateSymbols;
    }
    static get _useNativeDigitsByDefault() {
        if (this.__$_useNativeDigitsByDefault === undefined) {
            this.__$_useNativeDigitsByDefault = new core.DartMap.literal([]);
        }
        return this.__$_useNativeDigitsByDefault;
    }
    static set _useNativeDigitsByDefault(__$value) {
        this.__$_useNativeDigitsByDefault = __$value;
    }
    static shouldUseNativeDigitsByDefaultFor(locale) {
        return (DateFormat_1._useNativeDigitsByDefault.get(locale) || true);
    }
    static useNativeDigitsByDefaultFor(locale, value) {
        DateFormat_1._useNativeDigitsByDefault.set(locale, value);
    }
    get useNativeDigits() {
        return this._useNativeDigits == null ? this._useNativeDigits = DateFormat_1.shouldUseNativeDigitsByDefaultFor(this.locale) : this._useNativeDigits;
    }
    set useNativeDigits(native) {
        this._useNativeDigits = native;
        this._digitMatcher = null;
        this._localeZeroCodeUnit = null;
        this._localeZero = null;
    }
    static get _digitMatchers() {
        if (this.__$_digitMatchers === undefined) {
            this.__$_digitMatchers = new core.DartMap.literal([]);
        }
        return this.__$_digitMatchers;
    }
    static set _digitMatchers(__$value) {
        this.__$_digitMatchers = __$value;
    }
    get digitMatcher() {
        if (this._digitMatcher != null)
            return this._digitMatcher;
        this._digitMatcher = DateFormat_1._digitMatchers.putIfAbsent(this.localeZero, this._initDigitMatcher.bind(this));
        return this._digitMatcher;
    }
    static get _asciiDigitMatcher() {
        if (this.__$_asciiDigitMatcher === undefined) {
            this.__$_asciiDigitMatcher = new core.DartRegExp('^\d+');
        }
        return this.__$_asciiDigitMatcher;
    }
    static set _asciiDigitMatcher(__$value) {
        this.__$_asciiDigitMatcher = __$value;
    }
    get localeZeroCodeUnit() {
        return this._localeZeroCodeUnit == null ? this._localeZeroCodeUnit = new core.DartString(this.localeZero).codeUnitAt(0) : this._localeZeroCodeUnit;
    }
    static get _asciiZeroCodeUnit() {
        if (this.__$_asciiZeroCodeUnit === undefined) {
            this.__$_asciiZeroCodeUnit = new core.DartString('0').codeUnitAt(0);
        }
        return this.__$_asciiZeroCodeUnit;
    }
    static set _asciiZeroCodeUnit(__$value) {
        this.__$_asciiZeroCodeUnit = __$value;
    }
    get localeZero() {
        return this._localeZero == null ? this._localeZero = (this.useNativeDigits ? (this.dateSymbols.ZERODIGIT || '0') : '0') : this._localeZero;
    }
    get usesNativeDigits() {
        return this.useNativeDigits && this._localeZeroCodeUnit != DateFormat_1._asciiZeroCodeUnit;
    }
    get usesAsciiDigits() {
        return !this.usesNativeDigits;
    }
    _localizeDigits(numberString) {
        if (this.usesAsciiDigits)
            return numberString;
        let newDigits = new core.DartList(new core.DartString(numberString).length);
        let oldDigits = new core.DartString(numberString).codeUnits;
        for (let i = 0; i < new core.DartString(numberString).length; i++) {
            newDigits[i] = oldDigits[i] + this.localeZeroCodeUnit - DateFormat_1._asciiZeroCodeUnit;
        }
        return new core.DartString.fromCharCodes(newDigits).valueOf();
    }
    _initDigitMatcher() {
        if (this.usesAsciiDigits)
            return DateFormat_1._asciiDigitMatcher;
        let localeDigits = new core.DartIterable.generate(10, (i) => {
            return i;
        }).map((i) => {
            return this.localeZeroCodeUnit + i;
        }).toList();
        let localeDigitsString = new core.DartString.fromCharCodes(localeDigits).valueOf();
        return new core.DartRegExp('^[' + localeDigitsString + ']+');
    }
    static localeExists(localeName) {
        if (op(Op.EQUALS, localeName, null))
            return false;
        return lib9.properties.dateTimeSymbols.containsKey(localeName);
    }
    static get _fieldConstructors() {
        return new core.DartList.literal((pattern, parent) => {
            return new _DateFormatQuotedField(pattern, parent);
        }, (pattern, parent) => {
            return new _DateFormatPatternField(pattern, parent);
        }, (pattern, parent) => {
            return new _DateFormatLiteralField(pattern, parent);
        });
    }
    parsePattern(pattern) {
        if (pattern == null)
            return null;
        return this._parsePatternHelper(pattern).reversed.toList();
    }
    _parsePatternHelper(pattern) {
        if (new core.DartString(pattern).isEmpty)
            return new core.DartList.literal();
        let matched = this._match(pattern);
        if (op(Op.EQUALS, matched, null))
            return new core.DartList.literal();
        let parsed = this._parsePatternHelper(new core.DartString(pattern).substring(new core.DartString(matched.fullPattern()).length));
        parsed.add(matched);
        return parsed;
    }
    _match(pattern) {
        for (let i = 0; i < DateFormat_1._matchers.length; i++) {
            let regex = DateFormat_1._matchers[i];
            let match = regex.firstMatch(pattern);
            if (match != null) {
                return (DateFormat_1._fieldConstructors[i])(match.group(0), this);
            }
        }
        return null;
    }
};
__decorate([
    defaultConstructor
], DateFormat.prototype, "DateFormat", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "d", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "E", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "EEEE", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "LLL", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "LLLL", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "M", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "Md", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMM", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMMd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMMEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMMM", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMMMd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "MMMMEEEEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "QQQ", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "QQQQ", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "y", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yM", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMM", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMMd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMMEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMMM", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMMMd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yMMMMEEEEd", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yQQQ", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "yQQQQ", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "H", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "Hm", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "Hms", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "j", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jm", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jms", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jmv", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jmz", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jv", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "jz", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "m", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "ms", null);
__decorate([
    namedConstructor
], DateFormat.prototype, "s", null);
DateFormat = DateFormat_1 = __decorate([
    DartClass
], DateFormat);
export { DateFormat };
let _DateFormatField = class _DateFormatField {
    constructor(pattern, parent) {
    }
    _DateFormatField(pattern, parent) {
        this.pattern = pattern;
        this.parent = parent;
        this._trimmedPattern = new core.DartString(this.pattern).trim();
    }
    get forDate() {
        return true;
    }
    get width() {
        return new core.DartString(this.pattern).length;
    }
    fullPattern() {
        return this.pattern;
    }
    toString() {
        return this.pattern;
    }
    format(date) {
        return this.pattern;
    }
    parse(input, dateFields) { throw 'abstract'; }
    parseLoose(input, dateFields) { throw 'abstract'; }
    parseLiteral(input) {
        let found = input.read(this.width);
        if (found != this.pattern) {
            this.throwFormatException(input);
        }
    }
    parseLiteralLoose(input) {
        this._trimWhitespace(input);
        let found = input.peek(new core.DartString(this._trimmedPattern).length);
        if (op(Op.EQUALS, found, this._trimmedPattern)) {
            input.read(new core.DartString(this._trimmedPattern).length);
        }
        this._trimWhitespace(input);
    }
    _trimWhitespace(input) {
        while (!input.atEnd() && input.peek().trim().isEmpty) {
            input.read();
        }
    }
    throwFormatException(stream) {
        throw new core.FormatException(`Trying to read ${this} from ${stream.contents} ` + `at position ${stream.index}`);
    }
};
__decorate([
    defaultConstructor
], _DateFormatField.prototype, "_DateFormatField", null);
__decorate([
    Abstract
], _DateFormatField.prototype, "parse", null);
__decorate([
    Abstract
], _DateFormatField.prototype, "parseLoose", null);
_DateFormatField = __decorate([
    DartClass
], _DateFormatField);
export { _DateFormatField };
let _DateBuilder = class _DateBuilder {
    constructor() {
    }
    setYear(x) {
        this.year = x;
    }
    setMonth(x) {
        this.month = x;
    }
    setDay(x) {
        this.day = x;
    }
    setHour(x) {
        this.hour = x;
    }
    setMinute(x) {
        this.minute = x;
    }
    setSecond(x) {
        this.second = x;
    }
    setFractionalSecond(x) {
        this.fractionalSecond = x;
    }
    get hour24() {
        return this.pm ? this.hour + 12 : this.hour;
    }
    verify(s) {
        this._verify(this.month, 1, 12, "month", s);
        this._verify(this.hour24, 0, 23, "hour", s);
        this._verify(this.minute, 0, 59, "minute", s);
        this._verify(this.second, 0, 59, "second", s);
        this._verify(this.fractionalSecond, 0, 999, "fractional second", s);
        let date = this.asDate();
        this._verify(this.hour24, date.hour, date.hour, "hour", s, date);
        if (this.day > 31) {
            let leapYear = _isLeapYear(date);
            let correspondingDay = _dayOfYear(date.month, date.day, leapYear);
            this._verify(this.day, correspondingDay, correspondingDay, "day", s, date);
        }
        else {
            this._verify(this.day, date.day, date.day, "day", s, date);
        }
        this._verify(this.year, date.year, date.year, "year", s, date);
    }
    _verify(value, min, max, desc, originalInput, parsed) {
        if (value < min || value > max) {
            let parsedDescription = op(Op.EQUALS, parsed, null) ? "" : ` Date parsed as ${parsed}.`;
            throw new core.FormatException(`Error parsing ${originalInput}, invalid ${desc} value: ${value}.` + ` Expected value between ${min} and ${max}.${parsedDescription}`);
        }
    }
    asDate(_namedArguments) {
        let { retries } = Object.assign({
            "retries": 3
        }, _namedArguments);
        if (this.utc) {
            return new core.DartDateTime.utc(this.year, this.month, this.day, this.hour24, this.minute, this.second, this.fractionalSecond);
        }
        else {
            let preliminaryResult = new core.DartDateTime(this.year, this.month, this.day, this.hour24, this.minute, this.second, this.fractionalSecond);
            return this._correctForErrors(preliminaryResult, retries);
        }
    }
    _correctForErrors(result, retries) {
        if (retries <= 0) {
            return result;
        }
        let leapYear = _isLeapYear(result);
        let correspondingDay = _dayOfYear(result.month, result.day, leapYear);
        if (!this.utc && result.isUtc && (result.hour != this.hour24 || result.day != correspondingDay || !new core.DartDateTime.now().isUtc)) {
            return this.asDate({
                retries: retries - 1
            });
        }
        if (this._dateOnly && this.day != correspondingDay) {
            let adjusted = result.add(new core.DartDuration({
                hours: (24 - result.hour)
            }));
            if (_dayOfYear(adjusted.month, adjusted.day, leapYear) == this.day)
                return adjusted;
        }
        return result;
    }
    _DateBuilder() {
        this.year = 1970;
        this.month = 1;
        this.day = 1;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.fractionalSecond = 0;
        this.pm = false;
        this.utc = false;
        this._dateOnly = false;
    }
};
__decorate([
    defaultConstructor
], _DateBuilder.prototype, "_DateBuilder", null);
_DateBuilder = __decorate([
    DartClass
], _DateBuilder);
export { _DateBuilder };
let _Stream = class _Stream {
    constructor(contents) {
    }
    _Stream(contents) {
        this.index = 0;
        this.contents = contents;
    }
    atEnd() {
        return this.index >= this.contents.length;
    }
    next() {
        return op(Op.INDEX, this.contents, this.index++);
    }
    read(howMany) {
        howMany = howMany || 1;
        let result = this.peek(howMany);
        this.index += howMany;
        return result;
    }
    startsWith(pattern) {
        if (is(this.contents, "string"))
            return this.contents.startsWith(pattern, this.index);
        return pattern == this.peek(new core.DartString(pattern).length);
    }
    peek(howMany) {
        howMany = howMany || 1;
        let result;
        if (is(this.contents, "string")) {
            let stringContents = this.contents;
            result = new core.DartString(stringContents).substring(this.index, math.min(this.index + howMany, new core.DartString(stringContents).length));
        }
        else {
            result = this.contents.sublist(this.index, this.index + howMany);
        }
        return result;
    }
    rest() {
        return this.peek(op(Op.MINUS, this.contents.length, this.index));
    }
    findIndex(f) {
        while (!this.atEnd()) {
            if (f(this.next()))
                return this.index - 1;
        }
        return null;
    }
    findIndexes(f) {
        let results = new core.DartList.literal();
        while (!this.atEnd()) {
            if (f(this.next()))
                results.add(this.index - 1);
        }
        return results;
    }
    nextInteger(_namedArguments) {
        let { digitMatcher, zeroDigit } = Object.assign({}, _namedArguments);
        let string = ((digitMatcher || DateFormat._asciiDigitMatcher)).stringMatch(this.rest());
        if (string == null || new core.DartString(string).isEmpty)
            return null;
        this.read(new core.DartString(string).length);
        if (zeroDigit != null && zeroDigit != DateFormat._asciiZeroCodeUnit) {
            let oldDigits = new core.DartString(string).codeUnits;
            let newDigits = new core.DartList(new core.DartString(string).length);
            for (let i = 0; i < new core.DartString(string).length; i++) {
                newDigits[i] = oldDigits[i] - zeroDigit + DateFormat._asciiZeroCodeUnit;
            }
            string = new core.DartString.fromCharCodes(newDigits).valueOf();
        }
        return core.DartInt.parse(string);
    }
};
__decorate([
    defaultConstructor
], _Stream.prototype, "_Stream", null);
_Stream = __decorate([
    DartClass
], _Stream);
export { _Stream };
let NumberFormat = NumberFormat_1 = class NumberFormat {
    constructor(newPattern, locale) {
    }
    static get _ln10() {
        if (this.__$_ln10 === undefined) {
            this.__$_ln10 = math.log(10);
        }
        return this.__$_ln10;
    }
    static set _ln10(__$value) {
        this.__$_ln10 = __$value;
    }
    get significantDigits() {
        return this._significantDigits;
    }
    set significantDigits(x) {
        this._significantDigits = x;
        this.significantDigitsInUse = true;
    }
    get _multiplier() {
        return this._internalMultiplier;
    }
    set _multiplier(x) {
        this._internalMultiplier = x;
        this._multiplierDigits = new core.DartDouble((math.log(this._multiplier) / NumberFormat_1._ln10)).round();
    }
    get currencySymbol() {
        return (this._currencySymbol || this.currencyName);
    }
    get decimalDigits() {
        return this._decimalDigits;
    }
    get _defaultDecimalDigits() {
        return (op(Op.INDEX, lib8.properties.currencyFractionDigits, new core.DartString(this.currencyName).toUpperCase()) || op(Op.INDEX, lib8.properties.currencyFractionDigits, 'DEFAULT'));
    }
    get _overridesDecimalDigits() {
        return this.decimalDigits != null || this._isForCurrency;
    }
    static $NumberFormat(newPattern, locale) {
        return new NumberFormat_1._forPattern(locale, (x) => {
            return newPattern;
        });
    }
    decimalPattern(locale) {
        this._negativePrefix = '-';
        this._positivePrefix = '';
        this._negativeSuffix = '';
        this._positiveSuffix = '';
        this._groupingSize = 3;
        this._finalGroupingSize = 3;
        this._groupingSizeSetExplicitly = false;
        this._decimalSeparatorAlwaysShown = false;
        this._useSignForPositiveExponent = false;
        this._useExponentialNotation = false;
        this._isForCurrency = false;
        this.maximumIntegerDigits = 40;
        this.minimumIntegerDigits = 1;
        this.maximumFractionDigits = 3;
        this.minimumFractionDigits = 0;
        this.minimumExponentDigits = 0;
        this._significantDigits = 0;
        this.significantDigitsInUse = false;
        this._internalMultiplier = 1;
        this._multiplierDigits = 0;
        this._buffer = new core.DartStringBuffer();
        this._localeZero = 0;
        this._zeroOffset = 0;
        this._forPattern(locale, (x) => {
            return x.DECIMAL_PATTERN;
        });
    }
    percentPattern(locale) {
        this._negativePrefix = '-';
        this._positivePrefix = '';
        this._negativeSuffix = '';
        this._positiveSuffix = '';
        this._groupingSize = 3;
        this._finalGroupingSize = 3;
        this._groupingSizeSetExplicitly = false;
        this._decimalSeparatorAlwaysShown = false;
        this._useSignForPositiveExponent = false;
        this._useExponentialNotation = false;
        this._isForCurrency = false;
        this.maximumIntegerDigits = 40;
        this.minimumIntegerDigits = 1;
        this.maximumFractionDigits = 3;
        this.minimumFractionDigits = 0;
        this.minimumExponentDigits = 0;
        this._significantDigits = 0;
        this.significantDigitsInUse = false;
        this._internalMultiplier = 1;
        this._multiplierDigits = 0;
        this._buffer = new core.DartStringBuffer();
        this._localeZero = 0;
        this._zeroOffset = 0;
        this._forPattern(locale, (x) => {
            return x.PERCENT_PATTERN;
        });
    }
    scientificPattern(locale) {
        this._negativePrefix = '-';
        this._positivePrefix = '';
        this._negativeSuffix = '';
        this._positiveSuffix = '';
        this._groupingSize = 3;
        this._finalGroupingSize = 3;
        this._groupingSizeSetExplicitly = false;
        this._decimalSeparatorAlwaysShown = false;
        this._useSignForPositiveExponent = false;
        this._useExponentialNotation = false;
        this._isForCurrency = false;
        this.maximumIntegerDigits = 40;
        this.minimumIntegerDigits = 1;
        this.maximumFractionDigits = 3;
        this.minimumFractionDigits = 0;
        this.minimumExponentDigits = 0;
        this._significantDigits = 0;
        this.significantDigitsInUse = false;
        this._internalMultiplier = 1;
        this._multiplierDigits = 0;
        this._buffer = new core.DartStringBuffer();
        this._localeZero = 0;
        this._zeroOffset = 0;
        this._forPattern(locale, (x) => {
            return x.SCIENTIFIC_PATTERN;
        });
    }
    static get _checkCurrencyName() {
        if (this.__$_checkCurrencyName === undefined) {
            this.__$_checkCurrencyName = new core.DartRegExp('^[a-zA-Z]{3}$');
        }
        return this.__$_checkCurrencyName;
    }
    static set _checkCurrencyName(__$value) {
        this.__$_checkCurrencyName = __$value;
    }
    static $currencyPattern(locale, currencyNameOrSymbol) {
        if (currencyNameOrSymbol != null && NumberFormat_1._checkCurrencyName.hasMatch(currencyNameOrSymbol)) {
            return new NumberFormat_1.currency({
                locale: locale, name: currencyNameOrSymbol
            });
        }
        else {
            return new NumberFormat_1.currency({
                locale: locale, symbol: currencyNameOrSymbol
            });
        }
    }
    currency(_namedArguments) {
        let { locale, name, symbol, decimalDigits, customPattern } = Object.assign({}, _namedArguments);
        this._negativePrefix = '-';
        this._positivePrefix = '';
        this._negativeSuffix = '';
        this._positiveSuffix = '';
        this._groupingSize = 3;
        this._finalGroupingSize = 3;
        this._groupingSizeSetExplicitly = false;
        this._decimalSeparatorAlwaysShown = false;
        this._useSignForPositiveExponent = false;
        this._useExponentialNotation = false;
        this._isForCurrency = false;
        this.maximumIntegerDigits = 40;
        this.minimumIntegerDigits = 1;
        this.maximumFractionDigits = 3;
        this.minimumFractionDigits = 0;
        this.minimumExponentDigits = 0;
        this._significantDigits = 0;
        this.significantDigitsInUse = false;
        this._internalMultiplier = 1;
        this._multiplierDigits = 0;
        this._buffer = new core.DartStringBuffer();
        this._localeZero = 0;
        this._zeroOffset = 0;
        this._forPattern(locale, (x) => {
            return (customPattern || x.CURRENCY_PATTERN);
        }, {
            name: name, currencySymbol: symbol, decimalDigits: decimalDigits, isForCurrency: true
        });
    }
    static $simpleCurrency(_namedArguments) {
        let { locale, name, decimalDigits } = Object.assign({}, _namedArguments);
        return new NumberFormat_1._forPattern(locale, (x) => {
            return x.CURRENCY_PATTERN;
        }, {
            name: name, computeCurrencySymbol: (format) => {
                return (NumberFormat_1._simpleCurrencySymbols.get(format.currencyName) || format.currencyName);
            }, decimalDigits: decimalDigits, isForCurrency: true
        });
    }
    simpleCurrencySymbol(currencyCode) {
        return (NumberFormat_1._simpleCurrencySymbols.get(currencyCode) || currencyCode);
    }
    static get _simpleCurrencySymbols() {
        if (this.__$_simpleCurrencySymbols === undefined) {
            this.__$_simpleCurrencySymbols = new core.DartMap.literal([
                ["AFN", "Af."],
                ["TOP", "T$"],
                ["MGA", "Ar"],
                ["THB", "฿"],
                ["PAB", "B/."],
                ["ETB", "Birr"],
                ["VEF", "Bs"],
                ["BOB", "Bs"],
                ["GHS", "GHS"],
                ["CRC", "₡"],
                ["NIO", "C$"],
                ["GMD", "GMD"],
                ["MKD", "din"],
                ["BHD", "din"],
                ["DZD", "din"],
                ["IQD", "din"],
                ["JOD", "din"],
                ["KWD", "din"],
                ["LYD", "din"],
                ["RSD", "din"],
                ["TND", "din"],
                ["AED", "dh"],
                ["MAD", "dh"],
                ["STD", "Db"],
                ["BSD", "$"],
                ["FJD", "$"],
                ["GYD", "$"],
                ["KYD", "$"],
                ["LRD", "$"],
                ["SBD", "$"],
                ["SRD", "$"],
                ["AUD", "$"],
                ["BBD", "$"],
                ["BMD", "$"],
                ["BND", "$"],
                ["BZD", "$"],
                ["CAD", "$"],
                ["HKD", "$"],
                ["JMD", "$"],
                ["NAD", "$"],
                ["NZD", "$"],
                ["SGD", "$"],
                ["TTD", "$"],
                ["TWD", "NT$"],
                ["USD", "$"],
                ["XCD", "$"],
                ["VND", "₫"],
                ["AMD", "Dram"],
                ["CVE", "CVE"],
                ["EUR", "€"],
                ["AWG", "Afl."],
                ["HUF", "Ft"],
                ["BIF", "FBu"],
                ["CDF", "FrCD"],
                ["CHF", "CHF"],
                ["DJF", "Fdj"],
                ["GNF", "FG"],
                ["RWF", "RF"],
                ["XOF", "CFA"],
                ["XPF", "FCFP"],
                ["KMF", "CF"],
                ["XAF", "FCFA"],
                ["HTG", "HTG"],
                ["PYG", "Gs"],
                ["UAH", "₴"],
                ["PGK", "PGK"],
                ["LAK", "₭"],
                ["CZK", "Kč"],
                ["SEK", "kr"],
                ["ISK", "kr"],
                ["DKK", "kr"],
                ["NOK", "kr"],
                ["HRK", "kn"],
                ["MWK", "MWK"],
                ["ZMK", "ZWK"],
                ["AOA", "Kz"],
                ["MMK", "K"],
                ["GEL", "GEL"],
                ["LVL", "Ls"],
                ["ALL", "Lek"],
                ["HNL", "L"],
                ["SLL", "SLL"],
                ["MDL", "MDL"],
                ["RON", "RON"],
                ["BGN", "lev"],
                ["SZL", "SZL"],
                ["TRY", "TL"],
                ["LTL", "Lt"],
                ["LSL", "LSL"],
                ["AZN", "man."],
                ["BAM", "KM"],
                ["MZN", "MTn"],
                ["NGN", "₦"],
                ["ERN", "Nfk"],
                ["BTN", "Nu."],
                ["MRO", "MRO"],
                ["MOP", "MOP"],
                ["CUP", "$"],
                ["CUC", "$"],
                ["ARS", "$"],
                ["CLF", "UF"],
                ["CLP", "$"],
                ["COP", "$"],
                ["DOP", "$"],
                ["MXN", "$"],
                ["PHP", "₱"],
                ["UYU", "$"],
                ["FKP", "£"],
                ["GIP", "£"],
                ["SHP", "£"],
                ["EGP", "E£"],
                ["LBP", "L£"],
                ["SDG", "SDG"],
                ["SSP", "SSP"],
                ["GBP", "£"],
                ["SYP", "£"],
                ["BWP", "P"],
                ["GTQ", "Q"],
                ["ZAR", "R"],
                ["BRL", "R$"],
                ["OMR", "Rial"],
                ["QAR", "Rial"],
                ["YER", "Rial"],
                ["IRR", "Rial"],
                ["KHR", "Riel"],
                ["MYR", "RM"],
                ["SAR", "Rial"],
                ["BYR", "BYR"],
                ["RUB", "руб."],
                ["MUR", "Rs"],
                ["SCR", "SCR"],
                ["LKR", "Rs"],
                ["NPR", "Rs"],
                ["INR", "₹"],
                ["PKR", "Rs"],
                ["IDR", "Rp"],
                ["ILS", "₪"],
                ["KES", "Ksh"],
                ["SOS", "SOS"],
                ["TZS", "TSh"],
                ["UGX", "UGX"],
                ["PEN", "S/."],
                ["KGS", "KGS"],
                ["UZS", "soʼm"],
                ["TJS", "Som"],
                ["BDT", "৳"],
                ["WST", "WST"],
                ["KZT", "₸"],
                ["MNT", "₮"],
                ["VUV", "VUV"],
                ["KPW", "₩"],
                ["KRW", "₩"],
                ["JPY", "¥"],
                ["CNY", "¥"],
                ["PLN", "zł"],
                ["MVR", "Rf"],
                ["NLG", "NAf"],
                ["ZMW", "ZK"],
                ["ANG", "ƒ"],
                ["TMT", "TMT"]
            ]);
        }
        return this.__$_simpleCurrencySymbols;
    }
    static set _simpleCurrencySymbols(__$value) {
        this.__$_simpleCurrencySymbols = __$value;
    }
    _forPattern(locale, getPattern, _namedArguments) {
        let { name, currencySymbol, computeCurrencySymbol, decimalDigits, isForCurrency } = Object.assign({
            "isForCurrency": false
        }, _namedArguments);
        this._negativePrefix = '-';
        this._positivePrefix = '';
        this._negativeSuffix = '';
        this._positiveSuffix = '';
        this._groupingSize = 3;
        this._finalGroupingSize = 3;
        this._groupingSizeSetExplicitly = false;
        this._decimalSeparatorAlwaysShown = false;
        this._useSignForPositiveExponent = false;
        this._useExponentialNotation = false;
        this._isForCurrency = false;
        this.maximumIntegerDigits = 40;
        this.minimumIntegerDigits = 1;
        this.maximumFractionDigits = 3;
        this.minimumFractionDigits = 0;
        this.minimumExponentDigits = 0;
        this._significantDigits = 0;
        this.significantDigitsInUse = false;
        this._internalMultiplier = 1;
        this._multiplierDigits = 0;
        this._buffer = new core.DartStringBuffer();
        this._localeZero = 0;
        this._zeroOffset = 0;
        this._locale = Intl.verifiedLocale(locale, NumberFormat_1.localeExists.bind(this));
        this._isForCurrency = isForCurrency;
        this._currencySymbol = currencySymbol;
        this._decimalDigits = decimalDigits;
        this._symbols = lib8.properties.numberFormatSymbols.get(this._locale);
        this._localeZero = new core.DartString(this._symbols.ZERO_DIGIT).codeUnitAt(0);
        this._zeroOffset = this._localeZero - NumberFormat_1._zero;
        this._negativePrefix = this._symbols.MINUS_SIGN;
        this.currencyName = (name || this._symbols.DEF_CURRENCY_CODE);
        if (this._currencySymbol == null && computeCurrencySymbol != null) {
            this._currencySymbol = computeCurrencySymbol(this);
        }
        this._setPattern(getPattern(this._symbols));
    }
    static $compact(_namedArguments) {
        let { locale } = Object.assign({}, _namedArguments);
        return new _CompactNumberFormat({
            locale: locale, formatType: _CompactFormatType.COMPACT_DECIMAL_SHORT_PATTERN
        });
    }
    static $compactLong(_namedArguments) {
        let { locale } = Object.assign({}, _namedArguments);
        return new _CompactNumberFormat({
            locale: locale, formatType: _CompactFormatType.COMPACT_DECIMAL_LONG_PATTERN
        });
    }
    static $compactSimpleCurrency(_namedArguments) {
        let { locale, name, decimalDigits } = Object.assign({}, _namedArguments);
        return new _CompactNumberFormat({
            locale: locale, formatType: _CompactFormatType.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN, name: name, getPattern: (symbols) => {
                return symbols.CURRENCY_PATTERN;
            }, computeCurrencySymbol: (format) => {
                return (NumberFormat_1._simpleCurrencySymbols.get(format.currencyName) || format.currencyName);
            }, decimalDigits: decimalDigits, isForCurrency: true
        });
    }
    static $compactCurrency(_namedArguments) {
        let { locale, name, symbol, decimalDigits } = Object.assign({}, _namedArguments);
        return new _CompactNumberFormat({
            locale: locale, formatType: _CompactFormatType.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN, name: name, getPattern: (symbols) => {
                return symbols.CURRENCY_PATTERN;
            }, currencySymbol: symbol, decimalDigits: decimalDigits, isForCurrency: true
        });
    }
    get locale() {
        return this._locale;
    }
    static localeExists(localeName) {
        if (op(Op.EQUALS, localeName, null))
            return false;
        return lib8.properties.numberFormatSymbols.containsKey(localeName);
    }
    get symbols() {
        return this._symbols;
    }
    format(number) {
        if (this._isNaN(number))
            return this.symbols.NAN;
        if (this._isInfinite(number))
            return `${this._signPrefix(number)}${this.symbols.INFINITY}`;
        this._add(this._signPrefix(number));
        this._formatNumber(number.abs());
        this._add(this._signSuffix(number));
        let result = this._buffer.toString();
        this._buffer.clear();
        return result;
    }
    parse(text) {
        return new _NumberParser(this, text).value;
    }
    _formatNumber(number) {
        if (this._useExponentialNotation) {
            this._formatExponential(number);
        }
        else {
            this._formatFixed(number);
        }
    }
    _formatExponential(number) {
        if (number == 0.0) {
            this._formatFixed(number);
            this._formatExponent(0);
            return;
        }
        let exponent = new core.DartDouble((math.log(number) / NumberFormat_1._ln10)).floor();
        let mantissa = number / math.pow(10.0, exponent);
        if (this.maximumIntegerDigits > 1 && this.maximumIntegerDigits > this.minimumIntegerDigits) {
            while ((exponent % this.maximumIntegerDigits) != 0) {
                mantissa *= 10;
                exponent--;
            }
        }
        else {
            if (this.minimumIntegerDigits < 1) {
                exponent++;
                mantissa /= 10;
            }
            else {
                exponent -= this.minimumIntegerDigits - 1;
                mantissa *= math.pow(10, this.minimumIntegerDigits - 1);
            }
        }
        this._formatFixed(mantissa);
        this._formatExponent(exponent);
    }
    _formatExponent(exponent) {
        this._add(this.symbols.EXP_SYMBOL);
        if (exponent < 0) {
            exponent = -exponent;
            this._add(this.symbols.MINUS_SIGN);
        }
        else if (this._useSignForPositiveExponent) {
            this._add(this.symbols.PLUS_SIGN);
        }
        this._pad(this.minimumExponentDigits, new core.DartNumber(exponent).toString());
    }
    static get _maxInt() {
        if (this.__$_maxInt === undefined) {
            this.__$_maxInt = is(1, "double") ? math.pow(2, 52) : new core.DartDouble(1e+300).floor();
        }
        return this.__$_maxInt;
    }
    static set _maxInt(__$value) {
        this.__$_maxInt = __$value;
    }
    static get _maxDigits() {
        if (this.__$_maxDigits === undefined) {
            this.__$_maxDigits = new core.DartDouble((math.log(NumberFormat_1._maxInt) / math.log(10))).ceil();
        }
        return this.__$_maxDigits;
    }
    static set _maxDigits(__$value) {
        this.__$_maxDigits = __$value;
    }
    _isInfinite(number) {
        return is(number, "number") ? new core.DartNumber(number).isInfinite : false;
    }
    _isNaN(number) {
        return is(number, "number") ? new core.DartNumber(number).isNaN : false;
    }
    _floor(number) {
        if (number.isNegative && !(number.abs().isNegative)) {
            throw new core.ArgumentError(`Internal error: expected positive number, got ${number}`);
        }
        return (is(number, "number")) ? new core.DartNumber(number).floor() : op(Op.QUOTIENT, number, 1);
    }
    _round(number) {
        if (is(number, "number")) {
            if (new core.DartNumber(number).isInfinite) {
                return NumberFormat_1._maxInt;
            }
            else {
                return new core.DartNumber(number).round();
            }
        }
        else if (op(Op.EQUALS, number.remainder(1), 0)) {
            return number;
        }
        else {
            let basic = this._floor(number);
            let fraction = (op(Op.MINUS, number, basic)).toDouble().round();
            return op(Op.EQUALS, fraction, 0) ? number : op(Op.PLUS, number, fraction);
        }
    }
    static numberOfIntegerDigits(number) {
        let simpleNumber = number.toDouble().abs();
        if (op(Op.LT, simpleNumber, 10))
            return 1;
        if (op(Op.LT, simpleNumber, 100))
            return 2;
        if (op(Op.LT, simpleNumber, 1000))
            return 3;
        if (op(Op.LT, simpleNumber, 10000))
            return 4;
        if (op(Op.LT, simpleNumber, 100000))
            return 5;
        if (op(Op.LT, simpleNumber, 1000000))
            return 6;
        if (op(Op.LT, simpleNumber, 10000000))
            return 7;
        if (op(Op.LT, simpleNumber, 100000000))
            return 8;
        if (op(Op.LT, simpleNumber, 1000000000))
            return 9;
        if (op(Op.LT, simpleNumber, 10000000000))
            return 10;
        if (op(Op.LT, simpleNumber, 100000000000))
            return 11;
        if (op(Op.LT, simpleNumber, 1000000000000))
            return 12;
        if (op(Op.LT, simpleNumber, 10000000000000))
            return 13;
        if (op(Op.LT, simpleNumber, 100000000000000))
            return 14;
        if (op(Op.LT, simpleNumber, 1000000000000000))
            return 15;
        if (op(Op.LT, simpleNumber, 10000000000000000))
            return 16;
        return math.max(1, new core.DartDouble((math.log(simpleNumber) / NumberFormat_1._ln10)).ceil());
    }
    _fractionDigitsAfter(remainingSignificantDigits) {
        return math.max(0, remainingSignificantDigits);
    }
    _formatFixed(number) {
        let integerPart;
        let fractionPart;
        let extraIntegerDigits;
        let fractionDigits = this.maximumFractionDigits;
        let power = 0;
        let digitMultiplier;
        if (this._isInfinite(number)) {
            integerPart = number.toInt();
            extraIntegerDigits = 0;
            fractionPart = 0;
        }
        else {
            integerPart = this._floor(number);
            let fraction = op(Op.MINUS, number, integerPart);
            if (fraction.toInt() != 0) {
                integerPart = number;
                fraction = 0;
            }
            if (this.significantDigitsInUse) {
                let integerLength = NumberFormat_1.numberOfIntegerDigits(integerPart);
                let remainingSignificantDigits = this.significantDigits - this._multiplierDigits - integerLength;
                fractionDigits = this._fractionDigitsAfter(remainingSignificantDigits);
                if (remainingSignificantDigits < 0) {
                    let divideBy = math.pow(10, integerLength - this.significantDigits);
                    integerPart = op(Op.TIMES, (op(Op.DIVIDE, integerPart, divideBy)).round(), divideBy);
                }
            }
            power = math.pow(10, fractionDigits);
            digitMultiplier = power * this._multiplier;
            let remainingDigits = this._round(op(Op.TIMES, fraction, digitMultiplier)).toInt();
            if (op(Op.GEQ, remainingDigits, digitMultiplier)) {
                integerPart++;
                remainingDigits -= digitMultiplier;
            }
            extraIntegerDigits = op(Op.QUOTIENT, remainingDigits, power);
            fractionPart = op(Op.MODULE, remainingDigits, power);
        }
        let integerDigits = this._integerDigits(integerPart, extraIntegerDigits);
        let digitLength = new core.DartString(integerDigits).length;
        let fractionPresent = fractionDigits > 0 && (this.minimumFractionDigits > 0 || fractionPart > 0);
        if (this._hasIntegerDigits(integerDigits)) {
            let padding = op(Op.TIMES, '0', (this.minimumIntegerDigits - digitLength));
            integerDigits = `${padding}${integerDigits}`;
            digitLength = new core.DartString(integerDigits).length;
            for (let i = 0; i < digitLength; i++) {
                this._addDigit(new core.DartString(integerDigits).codeUnitAt(i));
                this._group(digitLength, i);
            }
        }
        else if (!fractionPresent) {
            this._addZero();
        }
        this._decimalSeparator(fractionPresent);
        this._formatFractionPart(new core.DartNumber((fractionPart + power)).toString());
    }
    _integerDigits(integerPart, extraIntegerDigits) {
        let paddingDigits = '';
        if (is(integerPart, "number") && integerPart > NumberFormat_1._maxInt) {
            let howManyDigitsTooBig = new core.DartDouble((math.log(integerPart) / NumberFormat_1._ln10)).ceil() - NumberFormat_1._maxDigits;
            let divisor = new core.DartNumber(math.pow(10, howManyDigitsTooBig)).round();
            if (divisor == 0)
                divisor = math.pow(10.0, howManyDigitsTooBig);
            paddingDigits = op(Op.TIMES, '0', new core.DartNumber(howManyDigitsTooBig).toInt());
            integerPart = new core.DartDouble((integerPart / divisor)).truncate();
        }
        let extra = op(Op.EQUALS, extraIntegerDigits, 0) ? '' : extraIntegerDigits.toString();
        let intDigits = this._mainIntegerDigits(integerPart);
        let paddedExtra = new core.DartString(intDigits).isEmpty ? extra : new core.DartString(extra).padLeft(this._multiplierDigits, '0');
        return `${intDigits}${paddedExtra}${paddingDigits}`;
    }
    _mainIntegerDigits(integer) {
        if (op(Op.EQUALS, integer, 0))
            return '';
        let digits = integer.toString();
        if (this.significantDigitsInUse && new core.DartString(digits).length > this.significantDigits) {
            digits = new core.DartString(digits).substring(0, this.significantDigits) + new core.DartString('').padLeft(new core.DartString(digits).length - this.significantDigits, '0');
        }
        return new core.DartString(digits).startsWith('-') ? new core.DartString(digits).substring(1) : digits;
    }
    _formatFractionPart(fractionPart) {
        let fractionLength = new core.DartString(fractionPart).length;
        while (new core.DartString(fractionPart).codeUnitAt(fractionLength - 1) == NumberFormat_1._zero && fractionLength > this.minimumFractionDigits + 1) {
            fractionLength--;
        }
        for (let i = 1; i < fractionLength; i++) {
            this._addDigit(new core.DartString(fractionPart).codeUnitAt(i));
        }
    }
    _decimalSeparator(fractionPresent) {
        if (this._decimalSeparatorAlwaysShown || fractionPresent) {
            this._add(this.symbols.DECIMAL_SEP);
        }
    }
    _hasIntegerDigits(digits) {
        return new core.DartString(digits).isNotEmpty || this.minimumIntegerDigits > 0;
    }
    _add(x) {
        this._buffer.write(x);
    }
    _addZero() {
        this._buffer.write(this.symbols.ZERO_DIGIT);
    }
    _addDigit(x) {
        this._buffer.writeCharCode(x + this._zeroOffset);
    }
    _pad(numberOfDigits, basic) {
        if (this._zeroOffset == 0) {
            this._buffer.write(new core.DartString(basic).padLeft(numberOfDigits, '0'));
        }
        else {
            this._slowPad(numberOfDigits, basic);
        }
    }
    _slowPad(numberOfDigits, basic) {
        for (let i = 0; i < numberOfDigits - new core.DartString(basic).length; i++) {
            this._add(this.symbols.ZERO_DIGIT);
        }
        for (let i = 0; i < new core.DartString(basic).length; i++) {
            this._addDigit(new core.DartString(basic).codeUnitAt(i));
        }
    }
    _group(totalLength, position) {
        let distanceFromEnd = totalLength - position;
        if (distanceFromEnd <= 1 || this._groupingSize <= 0)
            return;
        if (distanceFromEnd == this._finalGroupingSize + 1) {
            this._add(this.symbols.GROUP_SEP);
        }
        else if ((distanceFromEnd > this._finalGroupingSize) && (distanceFromEnd - this._finalGroupingSize) % this._groupingSize == 1) {
            this._add(this.symbols.GROUP_SEP);
        }
    }
    static get _zero() {
        if (this.__$_zero === undefined) {
            this.__$_zero = 48;
        }
        return this.__$_zero;
    }
    _signPrefix(x) {
        return x.isNegative ? this._negativePrefix : this._positivePrefix;
    }
    _signSuffix(x) {
        return x.isNegative ? this._negativeSuffix : this._positiveSuffix;
    }
    _setPattern(newPattern) {
        if (newPattern == null)
            return;
        this._pattern = new core.DartString(newPattern).replaceAll(' ', ' ');
        let parser = new _NumberFormatParser(this, newPattern, this.currencySymbol, this.decimalDigits);
        parser.parse();
        if (this._overridesDecimalDigits) {
            this._decimalDigits = (this._decimalDigits) || (this._defaultDecimalDigits);
            this.minimumFractionDigits = this._decimalDigits;
            this.maximumFractionDigits = this._decimalDigits;
        }
    }
    turnOffGrouping() {
        this._groupingSize = 0;
        this._finalGroupingSize = 0;
    }
    toString() {
        return `NumberFormat(${this._locale}, ${this._pattern})`;
    }
};
__decorate([
    namedConstructor
], NumberFormat.prototype, "decimalPattern", null);
__decorate([
    namedConstructor
], NumberFormat.prototype, "percentPattern", null);
__decorate([
    namedConstructor
], NumberFormat.prototype, "scientificPattern", null);
__decorate([
    namedConstructor
], NumberFormat.prototype, "currency", null);
__decorate([
    namedConstructor
], NumberFormat.prototype, "_forPattern", null);
__decorate([
    defaultFactory
], NumberFormat, "$NumberFormat", null);
__decorate([
    namedFactory
], NumberFormat, "$currencyPattern", null);
__decorate([
    namedFactory
], NumberFormat, "$simpleCurrency", null);
__decorate([
    namedFactory
], NumberFormat, "$compact", null);
__decorate([
    namedFactory
], NumberFormat, "$compactLong", null);
__decorate([
    namedFactory
], NumberFormat, "$compactSimpleCurrency", null);
__decorate([
    namedFactory
], NumberFormat, "$compactCurrency", null);
NumberFormat = NumberFormat_1 = __decorate([
    DartClass
], NumberFormat);
export { NumberFormat };
let _NumberParser = class _NumberParser {
    constructor(format, text) {
    }
    get symbols() {
        return this.format.symbols;
    }
    get _positivePrefix() {
        return this.format._positivePrefix;
    }
    get _negativePrefix() {
        return this.format._negativePrefix;
    }
    get _positiveSuffix() {
        return this.format._positiveSuffix;
    }
    get _negativeSuffix() {
        return this.format._negativeSuffix;
    }
    get _zero() {
        return NumberFormat._zero;
    }
    get _localeZero() {
        return this.format._localeZero;
    }
    _NumberParser(format, text) {
        this._normalized = new core.DartStringBuffer();
        this.gotPositive = false;
        this.gotNegative = false;
        this.gotPositiveSuffix = false;
        this.gotNegativeSuffix = false;
        this.done = false;
        this.prefixesSkipped = false;
        this.scale = 1;
        this.text = text;
        this.input = new _Stream(text);
        this.format = format;
        this.scale = this.format._internalMultiplier;
        this.value = this.parse();
    }
    get replacements() {
        return this._replacements = (this._replacements) || (this._initializeReplacements());
    }
    _initializeReplacements() {
        return new core.DartMap.literal([
            [this.symbols.DECIMAL_SEP, () => {
                    return '.';
                }],
            [this.symbols.EXP_SYMBOL, () => {
                    return 'E';
                }],
            [this.symbols.GROUP_SEP, this.handleSpace.bind(this)],
            [this.symbols.PERCENT, () => {
                    this.scale = _NumberFormatParser._PERCENT_SCALE;
                    return '';
                }],
            [this.symbols.PERMILL, () => {
                    this.scale = _NumberFormatParser._PER_MILLE_SCALE;
                    return '';
                }],
            [' ', this.handleSpace.bind(this)],
            [' ', this.handleSpace.bind(this)],
            ['+', () => {
                    return '+';
                }],
            ['-', () => {
                    return '-';
                }]
        ]);
    }
    invalidFormat() {
        throw new core.FormatException(`Invalid number: ${this.input.contents}`);
    }
    handleSpace() {
        return this.groupingIsNotASpaceOrElseItIsSpaceFollowedByADigit ? '' : this.invalidFormat();
    }
    get groupingIsNotASpaceOrElseItIsSpaceFollowedByADigit() {
        if (this.symbols.GROUP_SEP != ' ')
            return true;
        let peeked = this.input.peek(new core.DartString(this.symbols.GROUP_SEP).length + 1);
        return this.asDigit(op(Op.INDEX, peeked, op(Op.MINUS, peeked.length, 1))) != null;
    }
    asDigit(char) {
        let charCode = new core.DartString(char).codeUnitAt(0);
        let digitValue = charCode - this._localeZero;
        if (digitValue >= 0 && digitValue < 10) {
            return digitValue;
        }
        else {
            return null;
        }
    }
    checkPrefixes(_namedArguments) {
        let { skip } = Object.assign({
            "skip": false
        }, _namedArguments);
        var checkPrefix = (prefix) => {
            return new core.DartString(prefix).isNotEmpty && this.input.startsWith(prefix);
        };
        if (checkPrefix(this._positivePrefix))
            this.gotPositive = true;
        if (checkPrefix(this._negativePrefix))
            this.gotNegative = true;
        if (this.gotPositive && this.gotNegative) {
            if (new core.DartString(this._positivePrefix).length > new core.DartString(this._negativePrefix).length) {
                this.gotNegative = false;
            }
            else if (new core.DartString(this._negativePrefix).length > new core.DartString(this._positivePrefix).length) {
                this.gotPositive = false;
            }
        }
        if (skip) {
            if (this.gotPositive)
                this.input.read(new core.DartString(this._positivePrefix).length);
            if (this.gotNegative)
                this.input.read(new core.DartString(this._negativePrefix).length);
        }
    }
    checkSuffixes() {
        let remainder = this.input.rest();
        if (op(Op.EQUALS, remainder, this._positiveSuffix))
            this.gotPositiveSuffix = true;
        if (op(Op.EQUALS, remainder, this._negativeSuffix))
            this.gotNegativeSuffix = true;
    }
    processNonDigit() {
        let foundAnInterpretation = false;
        if (this.input.index == 0 && !this.prefixesSkipped) {
            this.prefixesSkipped = true;
            this.checkPrefixes({
                skip: true
            });
            foundAnInterpretation = true;
        }
        for (let key of this.replacements.keys) {
            if (this.input.startsWith(key)) {
                this._normalized.write((this.replacements.get(key))());
                this.input.read(new core.DartString(key).length);
                return;
            }
        }
        if (!foundAnInterpretation) {
            this.done = true;
        }
    }
    parse() {
        if (this.text == this.symbols.NAN)
            return (0.0 / 0.0);
        if (this.text == `${this._positivePrefix}${this.symbols.INFINITY}${this._positiveSuffix}`) {
            return 1.0 / 0.0;
        }
        if (this.text == `${this._negativePrefix}${this.symbols.INFINITY}${this._negativeSuffix}`) {
            return -1.0 / 0.0;
        }
        this.checkPrefixes();
        let parsed = this.parseNumber(this.input);
        if (this.gotPositive && !this.gotPositiveSuffix)
            this.invalidNumber();
        if (this.gotNegative && !this.gotNegativeSuffix)
            this.invalidNumber();
        if (!this.input.atEnd())
            this.invalidNumber();
        return parsed;
    }
    invalidNumber() {
        throw new core.FormatException(`Invalid Number: ${this.input.contents}`);
    }
    parseNumber(input) {
        if (this.gotNegative) {
            this._normalized.write('-');
        }
        while (!this.done && !input.atEnd()) {
            let digit = this.asDigit(input.peek());
            if (digit != null) {
                this._normalized.writeCharCode(this._zero + digit);
                input.next();
            }
            else {
                this.processNonDigit();
            }
            this.checkSuffixes();
        }
        let normalizedText = this._normalized.toString();
        let parsed = core.DartInt.parse(normalizedText, {
            onError: (message) => {
                return null;
            }
        });
        if (parsed == null)
            parsed = core.DartDouble.parse(normalizedText);
        return parsed / this.scale;
    }
};
__decorate([
    defaultConstructor
], _NumberParser.prototype, "_NumberParser", null);
_NumberParser = __decorate([
    DartClass
], _NumberParser);
export { _NumberParser };
let _NumberFormatParser = _NumberFormatParser_1 = class _NumberFormatParser {
    constructor(format, input, currencySymbol, decimalDigits) {
    }
    static get _PATTERN_SEPARATOR() {
        if (this.__$_PATTERN_SEPARATOR === undefined) {
            this.__$_PATTERN_SEPARATOR = ';';
        }
        return this.__$_PATTERN_SEPARATOR;
    }
    static get _QUOTE() {
        if (this.__$_QUOTE === undefined) {
            this.__$_QUOTE = "'";
        }
        return this.__$_QUOTE;
    }
    static get _PATTERN_DIGIT() {
        if (this.__$_PATTERN_DIGIT === undefined) {
            this.__$_PATTERN_DIGIT = '#';
        }
        return this.__$_PATTERN_DIGIT;
    }
    static get _PATTERN_ZERO_DIGIT() {
        if (this.__$_PATTERN_ZERO_DIGIT === undefined) {
            this.__$_PATTERN_ZERO_DIGIT = '0';
        }
        return this.__$_PATTERN_ZERO_DIGIT;
    }
    static get _PATTERN_GROUPING_SEPARATOR() {
        if (this.__$_PATTERN_GROUPING_SEPARATOR === undefined) {
            this.__$_PATTERN_GROUPING_SEPARATOR = ',';
        }
        return this.__$_PATTERN_GROUPING_SEPARATOR;
    }
    static get _PATTERN_DECIMAL_SEPARATOR() {
        if (this.__$_PATTERN_DECIMAL_SEPARATOR === undefined) {
            this.__$_PATTERN_DECIMAL_SEPARATOR = '.';
        }
        return this.__$_PATTERN_DECIMAL_SEPARATOR;
    }
    static get _PATTERN_CURRENCY_SIGN() {
        if (this.__$_PATTERN_CURRENCY_SIGN === undefined) {
            this.__$_PATTERN_CURRENCY_SIGN = '¤';
        }
        return this.__$_PATTERN_CURRENCY_SIGN;
    }
    static get _PATTERN_PER_MILLE() {
        if (this.__$_PATTERN_PER_MILLE === undefined) {
            this.__$_PATTERN_PER_MILLE = '‰';
        }
        return this.__$_PATTERN_PER_MILLE;
    }
    static get _PER_MILLE_SCALE() {
        if (this.__$_PER_MILLE_SCALE === undefined) {
            this.__$_PER_MILLE_SCALE = 1000;
        }
        return this.__$_PER_MILLE_SCALE;
    }
    static get _PATTERN_PERCENT() {
        if (this.__$_PATTERN_PERCENT === undefined) {
            this.__$_PATTERN_PERCENT = '%';
        }
        return this.__$_PATTERN_PERCENT;
    }
    static get _PERCENT_SCALE() {
        if (this.__$_PERCENT_SCALE === undefined) {
            this.__$_PERCENT_SCALE = 100;
        }
        return this.__$_PERCENT_SCALE;
    }
    static get _PATTERN_EXPONENT() {
        if (this.__$_PATTERN_EXPONENT === undefined) {
            this.__$_PATTERN_EXPONENT = 'E';
        }
        return this.__$_PATTERN_EXPONENT;
    }
    static get _PATTERN_PLUS() {
        if (this.__$_PATTERN_PLUS === undefined) {
            this.__$_PATTERN_PLUS = '+';
        }
        return this.__$_PATTERN_PLUS;
    }
    _NumberFormatParser(format, input, currencySymbol, decimalDigits) {
        this.inQuote = false;
        this.decimalPos = -1;
        this.digitLeftCount = 0;
        this.zeroDigitCount = 0;
        this.digitRightCount = 0;
        this.groupingCount = -1;
        this.pattern = _iterator(input);
        this.format = format;
        this.currencySymbol = currencySymbol;
        this.decimalDigits = decimalDigits;
        this.pattern.moveNext();
    }
    get symbols() {
        return this.format.symbols;
    }
    parse() {
        this.format._positivePrefix = this._parseAffix();
        let trunk = this._parseTrunk();
        this.format._positiveSuffix = this._parseAffix();
        if (this.pattern.current == _NumberFormatParser_1._PATTERN_SEPARATOR) {
            this.pattern.moveNext();
            this.format._negativePrefix = this._parseAffix();
            for (let each of _iterable(trunk)) {
                if (this.pattern.current != each && this.pattern.current != null) {
                    throw new core.FormatException("Positive and negative trunks must be the same");
                }
                this.pattern.moveNext();
            }
            this.format._negativeSuffix = this._parseAffix();
        }
        else {
            this.format._negativePrefix = this.format._negativePrefix + this.format._positivePrefix;
            this.format._negativeSuffix = this.format._positiveSuffix + this.format._negativeSuffix;
        }
    }
    _parseAffix() {
        let affix = new core.DartStringBuffer();
        this.inQuote = false;
        while (this.parseCharacterAffix(affix) && this.pattern.moveNext()) /* TODO (EmptyStatementImpl) : ; */
            ;
        return affix.toString();
    }
    parseCharacterAffix(affix) {
        let ch = this.pattern.current;
        if (ch == null)
            return false;
        if (ch == _NumberFormatParser_1._QUOTE) {
            if (this.pattern.peek == _NumberFormatParser_1._QUOTE) {
                this.pattern.moveNext();
                affix.write(_NumberFormatParser_1._QUOTE);
            }
            else {
                this.inQuote = !this.inQuote;
            }
            return true;
        }
        if (this.inQuote) {
            affix.write(ch);
        }
        else {
            switch (ch) {
                case _NumberFormatParser_1._PATTERN_DIGIT:
                case _NumberFormatParser_1._PATTERN_ZERO_DIGIT:
                case _NumberFormatParser_1._PATTERN_GROUPING_SEPARATOR:
                case _NumberFormatParser_1._PATTERN_DECIMAL_SEPARATOR:
                case _NumberFormatParser_1._PATTERN_SEPARATOR:
                    return false;
                case _NumberFormatParser_1._PATTERN_CURRENCY_SIGN:
                    affix.write(this.currencySymbol);
                    break;
                case _NumberFormatParser_1._PATTERN_PERCENT:
                    if (this.format._multiplier != 1 && this.format._multiplier != _NumberFormatParser_1._PERCENT_SCALE) {
                        throw new core.FormatException('Too many percent/permill');
                    }
                    this.format._multiplier = _NumberFormatParser_1._PERCENT_SCALE;
                    affix.write(this.symbols.PERCENT);
                    break;
                case _NumberFormatParser_1._PATTERN_PER_MILLE:
                    if (this.format._multiplier != 1 && this.format._multiplier != _NumberFormatParser_1._PER_MILLE_SCALE) {
                        throw new core.FormatException('Too many percent/permill');
                    }
                    this.format._multiplier = _NumberFormatParser_1._PER_MILLE_SCALE;
                    affix.write(this.symbols.PERMILL);
                    break;
                default:
                    affix.write(ch);
            }
        }
        return true;
    }
    _parseTrunk() {
        let loop = true;
        let trunk = new core.DartStringBuffer();
        while (this.pattern.current != null && loop) {
            loop = this.parseTrunkCharacter(trunk);
        }
        if (op(Op.EQUALS, this.zeroDigitCount, 0) && op(Op.GT, this.digitLeftCount, 0) && op(Op.GEQ, this.decimalPos, 0)) {
            let n = op(Op.EQUALS, this.decimalPos, 0) ? 1 : this.decimalPos;
            this.digitRightCount = op(Op.MINUS, this.digitLeftCount, n);
            this.digitLeftCount = op(Op.MINUS, n, 1);
            this.zeroDigitCount = 1;
        }
        if (op(Op.LT, this.decimalPos, 0) && op(Op.GT, this.digitRightCount, 0) || op(Op.GEQ, this.decimalPos, 0) && (op(Op.LT, this.decimalPos, this.digitLeftCount) || op(Op.GT, this.decimalPos, op(Op.PLUS, this.digitLeftCount, this.zeroDigitCount))) || op(Op.EQUALS, this.groupingCount, 0)) {
            throw new core.FormatException(`Malformed pattern "${this.pattern.input}"`);
        }
        let totalDigits = op(Op.PLUS, op(Op.PLUS, this.digitLeftCount, this.zeroDigitCount), this.digitRightCount);
        this.format.maximumFractionDigits = op(Op.GEQ, this.decimalPos, 0) ? op(Op.MINUS, totalDigits, this.decimalPos) : 0;
        if (op(Op.GEQ, this.decimalPos, 0)) {
            this.format.minimumFractionDigits = op(Op.MINUS, op(Op.PLUS, this.digitLeftCount, this.zeroDigitCount), this.decimalPos);
            if (this.format.minimumFractionDigits < 0) {
                this.format.minimumFractionDigits = 0;
            }
        }
        let effectiveDecimalPos = op(Op.GEQ, this.decimalPos, 0) ? this.decimalPos : totalDigits;
        this.format.minimumIntegerDigits = op(Op.MINUS, effectiveDecimalPos, this.digitLeftCount);
        if (this.format._useExponentialNotation) {
            this.format.maximumIntegerDigits = op(Op.PLUS, this.digitLeftCount, this.format.minimumIntegerDigits);
            if (this.format.maximumFractionDigits == 0 && this.format.minimumIntegerDigits == 0) {
                this.format.minimumIntegerDigits = 1;
            }
        }
        this.format._finalGroupingSize = math.max(0, this.groupingCount);
        if (!this.format._groupingSizeSetExplicitly) {
            this.format._groupingSize = this.format._finalGroupingSize;
        }
        this.format._decimalSeparatorAlwaysShown = op(Op.EQUALS, this.decimalPos, 0) || op(Op.EQUALS, this.decimalPos, totalDigits);
        return trunk.toString();
    }
    parseTrunkCharacter(trunk) {
        let ch = this.pattern.current;
        switch (ch) {
            case _NumberFormatParser_1._PATTERN_DIGIT:
                if (op(Op.GT, this.zeroDigitCount, 0)) {
                    this.digitRightCount++;
                }
                else {
                    this.digitLeftCount++;
                }
                if (op(Op.GEQ, this.groupingCount, 0) && op(Op.LT, this.decimalPos, 0)) {
                    this.groupingCount++;
                }
                break;
            case _NumberFormatParser_1._PATTERN_ZERO_DIGIT:
                if (op(Op.GT, this.digitRightCount, 0)) {
                    throw new core.FormatException('Unexpected "0" in pattern "' + this.pattern.input + '"');
                }
                this.zeroDigitCount++;
                if (op(Op.GEQ, this.groupingCount, 0) && op(Op.LT, this.decimalPos, 0)) {
                    this.groupingCount++;
                }
                break;
            case _NumberFormatParser_1._PATTERN_GROUPING_SEPARATOR:
                if (op(Op.GT, this.groupingCount, 0)) {
                    this.format._groupingSizeSetExplicitly = true;
                    this.format._groupingSize = this.groupingCount;
                }
                this.groupingCount = 0;
                break;
            case _NumberFormatParser_1._PATTERN_DECIMAL_SEPARATOR:
                if (op(Op.GEQ, this.decimalPos, 0)) {
                    throw new core.FormatException(`Multiple decimal separators in pattern "${this.pattern}"`);
                }
                this.decimalPos = op(Op.PLUS, op(Op.PLUS, this.digitLeftCount, this.zeroDigitCount), this.digitRightCount);
                break;
            case _NumberFormatParser_1._PATTERN_EXPONENT:
                trunk.write(ch);
                if (this.format._useExponentialNotation) {
                    throw new core.FormatException(`Multiple exponential symbols in pattern "${this.pattern}"`);
                }
                this.format._useExponentialNotation = true;
                this.format.minimumExponentDigits = 0;
                this.pattern.moveNext();
                let nextChar = this.pattern.current;
                if (nextChar == _NumberFormatParser_1._PATTERN_PLUS) {
                    trunk.write(this.pattern.current);
                    this.pattern.moveNext();
                    this.format._useSignForPositiveExponent = true;
                }
                while (this.pattern.current == _NumberFormatParser_1._PATTERN_ZERO_DIGIT) {
                    trunk.write(this.pattern.current);
                    this.pattern.moveNext();
                    this.format.minimumExponentDigits++;
                }
                if (op(Op.LT, (op(Op.PLUS, this.digitLeftCount, this.zeroDigitCount)), 1) || this.format.minimumExponentDigits < 1) {
                    throw new core.FormatException(`Malformed exponential pattern "${this.pattern}"`);
                }
                return false;
            default:
                return false;
        }
        trunk.write(ch);
        this.pattern.moveNext();
        return true;
    }
};
__decorate([
    defaultConstructor
], _NumberFormatParser.prototype, "_NumberFormatParser", null);
_NumberFormatParser = _NumberFormatParser_1 = __decorate([
    DartClass
], _NumberFormatParser);
export { _NumberFormatParser };
let _StringIterable = class _StringIterable extends core.DartIterableBase {
    constructor(s) {
        // @ts-ignore
        super();
    }
    _StringIterable(s) {
        this.iterator = _iterator(s);
    }
};
__decorate([
    defaultConstructor
], _StringIterable.prototype, "_StringIterable", null);
_StringIterable = __decorate([
    DartClass
], _StringIterable);
export { _StringIterable };
let _StringIterator = _StringIterator_1 = class _StringIterator {
    constructor(input) {
    }
    next(value) {
        return {
            done: !this.moveNext(),
            value: this.current
        };
    }
    _StringIterator(input) {
        this.nextIndex = 0;
        this._current = null;
        this.input = _StringIterator_1._validate(input);
    }
    get current() {
        return this._current;
    }
    moveNext() {
        if (this.nextIndex >= new core.DartString(this.input).length) {
            this._current = null;
            return false;
        }
        this._current = this.input[this.nextIndex++];
        return true;
    }
    get peek() {
        return this.nextIndex >= new core.DartString(this.input).length ? null : this.input[this.nextIndex];
    }
    get iterator() {
        return this;
    }
    static _validate(input) {
        if (isNot(input, "string"))
            throw new core.ArgumentError(input);
        return input;
    }
};
__decorate([
    defaultConstructor
], _StringIterator.prototype, "_StringIterator", null);
_StringIterator = _StringIterator_1 = __decorate([
    DartClass,
    Implements(core.DartIterator)
], _StringIterator);
export { _StringIterator };
let MicroMoney = class MicroMoney {
    constructor(micros) {
    }
    static $MicroMoney(micros) {
        return new _MicroMoney(micros);
    }
};
__decorate([
    defaultFactory
], MicroMoney, "$MicroMoney", null);
MicroMoney = __decorate([
    DartClass
], MicroMoney);
export { MicroMoney };
let _MicroMoney = _MicroMoney_1 = class _MicroMoney {
    constructor(_micros) {
    }
    _MicroMoney(_micros) {
        this._micros = _micros;
    }
    static get _multiplier() {
        if (this.__$_multiplier === undefined) {
            this.__$_multiplier = 1000000;
        }
        return this.__$_multiplier;
    }
    get _integerPart() {
        return op(Op.QUOTIENT, this._micros, _MicroMoney_1._multiplier);
    }
    get _fractionPart() {
        return (op(Op.MINUS, this, this._integerPart))._micros.toInt().abs();
    }
    get isNegative() {
        return this._micros.isNegative;
    }
    abs() {
        return this.isNegative ? new _MicroMoney_1(this._micros.abs()) : this;
    }
    [OperatorMethods.MINUS](other) {
        if (is(other, _MicroMoney_1))
            return new _MicroMoney_1(op(Op.MINUS, this._micros, other._micros));
        return new _MicroMoney_1(op(Op.MINUS, this._micros, (op(Op.TIMES, other, _MicroMoney_1._multiplier))));
    }
    [OperatorMethods.PLUS](other) {
        if (is(other, _MicroMoney_1))
            return new _MicroMoney_1(op(Op.PLUS, this._micros, other._micros));
        return new _MicroMoney_1(op(Op.PLUS, this._micros, (op(Op.TIMES, other, _MicroMoney_1._multiplier))));
    }
    [OperatorMethods.QUOTIENT](divisor) {
        if (isNot(divisor, "number")) {
            throw new core.ArgumentError.value(divisor, 'divisor', '_MicroMoney ~/ only supports int arguments.');
        }
        return new _MicroMoney_1(op(Op.TIMES, (op(Op.QUOTIENT, this._integerPart, divisor)), _MicroMoney_1._multiplier));
    }
    [OperatorMethods.MULTIPLY](other) {
        if (isNot(other, "number")) {
            throw new core.ArgumentError.value(other, 'other', '_MicroMoney * only supports int arguments.');
        }
        return new _MicroMoney_1(op(Op.PLUS, op(Op.TIMES, (op(Op.TIMES, this._integerPart, other)), _MicroMoney_1._multiplier), (this._fractionPart * other)));
    }
    remainder(other) {
        if (isNot(other, "number")) {
            throw new core.ArgumentError.value(other, 'other', '_MicroMoney.remainder only supports int arguments.');
        }
        return new _MicroMoney_1(this._micros.remainder(other * _MicroMoney_1._multiplier));
    }
    toDouble() {
        return op(Op.DIVIDE, this._micros.toDouble(), _MicroMoney_1._multiplier);
    }
    toInt() {
        return this._integerPart.toInt();
    }
    toString() {
        let beforeDecimal = this._integerPart.toString();
        let decimalPart = '';
        let fractionPart = this._fractionPart;
        if (fractionPart != 0) {
            decimalPart = '.' + new core.DartInt(fractionPart).toString();
        }
        return `${beforeDecimal}${decimalPart}`;
    }
};
__decorate([
    defaultConstructor
], _MicroMoney.prototype, "_MicroMoney", null);
_MicroMoney = _MicroMoney_1 = __decorate([
    DartClass,
    Implements(MicroMoney)
], _MicroMoney);
export { _MicroMoney };
let _CompactStyleWithNegative = class _CompactStyleWithNegative extends _CompactStyleBase {
    constructor(positiveStyle, negativeStyle) {
        // @ts-ignore
        super();
    }
    _CompactStyleWithNegative(positiveStyle, negativeStyle) {
        this.positiveStyle = positiveStyle;
        this.negativeStyle = negativeStyle;
    }
    styleForSign(number) {
        return op(Op.LT, number, 0) ? this.negativeStyle : this.positiveStyle;
    }
    get totalDigits() {
        return this.positiveStyle.totalDigits;
    }
    get divisor() {
        return this.positiveStyle.divisor;
    }
    get allStyles() {
        return new core.DartList.literal(this.positiveStyle, this.negativeStyle);
    }
};
__decorate([
    defaultConstructor
], _CompactStyleWithNegative.prototype, "_CompactStyleWithNegative", null);
_CompactStyleWithNegative = __decorate([
    DartClass
], _CompactStyleWithNegative);
export { _CompactStyleWithNegative };
let _CompactStyle = class _CompactStyle extends _CompactStyleBase {
    constructor(_namedArguments) {
        // @ts-ignore
        super();
    }
    _CompactStyle(_namedArguments) {
        let { pattern, requiredDigits, divisor, expectedDigits, prefix, suffix } = Object.assign({
            "requiredDigits": 0,
            "divisor": 1,
            "expectedDigits": 1,
            "prefix": '',
            "suffix": ''
        }, _namedArguments);
        this.pattern = pattern;
        this.requiredDigits = requiredDigits;
        this.divisor = divisor;
        this.expectedDigits = expectedDigits;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    get totalDigits() {
        return this.requiredDigits + this.expectedDigits - 1;
    }
    get isFallback() {
        return this.pattern == null || this.pattern == '0';
    }
    get printsAsIs() {
        return this.isFallback || new core.DartString(new core.DartString(this.pattern).replaceAll(new core.DartRegExp('[0 ¤]'), '')).isEmpty;
    }
    styleForSign(number) {
        return this;
    }
    get allStyles() {
        return new core.DartList.literal(this);
    }
};
__decorate([
    defaultConstructor
], _CompactStyle.prototype, "_CompactStyle", null);
_CompactStyle = __decorate([
    DartClass
], _CompactStyle);
export { _CompactStyle };
let _CompactNumberFormat = _CompactNumberFormat_1 = class _CompactNumberFormat extends NumberFormat {
    constructor(_namedArguments) {
        // @ts-ignore
        super();
    }
    static _forDecimal(symbols) {
        return symbols.DECIMAL_PATTERN;
    }
    _CompactNumberFormat(_namedArguments) {
        let { locale, formatType, name, currencySymbol, getPattern, computeCurrencySymbol, decimalDigits, isForCurrency } = Object.assign({
            "getPattern": _CompactNumberFormat_1._forDecimal.bind(this),
            "isForCurrency": false
        }, _namedArguments);
        this._styles = new core.DartList.literal();
        this._regex = new core.DartRegExp('([^0]*)(0+)(.*)');
        this._justZeros = new core.DartRegExp('^0*$');
        super._forPattern(locale, getPattern, {
            name: name, currencySymbol: currencySymbol, computeCurrencySymbol: computeCurrencySymbol, decimalDigits: decimalDigits, isForCurrency: isForCurrency
        });
        this.significantDigits = 3;
        this.turnOffGrouping();
        switch (formatType) {
            case _CompactFormatType.COMPACT_DECIMAL_SHORT_PATTERN:
                this._patterns = this.compactSymbols.COMPACT_DECIMAL_SHORT_PATTERN;
                break;
            case _CompactFormatType.COMPACT_DECIMAL_LONG_PATTERN:
                this._patterns = (this.compactSymbols.COMPACT_DECIMAL_LONG_PATTERN || this.compactSymbols.COMPACT_DECIMAL_SHORT_PATTERN);
                break;
            case _CompactFormatType.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN:
                this._patterns = this.compactSymbols.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN;
                break;
            default:
                throw new core.ArgumentError.notNull("formatType");
        }
        this._patterns.forEach((impliedDigits, pattern) => {
            if (new core.DartString(pattern).contains(";")) {
                let patterns = new core.DartString(pattern).split(";");
                this._styles.add(new _CompactStyleWithNegative(this._createStyle(patterns.first, impliedDigits), this._createStyle(patterns.last, impliedDigits)));
            }
            else {
                this._styles.add(this._createStyle(pattern, impliedDigits));
            }
        });
        this._styles = this._styles.reversed.toList();
        this._styles.add(new _CompactStyle());
    }
    _hasNonZeroContent(pattern) {
        return !this._justZeros.hasMatch(pattern);
    }
    _createStyle(pattern, impliedDigits) {
        let match = this._regex.firstMatch(pattern);
        let integerDigits = match.group(2).length;
        let prefix = match.group(1);
        let suffix = match.group(3);
        let divisor = 1;
        if (this._hasNonZeroContent(pattern)) {
            divisor = math.pow(10, impliedDigits - integerDigits + 1);
        }
        return new _CompactStyle({
            pattern: pattern, requiredDigits: impliedDigits, expectedDigits: integerDigits, prefix: prefix, suffix: suffix, divisor: divisor
        });
    }
    format(number) {
        this._style = this._styleFor(number);
        let divisor = this._style.printsAsIs ? 1 : this._style.divisor;
        let numberToFormat = this._divide(number, divisor);
        let formatted = super.format(numberToFormat);
        let prefix = this._style.prefix;
        let suffix = this._style.suffix;
        if (this._isForCurrency && !this._style.isFallback) {
            formatted = new core.DartString(new core.DartString(formatted).replaceFirst(this.currencySymbol, '')).trim();
            prefix = new core.DartString(prefix).replaceFirst('¤', this.currencySymbol);
            suffix = new core.DartString(suffix).replaceFirst('¤', this.currencySymbol);
        }
        let withExtras = `${prefix}${formatted}${suffix}`;
        this._style = null;
        return withExtras;
    }
    _fractionDigitsAfter(remainingSignificantDigits) {
        let newFractionDigits = super._fractionDigitsAfter(remainingSignificantDigits);
        if (!this._isForCurrency || !this._style.isFallback)
            return newFractionDigits;
        if (newFractionDigits > 0 && newFractionDigits < this.decimalDigits) {
            return this.decimalDigits;
        }
        else {
            return math.min(newFractionDigits, this.decimalDigits);
        }
    }
    _divide(numerator, denominator) {
        if (is(numerator, "number")) {
            return numerator / denominator;
        }
        let divided = op(Op.QUOTIENT, numerator, denominator);
        let integerPart = divided.toInt();
        if (divided != integerPart) {
            throw new core.FormatException("Number too big to use with compact format", numerator);
        }
        let remainder = numerator.remainder(denominator).toInt();
        let originalFraction = op(Op.MINUS, numerator, (op(Op.QUOTIENT, numerator, 1)));
        let fraction = op(Op.EQUALS, originalFraction, 0) ? 0 : op(Op.DIVIDE, originalFraction, denominator);
        return op(Op.PLUS, op(Op.PLUS, integerPart, (op(Op.DIVIDE, remainder, denominator))), fraction);
    }
    _styleFor(number) {
        let originalLength = NumberFormat.numberOfIntegerDigits(number);
        let additionalDigits = originalLength - this.significantDigits;
        let digitLength = originalLength;
        if (additionalDigits > 0) {
            let divisor = math.pow(10, additionalDigits);
            let rounded = op(Op.TIMES, (op(Op.DIVIDE, number.toDouble(), divisor)).round(), divisor);
            digitLength = NumberFormat.numberOfIntegerDigits(rounded);
        }
        for (let style of this._styles) {
            if (digitLength > style.totalDigits) {
                return style.styleForSign(number);
            }
        }
        throw new core.FormatException("No compact style found for number. This should not happen", number);
    }
    get _stylesForSearching() {
        return this._styles.reversed.expand((x) => {
            return x.allStyles;
        });
    }
    parse(text) {
        for (let style of this._stylesForSearching) {
            if (new core.DartString(text).startsWith(style.prefix) && new core.DartString(text).endsWith(style.suffix)) {
                let numberText = new core.DartString(text).substring(new core.DartString(style.prefix).length, new core.DartString(text).length - new core.DartString(style.suffix).length);
                let number = this._tryParsing(numberText);
                if (number != null) {
                    return number * style.divisor;
                }
            }
        }
        throw new core.FormatException(`Cannot parse compact number in locale '${this.locale}'`, text);
    }
    _tryParsing(text) {
        try {
            return super.parse(text);
        }
        catch (__error__) {
            if (is(__error__, core.FormatException)) {
                return null;
            }
        }
    }
    get compactSymbols() {
        return lib8.properties.compactNumberSymbols.get(this._locale);
    }
};
__decorate([
    defaultConstructor
], _CompactNumberFormat.prototype, "_CompactNumberFormat", null);
_CompactNumberFormat = _CompactNumberFormat_1 = __decorate([
    DartClass
], _CompactNumberFormat);
export { _CompactNumberFormat };
let _DateFormatLiteralField = class _DateFormatLiteralField extends _DateFormatField {
    constructor(pattern, parent) {
        // @ts-ignore
        super();
    }
    _DateFormatLiteralField(pattern, parent) {
        super._DateFormatField(pattern, parent);
    }
    parse(input, dateFields) {
        this.parseLiteral(input);
    }
    parseLoose(input, dateFields) {
        return this.parseLiteralLoose(input);
    }
};
__decorate([
    defaultConstructor
], _DateFormatLiteralField.prototype, "_DateFormatLiteralField", null);
_DateFormatLiteralField = __decorate([
    DartClass
], _DateFormatLiteralField);
export { _DateFormatLiteralField };
let _DateFormatQuotedField = _DateFormatQuotedField_1 = class _DateFormatQuotedField extends _DateFormatField {
    constructor(pattern, parent) {
        // @ts-ignore
        super();
    }
    fullPattern() {
        return this._fullPattern;
    }
    _DateFormatQuotedField(pattern, parent) {
        super._DateFormatField(_DateFormatQuotedField_1._patchQuotes(pattern), parent);
        this._fullPattern = pattern;
    }
    parse(input, dateFields) {
        this.parseLiteral(input);
    }
    parseLoose(input, dateFields) {
        return this.parseLiteralLoose(input);
    }
    static get _twoEscapedQuotes() {
        if (this.__$_twoEscapedQuotes === undefined) {
            this.__$_twoEscapedQuotes = new core.DartRegExp("''");
        }
        return this.__$_twoEscapedQuotes;
    }
    static set _twoEscapedQuotes(__$value) {
        this.__$_twoEscapedQuotes = __$value;
    }
    static _patchQuotes(pattern) {
        if (pattern == "''") {
            return "'";
        }
        else {
            return new core.DartString(new core.DartString(pattern).substring(1, new core.DartString(pattern).length - 1)).replaceAll(_DateFormatQuotedField_1._twoEscapedQuotes, "'");
        }
    }
};
__decorate([
    defaultConstructor
], _DateFormatQuotedField.prototype, "_DateFormatQuotedField", null);
_DateFormatQuotedField = _DateFormatQuotedField_1 = __decorate([
    DartClass
], _DateFormatQuotedField);
export { _DateFormatQuotedField };
let _DateFormatPatternField = class _DateFormatPatternField extends _DateFormatField {
    constructor(pattern, parent) {
        // @ts-ignore
        super();
    }
    _DateFormatPatternField(pattern, parent) {
        super._DateFormatField(pattern, parent);
    }
    format(date) {
        return this.formatField(date);
    }
    parse(input, dateFields) {
        this.parseField(input, dateFields);
    }
    parseLoose(input, dateFields) {
        new _LoosePatternField(this.pattern, this.parent).parse(input, dateFields);
    }
    get forDate() {
        return this._forDate = (this._forDate) || (new core.DartString('cdDEGLMQvyZz').contains(this.pattern[0]));
    }
    parseField(input, builder) {
        try {
            switch (this.pattern[0]) {
                case 'a':
                    this.parseAmPm(input, builder);
                    break;
                case 'c':
                    this.parseStandaloneDay(input);
                    break;
                case 'd':
                    this.handleNumericField(input, builder.setDay.bind(builder));
                    break;
                case 'D':
                    this.handleNumericField(input, builder.setDay.bind(builder));
                    break;
                case 'E':
                    this.parseDayOfWeek(input);
                    break;
                case 'G':
                    this.parseEra(input);
                    break;
                case 'h':
                    this.parse1To12Hours(input, builder);
                    break;
                case 'H':
                    this.handleNumericField(input, builder.setHour.bind(builder));
                    break;
                case 'K':
                    this.handleNumericField(input, builder.setHour.bind(builder));
                    break;
                case 'k':
                    this.handleNumericField(input, builder.setHour.bind(builder), -1);
                    break;
                case 'L':
                    this.parseStandaloneMonth(input, builder);
                    break;
                case 'M':
                    this.parseMonth(input, builder);
                    break;
                case 'm':
                    this.handleNumericField(input, builder.setMinute.bind(builder));
                    break;
                case 'Q':
                    break;
                case 'S':
                    this.handleNumericField(input, builder.setFractionalSecond.bind(builder));
                    break;
                case 's':
                    this.handleNumericField(input, builder.setSecond.bind(builder));
                    break;
                case 'v':
                    break;
                case 'y':
                    this.handleNumericField(input, builder.setYear.bind(builder));
                    break;
                case 'z':
                    break;
                case 'Z':
                    break;
                default:
                    return;
            }
        }
        catch (__error__) {
            {
                let e = __error__;
                this.throwFormatException(input);
            }
        }
    }
    formatField(date) {
        switch (this.pattern[0]) {
            case 'a':
                return this.formatAmPm(date);
            case 'c':
                return this.formatStandaloneDay(date);
            case 'd':
                return this.formatDayOfMonth(date);
            case 'D':
                return this.formatDayOfYear(date);
            case 'E':
                return this.formatDayOfWeek(date);
            case 'G':
                return this.formatEra(date);
            case 'h':
                return this.format1To12Hours(date);
            case 'H':
                return this.format0To23Hours(date);
            case 'K':
                return this.format0To11Hours(date);
            case 'k':
                return this.format24Hours(date);
            case 'L':
                return this.formatStandaloneMonth(date);
            case 'M':
                return this.formatMonth(date);
            case 'm':
                return this.formatMinutes(date);
            case 'Q':
                return this.formatQuarter(date);
            case 'S':
                return this.formatFractionalSeconds(date);
            case 's':
                return this.formatSeconds(date);
            case 'v':
                return this.formatTimeZoneId(date);
            case 'y':
                return this.formatYear(date);
            case 'z':
                return this.formatTimeZone(date);
            case 'Z':
                return this.formatTimeZoneRFC(date);
            default:
                return '';
        }
    }
    get symbols() {
        return this.parent.dateSymbols;
    }
    formatEra(date) {
        let era = date.year > 0 ? 1 : 0;
        return this.width >= 4 ? this.symbols.ERANAMES[era] : this.symbols.ERAS[era];
    }
    formatYear(date) {
        let year = date.year;
        if (year < 0) {
            year = -year;
        }
        return this.width == 2 ? this.padTo(2, year % 100) : this.padTo(this.width, year);
    }
    handleNumericField(input, setter, offset) {
        offset = offset || 0;
        let result = input.nextInteger({
            digitMatcher: this.parent.digitMatcher, zeroDigit: this.parent.localeZeroCodeUnit
        });
        if (result == null)
            this.throwFormatException(input);
        setter(result + offset);
    }
    parseEnumeratedString(input, possibilities) {
        let results = new _Stream(possibilities).findIndexes((each) => {
            return op(Op.EQUALS, input.peek(each.length), each);
        });
        if (results.isEmpty)
            this.throwFormatException(input);
        results.sort((a, b) => {
            return possibilities[a].length.compareTo(possibilities[b].length);
        });
        let longestResult = results.last;
        input.read(possibilities[longestResult].length);
        return longestResult;
    }
    formatMonth(date) {
        switch (this.width) {
            case 5:
                return this.symbols.NARROWMONTHS[date.month - 1];
            case 4:
                return this.symbols.MONTHS[date.month - 1];
            case 3:
                return this.symbols.SHORTMONTHS[date.month - 1];
            default:
                return this.padTo(this.width, date.month);
        }
    }
    parseMonth(input, dateFields) {
        let possibilities;
        switch (this.width) {
            case 5:
                possibilities = this.symbols.NARROWMONTHS;
                break;
            case 4:
                possibilities = this.symbols.MONTHS;
                break;
            case 3:
                possibilities = this.symbols.SHORTMONTHS;
                break;
            default:
                return this.handleNumericField(input, dateFields.setMonth);
        }
        dateFields.month = this.parseEnumeratedString(input, possibilities) + 1;
    }
    format24Hours(date) {
        return this.padTo(this.width, date.hour);
    }
    formatFractionalSeconds(date) {
        let basic = this.padTo(3, date.millisecond);
        if (this.width - 3 > 0) {
            let extra = this.padTo(this.width - 3, 0);
            return basic + extra;
        }
        else {
            return basic;
        }
    }
    formatAmPm(date) {
        let hours = date.hour;
        let index = (hours >= 12) && (hours < 24) ? 1 : 0;
        let ampm = this.symbols.AMPMS;
        return ampm[index];
    }
    parseAmPm(input, dateFields) {
        let ampm = this.parseEnumeratedString(input, this.symbols.AMPMS);
        if (ampm == 1)
            dateFields.pm = true;
    }
    format1To12Hours(date) {
        let hours = date.hour;
        if (date.hour > 12)
            hours = hours - 12;
        if (hours == 0)
            hours = 12;
        return this.padTo(this.width, hours);
    }
    parse1To12Hours(input, dateFields) {
        this.handleNumericField(input, dateFields.setHour.bind(dateFields));
        if (dateFields.hour == 12)
            dateFields.hour = 0;
    }
    format0To11Hours(date) {
        return this.padTo(this.width, date.hour % 12);
    }
    format0To23Hours(date) {
        return this.padTo(this.width, date.hour);
    }
    formatStandaloneDay(date) {
        switch (this.width) {
            case 5:
                return this.symbols.STANDALONENARROWWEEKDAYS[date.weekday % 7];
            case 4:
                return this.symbols.STANDALONEWEEKDAYS[date.weekday % 7];
            case 3:
                return this.symbols.STANDALONESHORTWEEKDAYS[date.weekday % 7];
            default:
                return this.padTo(1, date.day);
        }
    }
    parseStandaloneDay(input) {
        let possibilities;
        switch (this.width) {
            case 5:
                possibilities = this.symbols.STANDALONENARROWWEEKDAYS;
                break;
            case 4:
                possibilities = this.symbols.STANDALONEWEEKDAYS;
                break;
            case 3:
                possibilities = this.symbols.STANDALONESHORTWEEKDAYS;
                break;
            default:
                return this.handleNumericField(input, (x) => {
                    return x;
                });
        }
        this.parseEnumeratedString(input, possibilities);
    }
    formatStandaloneMonth(date) {
        switch (this.width) {
            case 5:
                return this.symbols.STANDALONENARROWMONTHS[date.month - 1];
            case 4:
                return this.symbols.STANDALONEMONTHS[date.month - 1];
            case 3:
                return this.symbols.STANDALONESHORTMONTHS[date.month - 1];
            default:
                return this.padTo(this.width, date.month);
        }
    }
    parseStandaloneMonth(input, dateFields) {
        let possibilities;
        switch (this.width) {
            case 5:
                possibilities = this.symbols.STANDALONENARROWMONTHS;
                break;
            case 4:
                possibilities = this.symbols.STANDALONEMONTHS;
                break;
            case 3:
                possibilities = this.symbols.STANDALONESHORTMONTHS;
                break;
            default:
                return this.handleNumericField(input, dateFields.setMonth);
        }
        dateFields.month = this.parseEnumeratedString(input, possibilities) + 1;
    }
    formatQuarter(date) {
        let quarter = new core.DartDouble(((date.month - 1) / 3)).truncate();
        switch (this.width) {
            case 4:
                return this.symbols.QUARTERS[quarter];
            case 3:
                return this.symbols.SHORTQUARTERS[quarter];
            default:
                return this.padTo(this.width, quarter + 1);
        }
    }
    formatDayOfMonth(date) {
        return this.padTo(this.width, date.day);
    }
    formatDayOfYear(date) {
        return this.padTo(this.width, _dayOfYear(date.month, date.day, _isLeapYear(date)));
    }
    formatDayOfWeek(date) {
        return (this.width >= 4 ? this.symbols.WEEKDAYS : this.symbols.SHORTWEEKDAYS)[(date.weekday) % 7];
    }
    parseDayOfWeek(input) {
        let possibilities = this.width >= 4 ? this.symbols.WEEKDAYS : this.symbols.SHORTWEEKDAYS;
        this.parseEnumeratedString(input, possibilities);
    }
    parseEra(input) {
        let possibilities = this.width >= 4 ? this.symbols.ERANAMES : this.symbols.ERAS;
        this.parseEnumeratedString(input, possibilities);
    }
    formatMinutes(date) {
        return this.padTo(this.width, date.minute);
    }
    formatSeconds(date) {
        return this.padTo(this.width, date.second);
    }
    formatTimeZoneId(date) {
        throw 'new core.UnimplementedError()';
    }
    formatTimeZone(date) {
        throw 'new core.UnimplementedError()';
    }
    formatTimeZoneRFC(date) {
        throw 'new core.UnimplementedError()';
    }
    padTo(width, toBePrinted) {
        return this.parent._localizeDigits(new core.DartString(`${toBePrinted}`).padLeft(width, '0'));
    }
};
__decorate([
    defaultConstructor
], _DateFormatPatternField.prototype, "_DateFormatPatternField", null);
_DateFormatPatternField = __decorate([
    DartClass
], _DateFormatPatternField);
export { _DateFormatPatternField };
let _LoosePatternField = class _LoosePatternField extends _DateFormatPatternField {
    constructor(pattern, parent) {
        // @ts-ignore
        super();
    }
    _LoosePatternField(pattern, parent) {
        super._DateFormatPatternField(pattern, parent);
    }
    parseEnumeratedString(input, possibilities) {
        let lowercasePossibilities = possibilities.map((x) => {
            return x.toLowerCase();
        }).toList();
        try {
            return super.parseEnumeratedString(input, lowercasePossibilities);
        }
        catch (__error__) {
            if (is(__error__, core.FormatException)) {
                return -1;
            }
        }
    }
    parseMonth(input, dateFields) {
        if (this.width <= 2) {
            this.handleNumericField(input, dateFields.setMonth);
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.MONTHS, this.symbols.SHORTMONTHS);
        for (let monthNames of possibilities) {
            let month = this.parseEnumeratedString(input, monthNames);
            if (month != -1) {
                dateFields.month = month + 1;
                return;
            }
        }
        this.throwFormatException(input);
    }
    parseStandaloneDay(input) {
        if (this.width <= 2) {
            this.handleNumericField(input, (x) => {
                return x;
            });
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.STANDALONEWEEKDAYS, this.symbols.STANDALONESHORTWEEKDAYS);
        for (let dayNames of possibilities) {
            let day = this.parseEnumeratedString(input, dayNames);
            if (day != -1) {
                return;
            }
        }
    }
    parseStandaloneMonth(input, dateFields) {
        if (this.width <= 2) {
            this.handleNumericField(input, dateFields.setMonth);
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.STANDALONEMONTHS, this.symbols.STANDALONESHORTMONTHS);
        for (let monthNames of possibilities) {
            let month = this.parseEnumeratedString(input, monthNames);
            if (month != -1) {
                dateFields.month = month + 1;
                return;
            }
        }
        this.throwFormatException(input);
    }
    parseDayOfWeek(input) {
        if (this.width <= 2) {
            this.handleNumericField(input, (x) => {
                return x;
            });
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.WEEKDAYS, this.symbols.SHORTWEEKDAYS);
        for (let dayNames of possibilities) {
            let day = this.parseEnumeratedString(input, dayNames);
            if (day != -1) {
                return;
            }
        }
    }
};
__decorate([
    defaultConstructor
], _LoosePatternField.prototype, "_LoosePatternField", null);
_LoosePatternField = __decorate([
    DartClass
], _LoosePatternField);
export { _LoosePatternField };
export class properties {
}
//# sourceMappingURL=intl.js.map