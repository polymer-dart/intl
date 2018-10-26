/** Library asset:intl/lib/intl.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./src/intl_helpers";
import * as lib4 from "./src/plural_rules";
import * as convert from "@dart2ts/dart/convert";
import * as lib6 from "./number_symbols";
import * as math from "@dart2ts/dart/math";
import * as lib8 from "./number_symbols_data";
import * as lib9 from "./src/date_format_internal";
import * as lib10 from "./date_symbols";
import * as collection from "@dart2ts/dart/core";

export var toBeginningOfSentenceCase : (input : string,locale? : string) => string = (input : string,locale? : string) : string =>  {
    if (input == null || new core.DartString(input).isEmpty) return input;
    return `${_upperCaseLetter(input[0],locale)}${new core.DartString(input).substring(1)}`;
};
export var _upperCaseLetter : (input : string,locale : string) => string = (input : string,locale : string) : string =>  {
    if (locale != null) {
        if (input == "i" && new core.DartString(locale).startsWith("tr") || new core.DartString(locale).startsWith("az")) {
            return "İ";
        }
    }
    return new core.DartString(input).toUpperCase();
};
export var _dayOfYear : (month : number,day : number,leapYear : boolean) => number = (month : number,day : number,leapYear : boolean) : number =>  {
    if (month == 1) return day;
    if (month == 2) return day + 31;
    return ordinalDayFromMarchFirst(month,day) + 59 + (leapYear ? 1 : 0);
};
export var _isLeapYear : (date : core.DartDateTime) => boolean = (date : core.DartDateTime) : boolean =>  {
    let feb29 = new core.DartDateTime(date.year,2,29);
    return feb29.month == 2;
};
export var ordinalDayFromMarchFirst : (month : number,day : number) => number = (month : number,day : number) : number =>  {
    return new core.DartDouble(((30.6 * month) - 91.4)).floor() + day;
};
export var _iterable : (s : string) => core.DartIterable<any> = (s : string) : core.DartIterable<any> =>  {
    return new _StringIterable(s);
};
export var _iterator : (s : string) =>  _StringIterator = (s : string) : _StringIterator =>  {
    return new _StringIterator(s);
};
@DartClass
export class Intl {
    _locale : string;

    static get defaultLocale() : string {
        let zoneLocale = op(Op.INDEX,async.DartZone.current,Symbol.for('Intl.locale')/* TODO (SymbolLiteralImpl): #Intl.locale */);
        return op(Op.EQUALS,zoneLocale,null) ? Intl._defaultLocale : zoneLocale;
    }
    static set defaultLocale(newLocale : string) {
        Intl._defaultLocale = newLocale;
    }
    private static __$_defaultLocale : string;
    static get _defaultLocale() : string { 
        return this.__$_defaultLocale;
    }
    static set _defaultLocale(__$value : string)  { 
        this.__$_defaultLocale = __$value;
    }

    private static __$systemLocale : string;
    static get systemLocale() : string { 
        if (this.__$systemLocale===undefined) {
            this.__$systemLocale = 'en_US';
        }
        return this.__$systemLocale;
    }
    static set systemLocale(__$value : string)  { 
        this.__$systemLocale = __$value;
    }

    date(pattern? : string,desiredLocale? : string) : DateFormat {
        let actualLocale = (desiredLocale == null) ? this.locale : desiredLocale;
        return new DateFormat(pattern,actualLocale);
    }
    constructor(aLocale? : string) {
    }
    @defaultConstructor
    Intl(aLocale? : string) {
        this._locale = aLocale != null ? aLocale : Intl.getCurrentLocale();
    }
    static message(message_str : string,_namedArguments? : {desc? : string,examples? : core.DartMap<string,any>,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string,skip? : boolean}) : string {
        let {desc,examples,locale,name,args,meaning,skip} = Object.assign({
            "desc" : '',
            "examples" : new core.DartMap.literal([
            ])}, _namedArguments );
        return Intl._message(message_str,locale,name,args,meaning);
    }
    static _message(message_str : string,locale : string,name : string,args : core.DartList<any>,meaning : string) {
        return lib3.properties.messageLookup.lookupMessage(message_str,locale,name,args,meaning);
    }
    get locale() : string {
        return this._locale;
    }
    static verifiedLocale(newLocale : string,localeExists : Function,_namedArguments? : {onFailure? : Function}) : string {
        let {onFailure} = Object.assign({
            "onFailure" : Intl._throwLocaleError.bind(this)}, _namedArguments );
        if (newLocale == null) {
            return Intl.verifiedLocale(Intl.getCurrentLocale(),localeExists,{
                onFailure : onFailure});
        }
        if (localeExists(newLocale)) {
            return newLocale;
        }
        for(let each of new core.DartList.literal(Intl.canonicalizedLocale(newLocale),Intl.shortLocale(newLocale),"fallback")) {
            if (localeExists(each)) {
                return each;
            }
        }
        return onFailure(newLocale);
    }
    static _throwLocaleError(localeName : string) : string {
        throw new core.ArgumentError(`Invalid locale '${localeName}'`);
    }
    static shortLocale(aLocale : string) : string {
        if (new core.DartString(aLocale).length < 2) return aLocale;
        return new core.DartString(new core.DartString(aLocale).substring(0,2)).toLowerCase();
    }
    static canonicalizedLocale(aLocale : string) : string {
        if (aLocale == null) return Intl.getCurrentLocale();
        if (aLocale == "C") return "en_ISO";
        if (new core.DartString(aLocale).length < 5) return aLocale;
        if (aLocale[2] != '-' && (aLocale[2] != '_')) return aLocale;
        let region = new core.DartString(aLocale).substring(3);
        if (new core.DartString(region).length <= 3) region = new core.DartString(region).toUpperCase();
        return `${aLocale[0]}${aLocale[1]}_${region}`;
    }
    static plural(howMany : number,_namedArguments? : {zero? : string,one? : string,two? : string,few? : string,many? : string,other? : string,desc? : string,examples? : core.DartMap<string,any>,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string,skip? : boolean}) : string {
        let {zero,one,two,few,many,other,desc,examples,locale,name,args,meaning,skip} = Object.assign({
        }, _namedArguments );
        return Intl._plural(howMany,{
            zero : zero,one : one,two : two,few : few,many : many,other : other,locale : locale,name : name,args : args,meaning : meaning});
    }
    static _plural(howMany : number,_namedArguments? : {zero? : string,one? : string,two? : string,few? : string,many? : string,other? : string,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string}) : string {
        let {zero,one,two,few,many,other,locale,name,args,meaning} = Object.assign({
        }, _namedArguments );
        let translated = Intl._message(null,locale,name,args,meaning);
        return (translated || Intl.pluralLogic(howMany,{
            zero : zero,one : one,two : two,few : few,many : many,other : other,locale : locale}));
    }
    static pluralLogic(howMany : number,_namedArguments? : {zero? : any,one? : any,two? : any,few? : any,many? : any,other? : any,locale? : string,meaning? : string}) {
        let {zero,one,two,few,many,other,locale,meaning} = Object.assign({
        }, _namedArguments );
        if (op(Op.EQUALS,other,null)) {
            throw new core.ArgumentError("The 'other' named argument must be provided");
        }
        if (howMany == null) {
            throw new core.ArgumentError("The howMany argument to plural cannot be null");
        }
        if (howMany == 0 && zero != null) return zero;
        if (howMany == 1 && one != null) return one;
        if (howMany == 2 && two != null) return two;
        let pluralRule = Intl._pluralRule(locale,howMany);
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
                throw new core.ArgumentError.value(howMany,"howMany","Invalid plural argument");
        }
    }
    private static __$_cachedPluralRule;
    static get _cachedPluralRule() { 
        return this.__$_cachedPluralRule;
    }
    static set _cachedPluralRule(__$value : any)  { 
        this.__$_cachedPluralRule = __$value;
    }

    private static __$_cachedPluralLocale : string;
    static get _cachedPluralLocale() : string { 
        return this.__$_cachedPluralLocale;
    }
    static set _cachedPluralLocale(__$value : string)  { 
        this.__$_cachedPluralLocale = __$value;
    }

    static _pluralRule(locale : string,howMany : number) {
        lib4.startRuleEvaluation(howMany);
        let verifiedLocale = Intl.verifiedLocale(locale,lib4.localeHasPluralRules,{
            onFailure : (locale : any) =>  {
                return 'default';
            }});
        if (Intl._cachedPluralLocale == verifiedLocale) {
            return Intl._cachedPluralRule;
        }else {
            Intl._cachedPluralRule = lib4.properties.pluralRules.get(verifiedLocale);
            Intl._cachedPluralLocale = verifiedLocale;
            return Intl._cachedPluralRule;
        }
    }
    static gender(targetGender : string,_namedArguments? : {female? : string,male? : string,other? : string,desc? : string,examples? : core.DartMap<string,any>,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string,skip? : boolean}) : string {
        let {female,male,other,desc,examples,locale,name,args,meaning,skip} = Object.assign({
        }, _namedArguments );
        return Intl._gender(targetGender,{
            male : male,female : female,other : other,locale : locale,name : name,args : args,meaning : meaning});
    }
    static _gender(targetGender : string,_namedArguments? : {female? : string,male? : string,other? : string,desc? : string,examples? : core.DartMap<string,any>,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string}) : string {
        let {female,male,other,desc,examples,locale,name,args,meaning} = Object.assign({
        }, _namedArguments );
        let translated = Intl._message(null,locale,name,args,meaning);
        return (translated || Intl.genderLogic(targetGender,{
            female : female,male : male,other : other,locale : locale}));
    }
    static genderLogic(targetGender : string,_namedArguments? : {female? : any,male? : any,other? : any,locale? : string}) {
        let {female,male,other,locale} = Object.assign({
        }, _namedArguments );
        if (op(Op.EQUALS,other,null)) {
            throw new core.ArgumentError("The 'other' named argument must be specified");
        }
        switch (targetGender) {
            case "female":
                return op(Op.EQUALS,female,null) ? other : female;
            case "male":
                return op(Op.EQUALS,male,null) ? other : male;
            default:
                return other;
        }
    }
    static select(choice : any,cases : core.DartMap<string,string>,_namedArguments? : {desc? : string,examples? : core.DartMap<string,any>,locale? : string,name? : string,args? : core.DartList<any>,meaning? : string,skip? : boolean}) : string {
        let {desc,examples,locale,name,args,meaning,skip} = Object.assign({
        }, _namedArguments );
        return Intl._select(choice,cases,{
            locale : locale,name : name,args : args,meaning : meaning});
    }
    static _select(choice : any,cases : core.DartMap<string,string>,_namedArguments? : {locale? : string,name? : string,args? : core.DartList<any>,meaning? : string}) : string {
        let {locale,name,args,meaning} = Object.assign({
        }, _namedArguments );
        let translated = Intl._message(null,locale,name,args,meaning);
        return (translated || Intl.selectLogic(choice,cases));
    }
    static selectLogic(choice : any,cases : core.DartMap<string,any>) {
        choice = `${choice}`;
        let exact = cases.get(choice);
        if (exact != null) return exact;
        let other = cases.get("other");
        if (op(Op.EQUALS,other,null)) throw new core.ArgumentError("The 'other' case must be specified");
        return other;
    }
    static withLocale(locale : string,_function : () => any) {
        let canonical = Intl.canonicalizedLocale(locale);
        return async.runZoned(_function,{
            zoneValues : new core.DartMap.literal([
                [/* TODO (SymbolLiteralImpl): #Intl.locale */Symbol.for('Intl.locale'),canonical]])});
    }
    static getCurrentLocale() : string {
        if (Intl.defaultLocale == null) Intl.defaultLocale = Intl.systemLocale;
        return Intl.defaultLocale;
    }
    toString() {
        return `Intl(${this.locale})`;
    }
}

@DartClass
export class BidiFormatter {
    contextDirection : TextDirection;

    _alwaysSpan : boolean;

    @namedConstructor
    LTR(alwaysSpan? : any) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.LTR;
        this._alwaysSpan = alwaysSpan;
    }
    static LTR : new(alwaysSpan : any) => BidiFormatter;

    @namedConstructor
    RTL(alwaysSpan? : any) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.RTL;
        this._alwaysSpan = alwaysSpan;
    }
    static RTL : new(alwaysSpan : any) => BidiFormatter;

    @namedConstructor
    UNKNOWN(alwaysSpan? : any) {
        alwaysSpan = alwaysSpan || false;
        this.contextDirection = TextDirection.UNKNOWN;
        this._alwaysSpan = alwaysSpan;
    }
    static UNKNOWN : new(alwaysSpan : any) => BidiFormatter;

    get isRTL() : boolean {
        return op(Op.EQUALS,this.contextDirection,TextDirection.RTL);
    }
    wrapWithSpan(text : string,_namedArguments? : {isHtml? : boolean,resetDir? : boolean,direction? : TextDirection}) : string {
        let {isHtml,resetDir,direction} = Object.assign({
            "isHtml" : false,
            "resetDir" : true}, _namedArguments );
        if (op(Op.EQUALS,direction,null)) direction = this.estimateDirection(text,{
            isHtml : isHtml});
        let result;
        if (!isHtml) text = new convert.HtmlEscape().convert(text);
        let directionChange = this.contextDirection.isDirectionChange(direction);
        if (this._alwaysSpan || directionChange) {
            let spanDirection = '';
            if (directionChange) {
                spanDirection = ` dir=${direction.spanText}`;
            }
            result = `<span${spanDirection}>${text}</span>`;
        }else {
            result = text;
        }
        return op(Op.PLUS,result,(resetDir ? this._resetDir(text,direction,isHtml) : ''));
    }
    wrapWithUnicode(text : string,_namedArguments? : {isHtml? : boolean,resetDir? : boolean,direction? : TextDirection}) : string {
        let {isHtml,resetDir,direction} = Object.assign({
            "isHtml" : false,
            "resetDir" : true}, _namedArguments );
        if (op(Op.EQUALS,direction,null)) direction = this.estimateDirection(text,{
            isHtml : isHtml});
        let result = text;
        if (this.contextDirection.isDirectionChange(direction)) {
            let marker = op(Op.EQUALS,direction,TextDirection.RTL) ? Bidi.RLE : Bidi.LRE;
            result = `${marker}${text}${Bidi.PDF}`;
        }
        return result + (resetDir ? this._resetDir(text,direction,isHtml) : '');
    }
    estimateDirection(text : string,_namedArguments? : {isHtml? : boolean}) : TextDirection {
        let {isHtml} = Object.assign({
            "isHtml" : false}, _namedArguments );
        return Bidi.estimateDirectionOfText(text,{
            isHtml : isHtml});
    }
    _resetDir(text : string,direction : TextDirection,isHtml : boolean) : string {
        if ((op(Op.EQUALS,this.contextDirection,TextDirection.LTR) && (op(Op.EQUALS,direction,TextDirection.RTL) || Bidi.endsWithRtl(text,isHtml))) || (op(Op.EQUALS,this.contextDirection,TextDirection.RTL) && (op(Op.EQUALS,direction,TextDirection.LTR) || Bidi.endsWithLtr(text,isHtml)))) {
            return op(Op.EQUALS,this.contextDirection,TextDirection.LTR) ? Bidi.LRM : Bidi.RLM;
        }else {
            return '';
        }
    }
}

@DartClass
export class TextDirection {
    private static __$LTR;
    static get LTR() { 
        if (this.__$LTR===undefined) {
            this.__$LTR = new TextDirection._('LTR','ltr');
        }
        return this.__$LTR;
    }

    private static __$RTL;
    static get RTL() { 
        if (this.__$RTL===undefined) {
            this.__$RTL = new TextDirection._('RTL','rtl');
        }
        return this.__$RTL;
    }

    private static __$UNKNOWN;
    static get UNKNOWN() { 
        if (this.__$UNKNOWN===undefined) {
            this.__$UNKNOWN = new TextDirection._('UNKNOWN','ltr');
        }
        return this.__$UNKNOWN;
    }

    value : string;

    spanText : string;

    @namedConstructor
    _(value : string,spanText : string) {
        this.value = value;
        this.spanText = spanText;
    }
    static _ : new(value : string,spanText : string) => TextDirection;

    isDirectionChange(otherDirection : TextDirection) : boolean {
        return otherDirection != TextDirection.UNKNOWN && this != otherDirection;
    }
}

@DartClass
export class Bidi {
    private static __$LRE;
    static get LRE() { 
        if (this.__$LRE===undefined) {
            this.__$LRE = '‪';
        }
        return this.__$LRE;
    }

    private static __$RLE;
    static get RLE() { 
        if (this.__$RLE===undefined) {
            this.__$RLE = '‫';
        }
        return this.__$RLE;
    }

    private static __$PDF;
    static get PDF() { 
        if (this.__$PDF===undefined) {
            this.__$PDF = '‬';
        }
        return this.__$PDF;
    }

    private static __$LRM;
    static get LRM() { 
        if (this.__$LRM===undefined) {
            this.__$LRM = '‎';
        }
        return this.__$LRM;
    }

    private static __$RLM;
    static get RLM() { 
        if (this.__$RLM===undefined) {
            this.__$RLM = '‏';
        }
        return this.__$RLM;
    }

    private static __$_RTL_DETECTION_THRESHOLD : number;
    static get _RTL_DETECTION_THRESHOLD() : number { 
        if (this.__$_RTL_DETECTION_THRESHOLD===undefined) {
            this.__$_RTL_DETECTION_THRESHOLD = 0.4;
        }
        return this.__$_RTL_DETECTION_THRESHOLD;
    }
    static set _RTL_DETECTION_THRESHOLD(__$value : number)  { 
        this.__$_RTL_DETECTION_THRESHOLD = __$value;
    }

    private static __$_LTR_CHARS : string;
    static get _LTR_CHARS() : string { 
        if (this.__$_LTR_CHARS===undefined) {
            this.__$_LTR_CHARS = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590' + '\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
        }
        return this.__$_LTR_CHARS;
    }

    private static __$_RTL_CHARS : string;
    static get _RTL_CHARS() : string { 
        if (this.__$_RTL_CHARS===undefined) {
            this.__$_RTL_CHARS = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
        }
        return this.__$_RTL_CHARS;
    }

    static stripHtmlIfNeeded(text : string) : string {
        return new core.DartString(text).replaceAll(new core.DartRegExp('<[^>]*>|&[^;]+;'),' ');
    }
    static startsWithLtr(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp(`^[^${Bidi._RTL_CHARS}]*[${Bidi._LTR_CHARS}]`).hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    static startsWithRtl(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp(`^[^${Bidi._LTR_CHARS}]*[${Bidi._RTL_CHARS}]`).hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    static endsWithLtr(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp(`[${Bidi._LTR_CHARS}][^${Bidi._RTL_CHARS}]*$`).hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    static endsWithRtl(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp(`[${Bidi._RTL_CHARS}][^${Bidi._LTR_CHARS}]*$`).hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    static hasAnyLtr(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp('[' + `${Bidi._LTR_CHARS}` + ']').hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    static hasAnyRtl(text : string,isHtml? : any) : boolean {
        isHtml = isHtml || false;
        return new core.DartRegExp('[' + `${Bidi._RTL_CHARS}` + ']').hasMatch(isHtml ? Bidi.stripHtmlIfNeeded(text) : text);
    }
    private static __$_rtlLocaleRegex;
    static get _rtlLocaleRegex() { 
        if (this.__$_rtlLocaleRegex===undefined) {
            this.__$_rtlLocaleRegex = new core.DartRegExp('^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_]' + '(Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))' + '($|-|_)',{
                caseSensitive : false});
        }
        return this.__$_rtlLocaleRegex;
    }
    static set _rtlLocaleRegex(__$value : any)  { 
        this.__$_rtlLocaleRegex = __$value;
    }

    private static __$_lastLocaleCheckedForRtl : string;
    static get _lastLocaleCheckedForRtl() : string { 
        return this.__$_lastLocaleCheckedForRtl;
    }
    static set _lastLocaleCheckedForRtl(__$value : string)  { 
        this.__$_lastLocaleCheckedForRtl = __$value;
    }

    private static __$_lastRtlCheck : boolean;
    static get _lastRtlCheck() : boolean { 
        return this.__$_lastRtlCheck;
    }
    static set _lastRtlCheck(__$value : boolean)  { 
        this.__$_lastRtlCheck = __$value;
    }

    static isRtlLanguage(languageString? : string) : boolean {
        let language = (languageString || Intl.getCurrentLocale());
        if (Bidi._lastLocaleCheckedForRtl != language) {
            Bidi._lastLocaleCheckedForRtl = language;
            Bidi._lastRtlCheck = Bidi._rtlLocaleRegex.hasMatch(language);
        }
        return Bidi._lastRtlCheck;
    }
    static enforceRtlInHtml(html : string) : string {
        return Bidi._enforceInHtmlHelper(html,'rtl');
    }
    static enforceRtlInText(text : string) : string {
        return `${Bidi.RLE}${text}${Bidi.PDF}`;
    }
    static enforceLtrInHtml(html : string) : string {
        return Bidi._enforceInHtmlHelper(html,'ltr');
    }
    static enforceLtrInText(text : string) : string {
        return `${Bidi.LRE}${text}${Bidi.PDF}`;
    }
    static _enforceInHtmlHelper(html : string,direction : string) : string {
        if (new core.DartString(html).startsWith('<')) {
            let buffer : core.DartStringBuffer = new core.DartStringBuffer();
            let startIndex = 0;
            let match : core.DartMatch = new core.DartRegExp('<\w+').firstMatch(html);
            if (match != null) {
                ((_) : core.DartStringBuffer =>  {
                    {
                        _.write(new core.DartString(html).substring(startIndex,match.end));
                        _.write(` dir=${direction}`);
                        return _;
                    }
                })(buffer);
                startIndex = match.end;
            }
            return (((_) : core.DartStringBuffer =>  {
                {
                    _.write(new core.DartString(html).substring(startIndex));
                    return _;
                }
            })(buffer)).toString();
        }
        return `\n<span dir=${direction}>${html}</span>`;
    }
    static guardBracketInHtml(str : string,isRtlContext? : boolean) : string {
        let useRtl = isRtlContext == null ? Bidi.hasAnyRtl(str) : isRtlContext;
        let matchingBrackets : core.DartRegExp = new core.DartRegExp('(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(&lt;.*?(&gt;)+)');
        return Bidi._guardBracketHelper(str,matchingBrackets,`<span dir=${useRtl ? "rtl" : "ltr"}>`,'</span>');
    }
    static guardBracketInText(str : string,isRtlContext? : boolean) : string {
        let useRtl = isRtlContext == null ? Bidi.hasAnyRtl(str) : isRtlContext;
        let mark = useRtl ? Bidi.RLM : Bidi.LRM;
        return Bidi._guardBracketHelper(str,new core.DartRegExp('(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)'),mark,mark);
    }
    static _guardBracketHelper(str : string,regexp : core.DartRegExp,before? : string,after? : string) : string {
        let buffer = new core.DartStringBuffer();
        let startIndex = 0;
        regexp.allMatches(str).forEach((match : any) =>  {
            ((_) : core.DartStringBuffer =>  {
                {
                    _.write(new core.DartString(str).substring(startIndex,match.start));
                    _.write(before);
                    _.write(new core.DartString(str).substring(match.start,match.end));
                    _.write(after);
                    return _;
                }
            })(buffer);
            startIndex = match.end;
        });
        return (((_) : core.DartStringBuffer =>  {
            {
                _.write(new core.DartString(str).substring(startIndex));
                return _;
            }
        })(buffer)).toString();
    }
    static estimateDirectionOfText(text : string,_namedArguments? : {isHtml? : boolean}) : TextDirection {
        let {isHtml} = Object.assign({
            "isHtml" : false}, _namedArguments );
        text = isHtml ? Bidi.stripHtmlIfNeeded(text) : text;
        let rtlCount = 0;
        let total = 0;
        let hasWeaklyLtr = false;
        for(let token of new core.DartString(text).split(new core.DartRegExp('\s+'))) {
            if (Bidi.startsWithRtl(token)) {
                rtlCount++;
                total++;
            }else if (new core.DartRegExp('^http://').hasMatch(token)) {
                hasWeaklyLtr = true;
            }else if (Bidi.hasAnyLtr(token)) {
                total++;
            }else if (new core.DartRegExp('\d').hasMatch(token)) {
                hasWeaklyLtr = true;
            }
        }
        if (total == 0) {
            return hasWeaklyLtr ? TextDirection.LTR : TextDirection.UNKNOWN;
        }else if (rtlCount > Bidi._RTL_DETECTION_THRESHOLD * total) {
            return TextDirection.RTL;
        }else {
            return TextDirection.LTR;
        }
    }
    static normalizeHebrewQuote(str : string) : string {
        let buf : core.DartStringBuffer = new core.DartStringBuffer();
        if (new core.DartString(str).length > 0) {
            buf.write(new core.DartString(str).substring(0,1));
        }
        for(let i : number = 1; i < new core.DartString(str).length; i++){
            if (new core.DartString(str).substring(i,i + 1) == '"' && new core.DartRegExp('[֑-ײ]').hasMatch(new core.DartString(str).substring(i - 1,i))) {
                buf.write('״');
            }else if (new core.DartString(str).substring(i,i + 1) == "'" && new core.DartRegExp('[֑-ײ]').hasMatch(new core.DartString(str).substring(i - 1,i))) {
                buf.write('׳');
            }else {
                buf.write(new core.DartString(str).substring(i,i + 1));
            }
        }
        return buf.toString();
    }
    static detectRtlDirectionality(str : string,_namedArguments? : {isHtml? : boolean}) : boolean {
        let {isHtml} = Object.assign({
            "isHtml" : false}, _namedArguments );
        return op(Op.EQUALS,Bidi.estimateDirectionOfText(str,{
            isHtml : isHtml}),TextDirection.RTL);
    }
    constructor() {
    }
    @defaultConstructor
    Bidi() {
    }
}

@DartClass
export class _CompactStyleBase {
    @Abstract
    styleForSign(number : any) : _CompactStyle{ throw 'abstract'}
    @AbstractProperty
    get totalDigits() : number{ throw 'abstract'}
    @AbstractProperty
    get divisor() : number{ throw 'abstract'}
    @AbstractProperty
    get allStyles() : core.DartIterable<_CompactStyle>{ throw 'abstract'}
    constructor() {
    }
    @defaultConstructor
    _CompactStyleBase() {
    }
}

export enum _CompactFormatType {
    COMPACT_DECIMAL_SHORT_PATTERN,
    COMPACT_DECIMAL_LONG_PATTERN,
    COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN
}

@DartClass
export class DateFormat {
    constructor(newPattern? : string,locale? : string) {
    }
    @defaultConstructor
    DateFormat(newPattern? : string,locale? : string) {
        this._locale = Intl.verifiedLocale(locale,DateFormat.localeExists.bind(this));
        this.addPattern(newPattern);
    }
    format(date : core.DartDateTime) : string {
        let result = new core.DartStringBuffer();
        this._formatFields.forEach((field : any) =>  {
            return result.write(field.format(date));
        });
        return result.toString();
    }
    formatDuration(reference : core.DartDateTime) : string {
        return '';
    }
    formatDurationFrom(duration : core.DartDuration,date : core.DartDateTime) : string {
        return '';
    }
    parse(inputString : string,utc? : any) : core.DartDateTime {
        utc = utc || false;
        return this._parse(inputString,{
            utc : utc,strict : false});
    }
    parseLoose(inputString : string,utc? : any) : core.DartDateTime {
        utc = utc || false;
        try {
            return this._parse(inputString,{
                utc : utc,strict : true});
        } catch (__error__) {

            if (is(__error__,core.FormatException)){
                return this._parseLoose(new core.DartString(inputString).toLowerCase(),utc);
            }
        }
    }
    _parseLoose(inputString : string,utc : boolean) {
        let dateFields = new _DateBuilder();
        if (utc) dateFields.utc = true;
        let stream = new _Stream(inputString);
        this._formatFields.forEach((f : any) =>  {
            return f.parseLoose(stream,dateFields);
        });
        if (!stream.atEnd()) {
            throw new core.FormatException(`Characters remaining after date parsing in ${inputString}`);
        }
        dateFields.verify(inputString);
        return dateFields.asDate();
    }
    parseStrict(inputString : string,utc? : any) : core.DartDateTime {
        utc = utc || false;
        return this._parse(inputString,{
            utc : utc,strict : true});
    }
    _parse(inputString : string,_namedArguments? : {utc? : any,strict? : any}) : core.DartDateTime {
        let {utc,strict} = Object.assign({
            "utc" : false,
            "strict" : false}, _namedArguments );
        let dateFields = new _DateBuilder();
        if (utc) dateFields.utc = true;
        dateFields._dateOnly = this.dateOnly;
        let stream = new _Stream(inputString);
        this._formatFields.forEach((f : any) =>  {
            return f.parse(stream,dateFields);
        });
        if (strict && !stream.atEnd()) {
            throw new core.FormatException(`Characters remaining after date parsing in ${inputString}`);
        }
        if (strict) dateFields.verify(inputString);
        return dateFields.asDate();
    }
    get dateOnly() : boolean {
        return this._dateOnly = ( this._dateOnly ) || ( this._checkDateOnly );
    }
    _dateOnly : boolean;

    get _checkDateOnly() : boolean {
        return this._formatFields.every((each : any) =>  {
            return each.forDate;
        });
    }
    parseUTC(inputString : string) : core.DartDateTime {
        return this.parse(inputString,true);
    }
    parseUtc(inputString : string) : core.DartDateTime {
        return this.parse(inputString,true);
    }
    get locale() : string {
        return this._locale;
    }
    static allLocalesWithSymbols() : core.DartList<string> {
        return new core.DartList.from(lib9.properties.dateTimeSymbols.keys);
    }
    @namedConstructor
    d(locale? : any) {
        this.DateFormat("d",locale);
    }
    static d : new(locale : any) => DateFormat;

    @namedConstructor
    E(locale? : any) {
        this.DateFormat("E",locale);
    }
    static E : new(locale : any) => DateFormat;

    @namedConstructor
    EEEE(locale? : any) {
        this.DateFormat("EEEE",locale);
    }
    static EEEE : new(locale : any) => DateFormat;

    @namedConstructor
    LLL(locale? : any) {
        this.DateFormat("LLL",locale);
    }
    static LLL : new(locale : any) => DateFormat;

    @namedConstructor
    LLLL(locale? : any) {
        this.DateFormat("LLLL",locale);
    }
    static LLLL : new(locale : any) => DateFormat;

    @namedConstructor
    M(locale? : any) {
        this.DateFormat("M",locale);
    }
    static M : new(locale : any) => DateFormat;

    @namedConstructor
    Md(locale? : any) {
        this.DateFormat("Md",locale);
    }
    static Md : new(locale : any) => DateFormat;

    @namedConstructor
    MEd(locale? : any) {
        this.DateFormat("MEd",locale);
    }
    static MEd : new(locale : any) => DateFormat;

    @namedConstructor
    MMM(locale? : any) {
        this.DateFormat("MMM",locale);
    }
    static MMM : new(locale : any) => DateFormat;

    @namedConstructor
    MMMd(locale? : any) {
        this.DateFormat("MMMd",locale);
    }
    static MMMd : new(locale : any) => DateFormat;

    @namedConstructor
    MMMEd(locale? : any) {
        this.DateFormat("MMMEd",locale);
    }
    static MMMEd : new(locale : any) => DateFormat;

    @namedConstructor
    MMMM(locale? : any) {
        this.DateFormat("MMMM",locale);
    }
    static MMMM : new(locale : any) => DateFormat;

    @namedConstructor
    MMMMd(locale? : any) {
        this.DateFormat("MMMMd",locale);
    }
    static MMMMd : new(locale : any) => DateFormat;

    @namedConstructor
    MMMMEEEEd(locale? : any) {
        this.DateFormat("MMMMEEEEd",locale);
    }
    static MMMMEEEEd : new(locale : any) => DateFormat;

    @namedConstructor
    QQQ(locale? : any) {
        this.DateFormat("QQQ",locale);
    }
    static QQQ : new(locale : any) => DateFormat;

    @namedConstructor
    QQQQ(locale? : any) {
        this.DateFormat("QQQQ",locale);
    }
    static QQQQ : new(locale : any) => DateFormat;

    @namedConstructor
    y(locale? : any) {
        this.DateFormat("y",locale);
    }
    static y : new(locale : any) => DateFormat;

    @namedConstructor
    yM(locale? : any) {
        this.DateFormat("yM",locale);
    }
    static yM : new(locale : any) => DateFormat;

    @namedConstructor
    yMd(locale? : any) {
        this.DateFormat("yMd",locale);
    }
    static yMd : new(locale : any) => DateFormat;

    @namedConstructor
    yMEd(locale? : any) {
        this.DateFormat("yMEd",locale);
    }
    static yMEd : new(locale : any) => DateFormat;

    @namedConstructor
    yMMM(locale? : any) {
        this.DateFormat("yMMM",locale);
    }
    static yMMM : new(locale : any) => DateFormat;

    @namedConstructor
    yMMMd(locale? : any) {
        this.DateFormat("yMMMd",locale);
    }
    static yMMMd : new(locale : any) => DateFormat;

    @namedConstructor
    yMMMEd(locale? : any) {
        this.DateFormat("yMMMEd",locale);
    }
    static yMMMEd : new(locale : any) => DateFormat;

    @namedConstructor
    yMMMM(locale? : any) {
        this.DateFormat("yMMMM",locale);
    }
    static yMMMM : new(locale : any) => DateFormat;

    @namedConstructor
    yMMMMd(locale? : any) {
        this.DateFormat("yMMMMd",locale);
    }
    static yMMMMd : new(locale : any) => DateFormat;

    @namedConstructor
    yMMMMEEEEd(locale? : any) {
        this.DateFormat("yMMMMEEEEd",locale);
    }
    static yMMMMEEEEd : new(locale : any) => DateFormat;

    @namedConstructor
    yQQQ(locale? : any) {
        this.DateFormat("yQQQ",locale);
    }
    static yQQQ : new(locale : any) => DateFormat;

    @namedConstructor
    yQQQQ(locale? : any) {
        this.DateFormat("yQQQQ",locale);
    }
    static yQQQQ : new(locale : any) => DateFormat;

    @namedConstructor
    H(locale? : any) {
        this.DateFormat("H",locale);
    }
    static H : new(locale : any) => DateFormat;

    @namedConstructor
    Hm(locale? : any) {
        this.DateFormat("Hm",locale);
    }
    static Hm : new(locale : any) => DateFormat;

    @namedConstructor
    Hms(locale? : any) {
        this.DateFormat("Hms",locale);
    }
    static Hms : new(locale : any) => DateFormat;

    @namedConstructor
    j(locale? : any) {
        this.DateFormat("j",locale);
    }
    static j : new(locale : any) => DateFormat;

    @namedConstructor
    jm(locale? : any) {
        this.DateFormat("jm",locale);
    }
    static jm : new(locale : any) => DateFormat;

    @namedConstructor
    jms(locale? : any) {
        this.DateFormat("jms",locale);
    }
    static jms : new(locale : any) => DateFormat;

    @namedConstructor
    jmv(locale? : any) {
        this.DateFormat("jmv",locale);
    }
    static jmv : new(locale : any) => DateFormat;

    @namedConstructor
    jmz(locale? : any) {
        this.DateFormat("jmz",locale);
    }
    static jmz : new(locale : any) => DateFormat;

    @namedConstructor
    jv(locale? : any) {
        this.DateFormat("jv",locale);
    }
    static jv : new(locale : any) => DateFormat;

    @namedConstructor
    jz(locale? : any) {
        this.DateFormat("jz",locale);
    }
    static jz : new(locale : any) => DateFormat;

    @namedConstructor
    m(locale? : any) {
        this.DateFormat("m",locale);
    }
    static m : new(locale : any) => DateFormat;

    @namedConstructor
    ms(locale? : any) {
        this.DateFormat("ms",locale);
    }
    static ms : new(locale : any) => DateFormat;

    @namedConstructor
    s(locale? : any) {
        this.DateFormat("s",locale);
    }
    static s : new(locale : any) => DateFormat;

    add_d() : DateFormat {
        return this.addPattern("d");
    }
    add_E() : DateFormat {
        return this.addPattern("E");
    }
    add_EEEE() : DateFormat {
        return this.addPattern("EEEE");
    }
    add_LLL() : DateFormat {
        return this.addPattern("LLL");
    }
    add_LLLL() : DateFormat {
        return this.addPattern("LLLL");
    }
    add_M() : DateFormat {
        return this.addPattern("M");
    }
    add_Md() : DateFormat {
        return this.addPattern("Md");
    }
    add_MEd() : DateFormat {
        return this.addPattern("MEd");
    }
    add_MMM() : DateFormat {
        return this.addPattern("MMM");
    }
    add_MMMd() : DateFormat {
        return this.addPattern("MMMd");
    }
    add_MMMEd() : DateFormat {
        return this.addPattern("MMMEd");
    }
    add_MMMM() : DateFormat {
        return this.addPattern("MMMM");
    }
    add_MMMMd() : DateFormat {
        return this.addPattern("MMMMd");
    }
    add_MMMMEEEEd() : DateFormat {
        return this.addPattern("MMMMEEEEd");
    }
    add_QQQ() : DateFormat {
        return this.addPattern("QQQ");
    }
    add_QQQQ() : DateFormat {
        return this.addPattern("QQQQ");
    }
    add_y() : DateFormat {
        return this.addPattern("y");
    }
    add_yM() : DateFormat {
        return this.addPattern("yM");
    }
    add_yMd() : DateFormat {
        return this.addPattern("yMd");
    }
    add_yMEd() : DateFormat {
        return this.addPattern("yMEd");
    }
    add_yMMM() : DateFormat {
        return this.addPattern("yMMM");
    }
    add_yMMMd() : DateFormat {
        return this.addPattern("yMMMd");
    }
    add_yMMMEd() : DateFormat {
        return this.addPattern("yMMMEd");
    }
    add_yMMMM() : DateFormat {
        return this.addPattern("yMMMM");
    }
    add_yMMMMd() : DateFormat {
        return this.addPattern("yMMMMd");
    }
    add_yMMMMEEEEd() : DateFormat {
        return this.addPattern("yMMMMEEEEd");
    }
    add_yQQQ() : DateFormat {
        return this.addPattern("yQQQ");
    }
    add_yQQQQ() : DateFormat {
        return this.addPattern("yQQQQ");
    }
    add_H() : DateFormat {
        return this.addPattern("H");
    }
    add_Hm() : DateFormat {
        return this.addPattern("Hm");
    }
    add_Hms() : DateFormat {
        return this.addPattern("Hms");
    }
    add_j() : DateFormat {
        return this.addPattern("j");
    }
    add_jm() : DateFormat {
        return this.addPattern("jm");
    }
    add_jms() : DateFormat {
        return this.addPattern("jms");
    }
    add_jmv() : DateFormat {
        return this.addPattern("jmv");
    }
    add_jmz() : DateFormat {
        return this.addPattern("jmz");
    }
    add_jv() : DateFormat {
        return this.addPattern("jv");
    }
    add_jz() : DateFormat {
        return this.addPattern("jz");
    }
    add_m() : DateFormat {
        return this.addPattern("m");
    }
    add_ms() : DateFormat {
        return this.addPattern("ms");
    }
    add_s() : DateFormat {
        return this.addPattern("s");
    }
    private static __$ABBR_MONTH : string;
    static get ABBR_MONTH() : string { 
        if (this.__$ABBR_MONTH===undefined) {
            this.__$ABBR_MONTH = 'MMM';
        }
        return this.__$ABBR_MONTH;
    }

    private static __$DAY : string;
    static get DAY() : string { 
        if (this.__$DAY===undefined) {
            this.__$DAY = 'd';
        }
        return this.__$DAY;
    }

    private static __$ABBR_WEEKDAY : string;
    static get ABBR_WEEKDAY() : string { 
        if (this.__$ABBR_WEEKDAY===undefined) {
            this.__$ABBR_WEEKDAY = 'E';
        }
        return this.__$ABBR_WEEKDAY;
    }

    private static __$WEEKDAY : string;
    static get WEEKDAY() : string { 
        if (this.__$WEEKDAY===undefined) {
            this.__$WEEKDAY = 'EEEE';
        }
        return this.__$WEEKDAY;
    }

    private static __$ABBR_STANDALONE_MONTH : string;
    static get ABBR_STANDALONE_MONTH() : string { 
        if (this.__$ABBR_STANDALONE_MONTH===undefined) {
            this.__$ABBR_STANDALONE_MONTH = 'LLL';
        }
        return this.__$ABBR_STANDALONE_MONTH;
    }

    private static __$STANDALONE_MONTH : string;
    static get STANDALONE_MONTH() : string { 
        if (this.__$STANDALONE_MONTH===undefined) {
            this.__$STANDALONE_MONTH = 'LLLL';
        }
        return this.__$STANDALONE_MONTH;
    }

    private static __$NUM_MONTH : string;
    static get NUM_MONTH() : string { 
        if (this.__$NUM_MONTH===undefined) {
            this.__$NUM_MONTH = 'M';
        }
        return this.__$NUM_MONTH;
    }

    private static __$NUM_MONTH_DAY : string;
    static get NUM_MONTH_DAY() : string { 
        if (this.__$NUM_MONTH_DAY===undefined) {
            this.__$NUM_MONTH_DAY = 'Md';
        }
        return this.__$NUM_MONTH_DAY;
    }

    private static __$NUM_MONTH_WEEKDAY_DAY : string;
    static get NUM_MONTH_WEEKDAY_DAY() : string { 
        if (this.__$NUM_MONTH_WEEKDAY_DAY===undefined) {
            this.__$NUM_MONTH_WEEKDAY_DAY = 'MEd';
        }
        return this.__$NUM_MONTH_WEEKDAY_DAY;
    }

    private static __$ABBR_MONTH_DAY : string;
    static get ABBR_MONTH_DAY() : string { 
        if (this.__$ABBR_MONTH_DAY===undefined) {
            this.__$ABBR_MONTH_DAY = 'MMMd';
        }
        return this.__$ABBR_MONTH_DAY;
    }

    private static __$ABBR_MONTH_WEEKDAY_DAY : string;
    static get ABBR_MONTH_WEEKDAY_DAY() : string { 
        if (this.__$ABBR_MONTH_WEEKDAY_DAY===undefined) {
            this.__$ABBR_MONTH_WEEKDAY_DAY = 'MMMEd';
        }
        return this.__$ABBR_MONTH_WEEKDAY_DAY;
    }

    private static __$MONTH : string;
    static get MONTH() : string { 
        if (this.__$MONTH===undefined) {
            this.__$MONTH = 'MMMM';
        }
        return this.__$MONTH;
    }

    private static __$MONTH_DAY : string;
    static get MONTH_DAY() : string { 
        if (this.__$MONTH_DAY===undefined) {
            this.__$MONTH_DAY = 'MMMMd';
        }
        return this.__$MONTH_DAY;
    }

    private static __$MONTH_WEEKDAY_DAY : string;
    static get MONTH_WEEKDAY_DAY() : string { 
        if (this.__$MONTH_WEEKDAY_DAY===undefined) {
            this.__$MONTH_WEEKDAY_DAY = 'MMMMEEEEd';
        }
        return this.__$MONTH_WEEKDAY_DAY;
    }

    private static __$ABBR_QUARTER : string;
    static get ABBR_QUARTER() : string { 
        if (this.__$ABBR_QUARTER===undefined) {
            this.__$ABBR_QUARTER = 'QQQ';
        }
        return this.__$ABBR_QUARTER;
    }

    private static __$QUARTER : string;
    static get QUARTER() : string { 
        if (this.__$QUARTER===undefined) {
            this.__$QUARTER = 'QQQQ';
        }
        return this.__$QUARTER;
    }

    private static __$YEAR : string;
    static get YEAR() : string { 
        if (this.__$YEAR===undefined) {
            this.__$YEAR = 'y';
        }
        return this.__$YEAR;
    }

    private static __$YEAR_NUM_MONTH : string;
    static get YEAR_NUM_MONTH() : string { 
        if (this.__$YEAR_NUM_MONTH===undefined) {
            this.__$YEAR_NUM_MONTH = 'yM';
        }
        return this.__$YEAR_NUM_MONTH;
    }

    private static __$YEAR_NUM_MONTH_DAY : string;
    static get YEAR_NUM_MONTH_DAY() : string { 
        if (this.__$YEAR_NUM_MONTH_DAY===undefined) {
            this.__$YEAR_NUM_MONTH_DAY = 'yMd';
        }
        return this.__$YEAR_NUM_MONTH_DAY;
    }

    private static __$YEAR_NUM_MONTH_WEEKDAY_DAY : string;
    static get YEAR_NUM_MONTH_WEEKDAY_DAY() : string { 
        if (this.__$YEAR_NUM_MONTH_WEEKDAY_DAY===undefined) {
            this.__$YEAR_NUM_MONTH_WEEKDAY_DAY = 'yMEd';
        }
        return this.__$YEAR_NUM_MONTH_WEEKDAY_DAY;
    }

    private static __$YEAR_ABBR_MONTH : string;
    static get YEAR_ABBR_MONTH() : string { 
        if (this.__$YEAR_ABBR_MONTH===undefined) {
            this.__$YEAR_ABBR_MONTH = 'yMMM';
        }
        return this.__$YEAR_ABBR_MONTH;
    }

    private static __$YEAR_ABBR_MONTH_DAY : string;
    static get YEAR_ABBR_MONTH_DAY() : string { 
        if (this.__$YEAR_ABBR_MONTH_DAY===undefined) {
            this.__$YEAR_ABBR_MONTH_DAY = 'yMMMd';
        }
        return this.__$YEAR_ABBR_MONTH_DAY;
    }

    private static __$YEAR_ABBR_MONTH_WEEKDAY_DAY : string;
    static get YEAR_ABBR_MONTH_WEEKDAY_DAY() : string { 
        if (this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY===undefined) {
            this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY = 'yMMMEd';
        }
        return this.__$YEAR_ABBR_MONTH_WEEKDAY_DAY;
    }

    private static __$YEAR_MONTH : string;
    static get YEAR_MONTH() : string { 
        if (this.__$YEAR_MONTH===undefined) {
            this.__$YEAR_MONTH = 'yMMMM';
        }
        return this.__$YEAR_MONTH;
    }

    private static __$YEAR_MONTH_DAY : string;
    static get YEAR_MONTH_DAY() : string { 
        if (this.__$YEAR_MONTH_DAY===undefined) {
            this.__$YEAR_MONTH_DAY = 'yMMMMd';
        }
        return this.__$YEAR_MONTH_DAY;
    }

    private static __$YEAR_MONTH_WEEKDAY_DAY : string;
    static get YEAR_MONTH_WEEKDAY_DAY() : string { 
        if (this.__$YEAR_MONTH_WEEKDAY_DAY===undefined) {
            this.__$YEAR_MONTH_WEEKDAY_DAY = 'yMMMMEEEEd';
        }
        return this.__$YEAR_MONTH_WEEKDAY_DAY;
    }

    private static __$YEAR_ABBR_QUARTER : string;
    static get YEAR_ABBR_QUARTER() : string { 
        if (this.__$YEAR_ABBR_QUARTER===undefined) {
            this.__$YEAR_ABBR_QUARTER = 'yQQQ';
        }
        return this.__$YEAR_ABBR_QUARTER;
    }

    private static __$YEAR_QUARTER : string;
    static get YEAR_QUARTER() : string { 
        if (this.__$YEAR_QUARTER===undefined) {
            this.__$YEAR_QUARTER = 'yQQQQ';
        }
        return this.__$YEAR_QUARTER;
    }

    private static __$HOUR24 : string;
    static get HOUR24() : string { 
        if (this.__$HOUR24===undefined) {
            this.__$HOUR24 = 'H';
        }
        return this.__$HOUR24;
    }

    private static __$HOUR24_MINUTE : string;
    static get HOUR24_MINUTE() : string { 
        if (this.__$HOUR24_MINUTE===undefined) {
            this.__$HOUR24_MINUTE = 'Hm';
        }
        return this.__$HOUR24_MINUTE;
    }

    private static __$HOUR24_MINUTE_SECOND : string;
    static get HOUR24_MINUTE_SECOND() : string { 
        if (this.__$HOUR24_MINUTE_SECOND===undefined) {
            this.__$HOUR24_MINUTE_SECOND = 'Hms';
        }
        return this.__$HOUR24_MINUTE_SECOND;
    }

    private static __$HOUR : string;
    static get HOUR() : string { 
        if (this.__$HOUR===undefined) {
            this.__$HOUR = 'j';
        }
        return this.__$HOUR;
    }

    private static __$HOUR_MINUTE : string;
    static get HOUR_MINUTE() : string { 
        if (this.__$HOUR_MINUTE===undefined) {
            this.__$HOUR_MINUTE = 'jm';
        }
        return this.__$HOUR_MINUTE;
    }

    private static __$HOUR_MINUTE_SECOND : string;
    static get HOUR_MINUTE_SECOND() : string { 
        if (this.__$HOUR_MINUTE_SECOND===undefined) {
            this.__$HOUR_MINUTE_SECOND = 'jms';
        }
        return this.__$HOUR_MINUTE_SECOND;
    }

    private static __$HOUR_MINUTE_GENERIC_TZ : string;
    static get HOUR_MINUTE_GENERIC_TZ() : string { 
        if (this.__$HOUR_MINUTE_GENERIC_TZ===undefined) {
            this.__$HOUR_MINUTE_GENERIC_TZ = 'jmv';
        }
        return this.__$HOUR_MINUTE_GENERIC_TZ;
    }

    private static __$HOUR_MINUTE_TZ : string;
    static get HOUR_MINUTE_TZ() : string { 
        if (this.__$HOUR_MINUTE_TZ===undefined) {
            this.__$HOUR_MINUTE_TZ = 'jmz';
        }
        return this.__$HOUR_MINUTE_TZ;
    }

    private static __$HOUR_GENERIC_TZ : string;
    static get HOUR_GENERIC_TZ() : string { 
        if (this.__$HOUR_GENERIC_TZ===undefined) {
            this.__$HOUR_GENERIC_TZ = 'jv';
        }
        return this.__$HOUR_GENERIC_TZ;
    }

    private static __$HOUR_TZ : string;
    static get HOUR_TZ() : string { 
        if (this.__$HOUR_TZ===undefined) {
            this.__$HOUR_TZ = 'jz';
        }
        return this.__$HOUR_TZ;
    }

    private static __$MINUTE : string;
    static get MINUTE() : string { 
        if (this.__$MINUTE===undefined) {
            this.__$MINUTE = 'm';
        }
        return this.__$MINUTE;
    }

    private static __$MINUTE_SECOND : string;
    static get MINUTE_SECOND() : string { 
        if (this.__$MINUTE_SECOND===undefined) {
            this.__$MINUTE_SECOND = 'ms';
        }
        return this.__$MINUTE_SECOND;
    }

    private static __$SECOND : string;
    static get SECOND() : string { 
        if (this.__$SECOND===undefined) {
            this.__$SECOND = 's';
        }
        return this.__$SECOND;
    }

    _locale : string;

    _pattern : string;

    _formatFieldsPrivate : core.DartList<_DateFormatField>;

    get _formatFields() : core.DartList<_DateFormatField> {
        if (this._formatFieldsPrivate == null) {
            if (this._pattern == null) this._useDefaultPattern();
            this._formatFieldsPrivate = this.parsePattern(this._pattern);
        }
        return this._formatFieldsPrivate;
    }
    _useDefaultPattern() {
        this.add_yMMMMd();
        this.add_jms();
    }
    private static __$_matchers : core.DartList<core.DartRegExp>;
    static get _matchers() : core.DartList<core.DartRegExp> { 
        if (this.__$_matchers===undefined) {
            this.__$_matchers = new core.DartList.literal(new core.DartRegExp("^'(?:[^']|'')*'"),new core.DartRegExp("^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|D+|m+|s+|v+|z+|Z+)"),new core.DartRegExp("^[^'GyMkSEahKHcLQdDmsvzZ]+"));
        }
        return this.__$_matchers;
    }
    static set _matchers(__$value : core.DartList<core.DartRegExp>)  { 
        this.__$_matchers = __$value;
    }

    _appendPattern(inputPattern : string,separator? : string) {
        separator = separator || ' ';
        this._pattern = this._pattern == null ? inputPattern : `${this._pattern}${separator}${inputPattern}`;
    }
    addPattern(inputPattern : string,separator? : string) : DateFormat {
        separator = separator || ' ';
        this._formatFieldsPrivate = null;
        if (inputPattern == null) return this;
        if (!this._availableSkeletons.containsKey(inputPattern)) {
            this._appendPattern(inputPattern,separator);
        }else {
            this._appendPattern(this._availableSkeletons.get(inputPattern),separator);
        }
        return this;
    }
    get pattern() {
        return this._pattern;
    }
    get _availableSkeletons() : core.DartMap<any,any> {
        return op(Op.INDEX,lib9.properties.dateTimePatterns,this.locale);
    }
    get dateSymbols() : lib10.DateSymbols {
        if (this._locale != lib9.properties.lastDateSymbolLocale) {
            lib9.properties.lastDateSymbolLocale = this._locale;
            lib9.properties.cachedDateSymbols = op(Op.INDEX,lib9.properties.dateTimeSymbols,this._locale);
        }
        return lib9.properties.cachedDateSymbols;
    }
    private static __$_useNativeDigitsByDefault : core.DartMap<string,boolean>;
    static get _useNativeDigitsByDefault() : core.DartMap<string,boolean> { 
        if (this.__$_useNativeDigitsByDefault===undefined) {
            this.__$_useNativeDigitsByDefault = new core.DartMap.literal([
            ]);
        }
        return this.__$_useNativeDigitsByDefault;
    }
    static set _useNativeDigitsByDefault(__$value : core.DartMap<string,boolean>)  { 
        this.__$_useNativeDigitsByDefault = __$value;
    }

    static shouldUseNativeDigitsByDefaultFor(locale : string) {
        return (DateFormat._useNativeDigitsByDefault.get(locale) || true);
    }
    static useNativeDigitsByDefaultFor(locale : string,value : boolean) {
        DateFormat._useNativeDigitsByDefault.set(locale,value);
    }
    _useNativeDigits : boolean;

    get useNativeDigits() : boolean {
        return this._useNativeDigits == null ? this._useNativeDigits = DateFormat.shouldUseNativeDigitsByDefaultFor(this.locale) : this._useNativeDigits;
    }
    set useNativeDigits(native : boolean) {
        this._useNativeDigits = native;
        this._digitMatcher = null;
        this._localeZeroCodeUnit = null;
        this._localeZero = null;
    }
    private static __$_digitMatchers : core.DartMap<string,core.DartRegExp>;
    static get _digitMatchers() : core.DartMap<string,core.DartRegExp> { 
        if (this.__$_digitMatchers===undefined) {
            this.__$_digitMatchers = new core.DartMap.literal([
            ]);
        }
        return this.__$_digitMatchers;
    }
    static set _digitMatchers(__$value : core.DartMap<string,core.DartRegExp>)  { 
        this.__$_digitMatchers = __$value;
    }

    _digitMatcher : core.DartRegExp;

    get digitMatcher() : core.DartRegExp {
        if (this._digitMatcher != null) return this._digitMatcher;
        this._digitMatcher = DateFormat._digitMatchers.putIfAbsent(this.localeZero,this._initDigitMatcher.bind(this));
        return this._digitMatcher;
    }
    private static __$_asciiDigitMatcher : core.DartRegExp;
    static get _asciiDigitMatcher() : core.DartRegExp { 
        if (this.__$_asciiDigitMatcher===undefined) {
            this.__$_asciiDigitMatcher = new core.DartRegExp('^\d+');
        }
        return this.__$_asciiDigitMatcher;
    }
    static set _asciiDigitMatcher(__$value : core.DartRegExp)  { 
        this.__$_asciiDigitMatcher = __$value;
    }

    _localeZeroCodeUnit : number;

    get localeZeroCodeUnit() : number {
        return this._localeZeroCodeUnit == null ? this._localeZeroCodeUnit = new core.DartString(this.localeZero).codeUnitAt(0) : this._localeZeroCodeUnit;
    }
    private static __$_asciiZeroCodeUnit : number;
    static get _asciiZeroCodeUnit() : number { 
        if (this.__$_asciiZeroCodeUnit===undefined) {
            this.__$_asciiZeroCodeUnit = new core.DartString('0').codeUnitAt(0);
        }
        return this.__$_asciiZeroCodeUnit;
    }
    static set _asciiZeroCodeUnit(__$value : number)  { 
        this.__$_asciiZeroCodeUnit = __$value;
    }

    _localeZero : string;

    get localeZero() : string {
        return this._localeZero == null ? this._localeZero = (this.useNativeDigits ? (this.dateSymbols.ZERODIGIT || '0') : '0') : this._localeZero;
    }
    get usesNativeDigits() : boolean {
        return this.useNativeDigits && this._localeZeroCodeUnit != DateFormat._asciiZeroCodeUnit;
    }
    get usesAsciiDigits() : boolean {
        return !this.usesNativeDigits;
    }
    _localizeDigits(numberString : string) : string {
        if (this.usesAsciiDigits) return numberString;
        let newDigits = new core.DartList<number>(new core.DartString(numberString).length);
        let oldDigits = new core.DartString(numberString).codeUnits;
        for(let i = 0; i < new core.DartString(numberString).length; i++){
            newDigits[i] = oldDigits[i] + this.localeZeroCodeUnit - DateFormat._asciiZeroCodeUnit;
        }
        return new core.DartString.fromCharCodes(newDigits).valueOf();
    }
    _initDigitMatcher() : core.DartRegExp {
        if (this.usesAsciiDigits) return DateFormat._asciiDigitMatcher;
        let localeDigits : core.DartList<number> = new core.DartIterable.generate(10,(i : any) =>  {
            return i;
        }).map((i : any) =>  {
            return this.localeZeroCodeUnit + i;
        }).toList();
        let localeDigitsString = new core.DartString.fromCharCodes(localeDigits).valueOf();
        return new core.DartRegExp('^[' + localeDigitsString + ']+');
    }
    static localeExists(localeName : any) : boolean {
        if (op(Op.EQUALS,localeName,null)) return false;
        return lib9.properties.dateTimeSymbols.containsKey(localeName);
    }
    static get _fieldConstructors() : core.DartList<any> {
        return new core.DartList.literal<any>((pattern : any,parent : any) =>  {
            return new _DateFormatQuotedField(pattern,parent);
        },(pattern : any,parent : any) =>  {
            return new _DateFormatPatternField(pattern,parent);
        },(pattern : any,parent : any) =>  {
            return new _DateFormatLiteralField(pattern,parent);
        });
    }
    parsePattern(pattern : string) : core.DartList<_DateFormatField> {
        if (pattern == null) return null;
        return this._parsePatternHelper(pattern).reversed.toList();
    }
    _parsePatternHelper(pattern : string) : core.DartList<_DateFormatField> {
        if (new core.DartString(pattern).isEmpty) return new core.DartList.literal();
        let matched = this._match(pattern);
        if (op(Op.EQUALS,matched,null)) return new core.DartList.literal();
        let parsed = this._parsePatternHelper(new core.DartString(pattern).substring(new core.DartString(matched.fullPattern()).length));
        parsed.add(matched);
        return parsed;
    }
    _match(pattern : string) : _DateFormatField {
        for(let i = 0; i < DateFormat._matchers.length; i++){
            let regex = DateFormat._matchers[i];
            let match = regex.firstMatch(pattern);
            if (match != null) {
                return (DateFormat._fieldConstructors[i])(match.group(0),this);
            }
        }
        return null;
    }
}

@DartClass
export class _DateFormatField {
    pattern : string;

    parent : DateFormat;

    _trimmedPattern : string;

    constructor(pattern : string,parent : DateFormat) {
    }
    @defaultConstructor
    _DateFormatField(pattern : string,parent : DateFormat) {
        this.pattern = pattern;
        this.parent = parent;
        this._trimmedPattern = new core.DartString(this.pattern).trim();
    }
    get forDate() : boolean {
        return true;
    }
    get width() : number {
        return new core.DartString(this.pattern).length;
    }
    fullPattern() : string {
        return this.pattern;
    }
    toString() : string {
        return this.pattern;
    }
    format(date : core.DartDateTime) : string {
        return this.pattern;
    }
    @Abstract
    parse(input : _Stream,dateFields : _DateBuilder) : void{ throw 'abstract'}
    @Abstract
    parseLoose(input : _Stream,dateFields : _DateBuilder) : void{ throw 'abstract'}
    parseLiteral(input : _Stream) : void {
        let found = input.read(this.width);
        if (found != this.pattern) {
            this.throwFormatException(input);
        }
    }
    parseLiteralLoose(input : _Stream) : void {
        this._trimWhitespace(input);
        let found = input.peek(new core.DartString(this._trimmedPattern).length);
        if (op(Op.EQUALS,found,this._trimmedPattern)) {
            input.read(new core.DartString(this._trimmedPattern).length);
        }
        this._trimWhitespace(input);
    }
    _trimWhitespace(input : _Stream) : void {
        while (!input.atEnd() && input.peek().trim().isEmpty){
            input.read();
        }
    }
    throwFormatException(stream : _Stream) : void {
        throw new core.FormatException(`Trying to read ${this} from ${stream.contents} ` + `at position ${stream.index}`);
    }
}

@DartClass
export class _DateBuilder {
    year : number;
    month : number;
    day : number;
    hour : number;
    minute : number;
    second : number;
    fractionalSecond : number;

    pm : boolean;

    utc : boolean;

    _dateOnly : boolean;

    setYear(x : any) : void {
        this.year = x;
    }
    setMonth(x : any) : void {
        this.month = x;
    }
    setDay(x : any) : void {
        this.day = x;
    }
    setHour(x : any) : void {
        this.hour = x;
    }
    setMinute(x : any) : void {
        this.minute = x;
    }
    setSecond(x : any) : void {
        this.second = x;
    }
    setFractionalSecond(x : any) : void {
        this.fractionalSecond = x;
    }
    get hour24() {
        return this.pm ? this.hour + 12 : this.hour;
    }
    verify(s : string) {
        this._verify(this.month,1,12,"month",s);
        this._verify(this.hour24,0,23,"hour",s);
        this._verify(this.minute,0,59,"minute",s);
        this._verify(this.second,0,59,"second",s);
        this._verify(this.fractionalSecond,0,999,"fractional second",s);
        let date = this.asDate();
        this._verify(this.hour24,date.hour,date.hour,"hour",s,date);
        if (this.day > 31) {
            let leapYear = _isLeapYear(date);
            let correspondingDay = _dayOfYear(date.month,date.day,leapYear);
            this._verify(this.day,correspondingDay,correspondingDay,"day",s,date);
        }else {
            this._verify(this.day,date.day,date.day,"day",s,date);
        }
        this._verify(this.year,date.year,date.year,"year",s,date);
    }
    _verify(value : number,min : number,max : number,desc : string,originalInput : string,parsed? : core.DartDateTime) {
        if (value < min || value > max) {
            let parsedDescription = op(Op.EQUALS,parsed,null) ? "" : ` Date parsed as ${parsed}.`;
            throw new core.FormatException(`Error parsing ${originalInput}, invalid ${desc} value: ${value}.` + ` Expected value between ${min} and ${max}.${parsedDescription}`);
        }
    }
    asDate(_namedArguments? : {retries? : number}) : core.DartDateTime {
        let {retries} = Object.assign({
            "retries" : 3}, _namedArguments );
        if (this.utc) {
            return new core.DartDateTime.utc(this.year,this.month,this.day,this.hour24,this.minute,this.second,this.fractionalSecond);
        }else {
            let preliminaryResult = new core.DartDateTime(this.year,this.month,this.day,this.hour24,this.minute,this.second,this.fractionalSecond);
            return this._correctForErrors(preliminaryResult,retries);
        }
    }
    _correctForErrors(result : core.DartDateTime,retries : number) : core.DartDateTime {
        if (retries <= 0) {
            return result;
        }
        let leapYear = _isLeapYear(result);
        let correspondingDay = _dayOfYear(result.month,result.day,leapYear);
        if (!this.utc && result.isUtc && (result.hour != this.hour24 || result.day != correspondingDay || !new core.DartDateTime.now().isUtc)) {
            return this.asDate({
                retries : retries - 1});
        }
        if (this._dateOnly && this.day != correspondingDay) {
            let adjusted = result.add(new core.DartDuration({
                hours : (24 - result.hour)}));
            if (_dayOfYear(adjusted.month,adjusted.day,leapYear) == this.day) return adjusted;
        }
        return result;
    }
    constructor() {
    }
    @defaultConstructor
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
}

@DartClass
export class _Stream {
    contents;

    index : number;

    constructor(contents : any) {
    }
    @defaultConstructor
    _Stream(contents : any) {
        this.index = 0;
        this.contents = contents;
    }
    atEnd() : boolean {
        return this.index >= this.contents.length;
    }
    next() {
        return op(Op.INDEX,this.contents,this.index++);
    }
    read(howMany? : number) {
        howMany = howMany || 1;
        let result = this.peek(howMany);
        this.index += howMany;
        return result;
    }
    startsWith(pattern : string) : boolean {
        if (is(this.contents, "string")) return this.contents.startsWith(pattern,this.index);
        return pattern == this.peek(new core.DartString(pattern).length);
    }
    peek(howMany? : number) {
        howMany = howMany || 1;
        let result;
        if (is(this.contents, "string")) {
            let stringContents : string = this.contents;
            result = new core.DartString(stringContents).substring(this.index,math.min(this.index + howMany,new core.DartString(stringContents).length));
        }else {
            result = this.contents.sublist(this.index,this.index + howMany);
        }
        return result;
    }
    rest() {
        return this.peek(op(Op.MINUS,this.contents.length,this.index));
    }
    findIndex(f : Function) : number {
        while (!this.atEnd()){
            if (f(this.next())) return this.index - 1;
        }
        return null;
    }
    findIndexes(f : Function) : core.DartList<any> {
        let results = new core.DartList.literal();
        while (!this.atEnd()){
            if (f(this.next())) results.add(this.index - 1);
        }
        return results;
    }
    nextInteger(_namedArguments? : {digitMatcher? : core.DartRegExp,zeroDigit? : number}) : number {
        let {digitMatcher,zeroDigit} = Object.assign({
        }, _namedArguments );
        let string = ((digitMatcher || DateFormat._asciiDigitMatcher)).stringMatch(this.rest());
        if (string == null || new core.DartString(string).isEmpty) return null;
        this.read(new core.DartString(string).length);
        if (zeroDigit != null && zeroDigit != DateFormat._asciiZeroCodeUnit) {
            let oldDigits = new core.DartString(string).codeUnits;
            let newDigits = new core.DartList<number>(new core.DartString(string).length);
            for(let i = 0; i < new core.DartString(string).length; i++){
                newDigits[i] = oldDigits[i] - zeroDigit + DateFormat._asciiZeroCodeUnit;
            }
            string = new core.DartString.fromCharCodes(newDigits).valueOf();
        }
        return core.DartInt.parse(string);
    }
}

@DartClass
export class NumberFormat {
    _negativePrefix : string;

    _positivePrefix : string;

    _negativeSuffix : string;

    _positiveSuffix : string;

    _groupingSize : number;

    _finalGroupingSize : number;

    _groupingSizeSetExplicitly : boolean;

    _decimalSeparatorAlwaysShown : boolean;

    _useSignForPositiveExponent : boolean;

    _useExponentialNotation : boolean;

    _isForCurrency : boolean;

    maximumIntegerDigits : number;

    minimumIntegerDigits : number;

    maximumFractionDigits : number;

    minimumFractionDigits : number;

    minimumExponentDigits : number;

    _significantDigits : number;

    private static __$_ln10;
    static get _ln10() { 
        if (this.__$_ln10===undefined) {
            this.__$_ln10 = math.log(10);
        }
        return this.__$_ln10;
    }
    static set _ln10(__$value : any)  { 
        this.__$_ln10 = __$value;
    }

    get significantDigits() : number {
        return this._significantDigits;
    }
    set significantDigits(x : number) {
        this._significantDigits = x;
        this.significantDigitsInUse = true;
    }
    significantDigitsInUse : boolean;

    get _multiplier() : number {
        return this._internalMultiplier;
    }
    set _multiplier(x : number) {
        this._internalMultiplier = x;
        this._multiplierDigits = new core.DartDouble((math.log(this._multiplier) / NumberFormat._ln10)).round();
    }
    _internalMultiplier : number;

    _multiplierDigits : number;

    _pattern : string;

    _locale : string;

    _symbols : lib6.NumberSymbols;

    currencyName : string;

    _currencySymbol : string;

    get currencySymbol() : string {
        return (this._currencySymbol || this.currencyName);
    }
    get decimalDigits() : number {
        return this._decimalDigits;
    }
    _decimalDigits : number;

    get _defaultDecimalDigits() : number {
        return (op(Op.INDEX,lib8.properties.currencyFractionDigits,new core.DartString(this.currencyName).toUpperCase()) || op(Op.INDEX,lib8.properties.currencyFractionDigits,'DEFAULT'));
    }
    get _overridesDecimalDigits() : boolean {
        return this.decimalDigits != null || this._isForCurrency;
    }
    _buffer : core.DartStringBuffer;

    constructor(newPattern? : string,locale? : string) {
    }
    @defaultFactory
    static $NumberFormat(newPattern? : string,locale? : string) : NumberFormat {
        return new NumberFormat._forPattern(locale,(x : any) =>  {
            return newPattern;
        });
    }
    @namedConstructor
    decimalPattern(locale? : string) {
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
        this._forPattern(locale,(x : any) =>  {
            return x.DECIMAL_PATTERN;
        });
    }
    static decimalPattern : new(locale : string) => NumberFormat;

    @namedConstructor
    percentPattern(locale? : string) {
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
        this._forPattern(locale,(x : any) =>  {
            return x.PERCENT_PATTERN;
        });
    }
    static percentPattern : new(locale : string) => NumberFormat;

    @namedConstructor
    scientificPattern(locale? : string) {
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
        this._forPattern(locale,(x : any) =>  {
            return x.SCIENTIFIC_PATTERN;
        });
    }
    static scientificPattern : new(locale : string) => NumberFormat;

    private static __$_checkCurrencyName;
    static get _checkCurrencyName() { 
        if (this.__$_checkCurrencyName===undefined) {
            this.__$_checkCurrencyName = new core.DartRegExp('^[a-zA-Z]{3}$');
        }
        return this.__$_checkCurrencyName;
    }
    static set _checkCurrencyName(__$value : any)  { 
        this.__$_checkCurrencyName = __$value;
    }

    @namedFactory
    static $currencyPattern(locale? : string,currencyNameOrSymbol? : string) : NumberFormat {
        if (currencyNameOrSymbol != null && NumberFormat._checkCurrencyName.hasMatch(currencyNameOrSymbol)) {
            return new NumberFormat.currency({
                locale : locale,name : currencyNameOrSymbol});
        }else {
            return new NumberFormat.currency({
                locale : locale,symbol : currencyNameOrSymbol});
        }
    }
    static currencyPattern : new(locale : string,currencyNameOrSymbol : string) => NumberFormat;

    @namedConstructor
    currency(_namedArguments? : {locale? : string,name? : string,symbol? : string,decimalDigits? : number,customPattern? : string}) {
        let {locale,name,symbol,decimalDigits,customPattern} = Object.assign({
        }, _namedArguments );
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
        this._forPattern(locale,(x : any) =>  {
            return (customPattern || x.CURRENCY_PATTERN);
        },{
            name : name,currencySymbol : symbol,decimalDigits : decimalDigits,isForCurrency : true});
    }
    static currency : new(_namedArguments? : {locale? : string,name? : string,symbol? : string,decimalDigits? : number,customPattern? : string}) => NumberFormat;

    @namedFactory
    static $simpleCurrency(_namedArguments? : {locale? : string,name? : string,decimalDigits? : number}) : NumberFormat {
        let {locale,name,decimalDigits} = Object.assign({
        }, _namedArguments );
        return new NumberFormat._forPattern(locale,(x : any) =>  {
            return x.CURRENCY_PATTERN;
        },{
            name : name,computeCurrencySymbol : (format : any) =>  {
                return (NumberFormat._simpleCurrencySymbols.get(format.currencyName) || format.currencyName);
            },decimalDigits : decimalDigits,isForCurrency : true});
    }
    static simpleCurrency : new(_namedArguments? : {locale? : string,name? : string,decimalDigits? : number}) => NumberFormat;

    simpleCurrencySymbol(currencyCode : string) : string {
        return (NumberFormat._simpleCurrencySymbols.get(currencyCode) || currencyCode);
    }
    private static __$_simpleCurrencySymbols : core.DartMap<string,string>;
    static get _simpleCurrencySymbols() : core.DartMap<string,string> { 
        if (this.__$_simpleCurrencySymbols===undefined) {
            this.__$_simpleCurrencySymbols = new core.DartMap.literal([
                ["AFN","Af."],
                ["TOP","T$"],
                ["MGA","Ar"],
                ["THB","฿"],
                ["PAB","B/."],
                ["ETB","Birr"],
                ["VEF","Bs"],
                ["BOB","Bs"],
                ["GHS","GHS"],
                ["CRC","₡"],
                ["NIO","C$"],
                ["GMD","GMD"],
                ["MKD","din"],
                ["BHD","din"],
                ["DZD","din"],
                ["IQD","din"],
                ["JOD","din"],
                ["KWD","din"],
                ["LYD","din"],
                ["RSD","din"],
                ["TND","din"],
                ["AED","dh"],
                ["MAD","dh"],
                ["STD","Db"],
                ["BSD","$"],
                ["FJD","$"],
                ["GYD","$"],
                ["KYD","$"],
                ["LRD","$"],
                ["SBD","$"],
                ["SRD","$"],
                ["AUD","$"],
                ["BBD","$"],
                ["BMD","$"],
                ["BND","$"],
                ["BZD","$"],
                ["CAD","$"],
                ["HKD","$"],
                ["JMD","$"],
                ["NAD","$"],
                ["NZD","$"],
                ["SGD","$"],
                ["TTD","$"],
                ["TWD","NT$"],
                ["USD","$"],
                ["XCD","$"],
                ["VND","₫"],
                ["AMD","Dram"],
                ["CVE","CVE"],
                ["EUR","€"],
                ["AWG","Afl."],
                ["HUF","Ft"],
                ["BIF","FBu"],
                ["CDF","FrCD"],
                ["CHF","CHF"],
                ["DJF","Fdj"],
                ["GNF","FG"],
                ["RWF","RF"],
                ["XOF","CFA"],
                ["XPF","FCFP"],
                ["KMF","CF"],
                ["XAF","FCFA"],
                ["HTG","HTG"],
                ["PYG","Gs"],
                ["UAH","₴"],
                ["PGK","PGK"],
                ["LAK","₭"],
                ["CZK","Kč"],
                ["SEK","kr"],
                ["ISK","kr"],
                ["DKK","kr"],
                ["NOK","kr"],
                ["HRK","kn"],
                ["MWK","MWK"],
                ["ZMK","ZWK"],
                ["AOA","Kz"],
                ["MMK","K"],
                ["GEL","GEL"],
                ["LVL","Ls"],
                ["ALL","Lek"],
                ["HNL","L"],
                ["SLL","SLL"],
                ["MDL","MDL"],
                ["RON","RON"],
                ["BGN","lev"],
                ["SZL","SZL"],
                ["TRY","TL"],
                ["LTL","Lt"],
                ["LSL","LSL"],
                ["AZN","man."],
                ["BAM","KM"],
                ["MZN","MTn"],
                ["NGN","₦"],
                ["ERN","Nfk"],
                ["BTN","Nu."],
                ["MRO","MRO"],
                ["MOP","MOP"],
                ["CUP","$"],
                ["CUC","$"],
                ["ARS","$"],
                ["CLF","UF"],
                ["CLP","$"],
                ["COP","$"],
                ["DOP","$"],
                ["MXN","$"],
                ["PHP","₱"],
                ["UYU","$"],
                ["FKP","£"],
                ["GIP","£"],
                ["SHP","£"],
                ["EGP","E£"],
                ["LBP","L£"],
                ["SDG","SDG"],
                ["SSP","SSP"],
                ["GBP","£"],
                ["SYP","£"],
                ["BWP","P"],
                ["GTQ","Q"],
                ["ZAR","R"],
                ["BRL","R$"],
                ["OMR","Rial"],
                ["QAR","Rial"],
                ["YER","Rial"],
                ["IRR","Rial"],
                ["KHR","Riel"],
                ["MYR","RM"],
                ["SAR","Rial"],
                ["BYR","BYR"],
                ["RUB","руб."],
                ["MUR","Rs"],
                ["SCR","SCR"],
                ["LKR","Rs"],
                ["NPR","Rs"],
                ["INR","₹"],
                ["PKR","Rs"],
                ["IDR","Rp"],
                ["ILS","₪"],
                ["KES","Ksh"],
                ["SOS","SOS"],
                ["TZS","TSh"],
                ["UGX","UGX"],
                ["PEN","S/."],
                ["KGS","KGS"],
                ["UZS","soʼm"],
                ["TJS","Som"],
                ["BDT","৳"],
                ["WST","WST"],
                ["KZT","₸"],
                ["MNT","₮"],
                ["VUV","VUV"],
                ["KPW","₩"],
                ["KRW","₩"],
                ["JPY","¥"],
                ["CNY","¥"],
                ["PLN","zł"],
                ["MVR","Rf"],
                ["NLG","NAf"],
                ["ZMW","ZK"],
                ["ANG","ƒ"],
                ["TMT","TMT"]]);
        }
        return this.__$_simpleCurrencySymbols;
    }
    static set _simpleCurrencySymbols(__$value : core.DartMap<string,string>)  { 
        this.__$_simpleCurrencySymbols = __$value;
    }

    @namedConstructor
    _forPattern(locale : string,getPattern : (symbols : lib6.NumberSymbols) => string,_namedArguments? : {name? : string,currencySymbol? : string,computeCurrencySymbol? : (NumberFormat : any) => string,decimalDigits? : number,isForCurrency? : boolean}) {
        let {name,currencySymbol,computeCurrencySymbol,decimalDigits,isForCurrency} = Object.assign({
            "isForCurrency" : false}, _namedArguments );
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
        this._locale = Intl.verifiedLocale(locale,NumberFormat.localeExists.bind(this));
        this._isForCurrency = isForCurrency;
        this._currencySymbol = currencySymbol;
        this._decimalDigits = decimalDigits;
        this._symbols = lib8.properties.numberFormatSymbols.get(this._locale);
        this._localeZero = new core.DartString(this._symbols.ZERO_DIGIT).codeUnitAt(0);
        this._zeroOffset = this._localeZero - NumberFormat._zero;
        this._negativePrefix = this._symbols.MINUS_SIGN;
        this.currencyName = (name || this._symbols.DEF_CURRENCY_CODE);
        if (this._currencySymbol == null && computeCurrencySymbol != null) {
            this._currencySymbol = computeCurrencySymbol(this);
        }
        this._setPattern(getPattern(this._symbols));
    }
    static _forPattern : new(locale : string,getPattern : (symbols : lib6.NumberSymbols) => string,_namedArguments? : {name? : string,currencySymbol? : string,computeCurrencySymbol? : (NumberFormat : any) => string,decimalDigits? : number,isForCurrency? : boolean}) => NumberFormat;

    @namedFactory
    static $compact(_namedArguments? : {locale? : string}) : NumberFormat {
        let {locale} = Object.assign({
        }, _namedArguments );
        return new _CompactNumberFormat({
            locale : locale,formatType : _CompactFormatType.COMPACT_DECIMAL_SHORT_PATTERN});
    }
    static compact : new(_namedArguments? : {locale? : string}) => NumberFormat;

    @namedFactory
    static $compactLong(_namedArguments? : {locale? : string}) : NumberFormat {
        let {locale} = Object.assign({
        }, _namedArguments );
        return new _CompactNumberFormat({
            locale : locale,formatType : _CompactFormatType.COMPACT_DECIMAL_LONG_PATTERN});
    }
    static compactLong : new(_namedArguments? : {locale? : string}) => NumberFormat;

    @namedFactory
    static $compactSimpleCurrency(_namedArguments? : {locale? : string,name? : string,decimalDigits? : number}) : NumberFormat {
        let {locale,name,decimalDigits} = Object.assign({
        }, _namedArguments );
        return new _CompactNumberFormat({
            locale : locale,formatType : _CompactFormatType.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN,name : name,getPattern : (symbols : any) =>  {
                return symbols.CURRENCY_PATTERN;
            },computeCurrencySymbol : (format : any) =>  {
                return (NumberFormat._simpleCurrencySymbols.get(format.currencyName) || format.currencyName);
            },decimalDigits : decimalDigits,isForCurrency : true});
    }
    static compactSimpleCurrency : new(_namedArguments? : {locale? : string,name? : string,decimalDigits? : number}) => NumberFormat;

    @namedFactory
    static $compactCurrency(_namedArguments? : {locale? : string,name? : string,symbol? : string,decimalDigits? : number}) : NumberFormat {
        let {locale,name,symbol,decimalDigits} = Object.assign({
        }, _namedArguments );
        return new _CompactNumberFormat({
            locale : locale,formatType : _CompactFormatType.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN,name : name,getPattern : (symbols : any) =>  {
                return symbols.CURRENCY_PATTERN;
            },currencySymbol : symbol,decimalDigits : decimalDigits,isForCurrency : true});
    }
    static compactCurrency : new(_namedArguments? : {locale? : string,name? : string,symbol? : string,decimalDigits? : number}) => NumberFormat;

    get locale() : string {
        return this._locale;
    }
    static localeExists(localeName : any) : boolean {
        if (op(Op.EQUALS,localeName,null)) return false;
        return lib8.properties.numberFormatSymbols.containsKey(localeName);
    }
    get symbols() : lib6.NumberSymbols {
        return this._symbols;
    }
    format(number : any) : string {
        if (this._isNaN(number)) return this.symbols.NAN;
        if (this._isInfinite(number)) return `${this._signPrefix(number)}${this.symbols.INFINITY}`;
        this._add(this._signPrefix(number));
        this._formatNumber(number.abs());
        this._add(this._signSuffix(number));
        let result = this._buffer.toString();
        this._buffer.clear();
        return result;
    }
    parse(text : string) : number {
        return new _NumberParser(this,text).value;
    }
    _formatNumber(number : any) : void {
        if (this._useExponentialNotation) {
            this._formatExponential(number);
        }else {
            this._formatFixed(number);
        }
    }
    _formatExponential(number : number) : void {
        if (number == 0.0) {
            this._formatFixed(number);
            this._formatExponent(0);
            return;
        }
        let exponent = new core.DartDouble((math.log(number) / NumberFormat._ln10)).floor();
        let mantissa = number / math.pow(10.0,exponent);
        if (this.maximumIntegerDigits > 1 && this.maximumIntegerDigits > this.minimumIntegerDigits) {
            while ((exponent % this.maximumIntegerDigits) != 0){
                mantissa *= 10;
                exponent--;
            }
        }else {
            if (this.minimumIntegerDigits < 1) {
                exponent++;
                mantissa /= 10;
            }else {
                exponent -= this.minimumIntegerDigits - 1;
                mantissa *= math.pow(10,this.minimumIntegerDigits - 1);
            }
        }
        this._formatFixed(mantissa);
        this._formatExponent(exponent);
    }
    _formatExponent(exponent : number) : void {
        this._add(this.symbols.EXP_SYMBOL);
        if (exponent < 0) {
            exponent = -exponent;
            this._add(this.symbols.MINUS_SIGN);
        }else if (this._useSignForPositiveExponent) {
            this._add(this.symbols.PLUS_SIGN);
        }
        this._pad(this.minimumExponentDigits,new core.DartNumber(exponent).toString());
    }
    private static __$_maxInt;
    static get _maxInt() { 
        if (this.__$_maxInt===undefined) {
            this.__$_maxInt = is(1, "double") ? math.pow(2,52) : new core.DartDouble(1e+300).floor();
        }
        return this.__$_maxInt;
    }
    static set _maxInt(__$value : any)  { 
        this.__$_maxInt = __$value;
    }

    private static __$_maxDigits;
    static get _maxDigits() { 
        if (this.__$_maxDigits===undefined) {
            this.__$_maxDigits = new core.DartDouble((math.log(NumberFormat._maxInt) / math.log(10))).ceil();
        }
        return this.__$_maxDigits;
    }
    static set _maxDigits(__$value : any)  { 
        this.__$_maxDigits = __$value;
    }

    _isInfinite(number : any) {
        return is(number, "number") ? new core.DartNumber(number).isInfinite : false;
    }
    _isNaN(number : any) {
        return is(number, "number") ? new core.DartNumber(number).isNaN : false;
    }
    _floor(number : any) {
        if (number.isNegative && !(number.abs().isNegative)) {
            throw new core.ArgumentError(`Internal error: expected positive number, got ${number}`);
        }
        return (is(number, "number")) ? new core.DartNumber(number).floor() : op(Op.QUOTIENT,number,1);
    }
    _round(number : any) {
        if (is(number, "number")) {
            if (new core.DartNumber(number).isInfinite) {
                return NumberFormat._maxInt;
            }else {
                return new core.DartNumber(number).round();
            }
        }else if (op(Op.EQUALS,number.remainder(1),0)) {
            return number;
        }else {
            let basic = this._floor(number);
            let fraction = (op(Op.MINUS,number,basic)).toDouble().round();
            return op(Op.EQUALS,fraction,0) ? number : op(Op.PLUS,number,fraction);
        }
    }
    static numberOfIntegerDigits(number : any) : number {
        let simpleNumber = number.toDouble().abs();
        if (op(Op.LT,simpleNumber,10)) return 1;
        if (op(Op.LT,simpleNumber,100)) return 2;
        if (op(Op.LT,simpleNumber,1000)) return 3;
        if (op(Op.LT,simpleNumber,10000)) return 4;
        if (op(Op.LT,simpleNumber,100000)) return 5;
        if (op(Op.LT,simpleNumber,1000000)) return 6;
        if (op(Op.LT,simpleNumber,10000000)) return 7;
        if (op(Op.LT,simpleNumber,100000000)) return 8;
        if (op(Op.LT,simpleNumber,1000000000)) return 9;
        if (op(Op.LT,simpleNumber,10000000000)) return 10;
        if (op(Op.LT,simpleNumber,100000000000)) return 11;
        if (op(Op.LT,simpleNumber,1000000000000)) return 12;
        if (op(Op.LT,simpleNumber,10000000000000)) return 13;
        if (op(Op.LT,simpleNumber,100000000000000)) return 14;
        if (op(Op.LT,simpleNumber,1000000000000000)) return 15;
        if (op(Op.LT,simpleNumber,10000000000000000)) return 16;
        return math.max(1,new core.DartDouble((math.log(simpleNumber) / NumberFormat._ln10)).ceil());
    }
    _fractionDigitsAfter(remainingSignificantDigits : number) : number {
        return math.max(0,remainingSignificantDigits);
    }
    _formatFixed(number : any) : void {
        let integerPart;
        let fractionPart : number;
        let extraIntegerDigits : number;
        let fractionDigits = this.maximumFractionDigits;
        let power = 0;
        let digitMultiplier;
        if (this._isInfinite(number)) {
            integerPart = number.toInt();
            extraIntegerDigits = 0;
            fractionPart = 0;
        }else {
            integerPart = this._floor(number);
            let fraction = op(Op.MINUS,number,integerPart);
            if (fraction.toInt() != 0) {
                integerPart = number;
                fraction = 0;
            }
            if (this.significantDigitsInUse) {
                let integerLength = NumberFormat.numberOfIntegerDigits(integerPart);
                let remainingSignificantDigits = this.significantDigits - this._multiplierDigits - integerLength;
                fractionDigits = this._fractionDigitsAfter(remainingSignificantDigits);
                if (remainingSignificantDigits < 0) {
                    let divideBy = math.pow(10,integerLength - this.significantDigits);
                    integerPart = op(Op.TIMES,(op(Op.DIVIDE,integerPart,divideBy)).round(),divideBy);
                }
            }
            power = math.pow(10,fractionDigits);
            digitMultiplier = power * this._multiplier;
            let remainingDigits = this._round(op(Op.TIMES,fraction,digitMultiplier)).toInt();
            if (op(Op.GEQ,remainingDigits,digitMultiplier)) {
                integerPart++;
                remainingDigits -= digitMultiplier;
            }
            extraIntegerDigits = op(Op.QUOTIENT,remainingDigits,power);
            fractionPart = op(Op.MODULE,remainingDigits,power);
        }
        let integerDigits = this._integerDigits(integerPart,extraIntegerDigits);
        let digitLength = new core.DartString(integerDigits).length;
        let fractionPresent = fractionDigits > 0 && (this.minimumFractionDigits > 0 || fractionPart > 0);
        if (this._hasIntegerDigits(integerDigits)) {
            let padding = op(Op.TIMES,'0',(this.minimumIntegerDigits - digitLength));
            integerDigits = `${padding}${integerDigits}`;
            digitLength = new core.DartString(integerDigits).length;
            for(let i = 0; i < digitLength; i++){
                this._addDigit(new core.DartString(integerDigits).codeUnitAt(i));
                this._group(digitLength,i);
            }
        }else if (!fractionPresent) {
            this._addZero();
        }
        this._decimalSeparator(fractionPresent);
        this._formatFractionPart(new core.DartNumber((fractionPart + power)).toString());
    }
    _integerDigits(integerPart : any,extraIntegerDigits : any) : string {
        let paddingDigits = '';
        if (is(integerPart, "number") && integerPart > NumberFormat._maxInt) {
            let howManyDigitsTooBig = new core.DartDouble((math.log(integerPart) / NumberFormat._ln10)).ceil() - NumberFormat._maxDigits;
            let divisor : number = new core.DartNumber(math.pow(10,howManyDigitsTooBig)).round();
            if (divisor == 0) divisor = math.pow(10.0,howManyDigitsTooBig);
            paddingDigits = op(Op.TIMES,'0',new core.DartNumber(howManyDigitsTooBig).toInt());
            integerPart = new core.DartDouble((integerPart / divisor)).truncate();
        }
        let extra = op(Op.EQUALS,extraIntegerDigits,0) ? '' : extraIntegerDigits.toString();
        let intDigits = this._mainIntegerDigits(integerPart);
        let paddedExtra = new core.DartString(intDigits).isEmpty ? extra : new core.DartString(extra).padLeft(this._multiplierDigits,'0');
        return `${intDigits}${paddedExtra}${paddingDigits}`;
    }
    _mainIntegerDigits(integer : any) : string {
        if (op(Op.EQUALS,integer,0)) return '';
        let digits = integer.toString();
        if (this.significantDigitsInUse && new core.DartString(digits).length > this.significantDigits) {
            digits = new core.DartString(digits).substring(0,this.significantDigits) + new core.DartString('').padLeft(new core.DartString(digits).length - this.significantDigits,'0');
        }
        return new core.DartString(digits).startsWith('-') ? new core.DartString(digits).substring(1) : digits;
    }
    _formatFractionPart(fractionPart : string) : void {
        let fractionLength = new core.DartString(fractionPart).length;
        while (new core.DartString(fractionPart).codeUnitAt(fractionLength - 1) == NumberFormat._zero && fractionLength > this.minimumFractionDigits + 1){
            fractionLength--;
        }
        for(let i = 1; i < fractionLength; i++){
            this._addDigit(new core.DartString(fractionPart).codeUnitAt(i));
        }
    }
    _decimalSeparator(fractionPresent : boolean) : void {
        if (this._decimalSeparatorAlwaysShown || fractionPresent) {
            this._add(this.symbols.DECIMAL_SEP);
        }
    }
    _hasIntegerDigits(digits : string) : boolean {
        return new core.DartString(digits).isNotEmpty || this.minimumIntegerDigits > 0;
    }
    _add(x : string) : void {
        this._buffer.write(x);
    }
    _addZero() : void {
        this._buffer.write(this.symbols.ZERO_DIGIT);
    }
    _addDigit(x : number) : void {
        this._buffer.writeCharCode(x + this._zeroOffset);
    }
    _pad(numberOfDigits : number,basic : string) : void {
        if (this._zeroOffset == 0) {
            this._buffer.write(new core.DartString(basic).padLeft(numberOfDigits,'0'));
        }else {
            this._slowPad(numberOfDigits,basic);
        }
    }
    _slowPad(numberOfDigits : number,basic : string) : void {
        for(let i = 0; i < numberOfDigits - new core.DartString(basic).length; i++){
            this._add(this.symbols.ZERO_DIGIT);
        }
        for(let i : number = 0; i < new core.DartString(basic).length; i++){
            this._addDigit(new core.DartString(basic).codeUnitAt(i));
        }
    }
    _group(totalLength : number,position : number) : void {
        let distanceFromEnd = totalLength - position;
        if (distanceFromEnd <= 1 || this._groupingSize <= 0) return;
        if (distanceFromEnd == this._finalGroupingSize + 1) {
            this._add(this.symbols.GROUP_SEP);
        }else if ((distanceFromEnd > this._finalGroupingSize) && (distanceFromEnd - this._finalGroupingSize) % this._groupingSize == 1) {
            this._add(this.symbols.GROUP_SEP);
        }
    }
    private static __$_zero;
    static get _zero() { 
        if (this.__$_zero===undefined) {
            this.__$_zero = 48;
        }
        return this.__$_zero;
    }

    _localeZero : number;

    _zeroOffset : number;

    _signPrefix(x : any) : string {
        return x.isNegative ? this._negativePrefix : this._positivePrefix;
    }
    _signSuffix(x : any) : string {
        return x.isNegative ? this._negativeSuffix : this._positiveSuffix;
    }
    _setPattern(newPattern : string) : void {
        if (newPattern == null) return;
        this._pattern = new core.DartString(newPattern).replaceAll(' ',' ');
        let parser = new _NumberFormatParser(this,newPattern,this.currencySymbol,this.decimalDigits);
        parser.parse();
        if (this._overridesDecimalDigits) {
            this._decimalDigits = ( this._decimalDigits ) || ( this._defaultDecimalDigits );
            this.minimumFractionDigits = this._decimalDigits;
            this.maximumFractionDigits = this._decimalDigits;
        }
    }
    turnOffGrouping() : void {
        this._groupingSize = 0;
        this._finalGroupingSize = 0;
    }
    toString() : string {
        return `NumberFormat(${this._locale}, ${this._pattern})`;
    }
}

@DartClass
export class _NumberParser {
    format : NumberFormat;

    text : string;

    input : _Stream;

    value : number;

    get symbols() : lib6.NumberSymbols {
        return this.format.symbols;
    }
    _normalized : core.DartStringBuffer;

    gotPositive : boolean;

    gotNegative : boolean;

    gotPositiveSuffix : boolean;

    gotNegativeSuffix : boolean;

    done : boolean;

    prefixesSkipped : boolean;

    scale : number;

    get _positivePrefix() : string {
        return this.format._positivePrefix;
    }
    get _negativePrefix() : string {
        return this.format._negativePrefix;
    }
    get _positiveSuffix() : string {
        return this.format._positiveSuffix;
    }
    get _negativeSuffix() : string {
        return this.format._negativeSuffix;
    }
    get _zero() : number {
        return NumberFormat._zero;
    }
    get _localeZero() : number {
        return this.format._localeZero;
    }
    constructor(format : NumberFormat,text : any) {
    }
    @defaultConstructor
    _NumberParser(format : NumberFormat,text : any) {
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
    get replacements() : core.DartMap<string,Function> {
        return this._replacements = ( this._replacements ) || ( this._initializeReplacements() );
    }
    _replacements : core.DartMap<string,Function>;

    _initializeReplacements() : core.DartMap<string,Function> {
        return new core.DartMap.literal([
            [this.symbols.DECIMAL_SEP,() =>  {
                return '.';
            }],
            [this.symbols.EXP_SYMBOL,() =>  {
                return 'E';
            }],
            [this.symbols.GROUP_SEP,this.handleSpace.bind(this)],
            [this.symbols.PERCENT,() =>  {
                this.scale = _NumberFormatParser._PERCENT_SCALE;
                return '';
            }],
            [this.symbols.PERMILL,() =>  {
                this.scale = _NumberFormatParser._PER_MILLE_SCALE;
                return '';
            }],
            [' ',this.handleSpace.bind(this)],
            [' ',this.handleSpace.bind(this)],
            ['+',() =>  {
                return '+';
            }],
            ['-',() =>  {
                return '-';
            }]]);
    }
    invalidFormat() {
         throw new core.FormatException(`Invalid number: ${this.input.contents}`);
    }
    handleSpace() {
        return this.groupingIsNotASpaceOrElseItIsSpaceFollowedByADigit ? '' : this.invalidFormat();
    }
    get groupingIsNotASpaceOrElseItIsSpaceFollowedByADigit() : boolean {
        if (this.symbols.GROUP_SEP != ' ' ) return true;
        let peeked = this.input.peek(new core.DartString(this.symbols.GROUP_SEP).length + 1);
        return this.asDigit(op(Op.INDEX,peeked,op(Op.MINUS,peeked.length,1))) != null;
    }
    asDigit(char : string) : number {
        let charCode = new core.DartString(char).codeUnitAt(0);
        let digitValue = charCode - this._localeZero;
        if (digitValue >= 0 && digitValue < 10) {
            return digitValue;
        }else {
            return null;
        }
    }
    checkPrefixes(_namedArguments? : {skip? : boolean}) : void {
        let {skip} = Object.assign({
            "skip" : false}, _namedArguments );
        var checkPrefix : (prefix : string) => boolean = (prefix : string) : boolean =>  {
            return new core.DartString(prefix).isNotEmpty && this.input.startsWith(prefix);
        };
        if (checkPrefix(this._positivePrefix)) this.gotPositive = true;
        if (checkPrefix(this._negativePrefix)) this.gotNegative = true;
        if (this.gotPositive && this.gotNegative) {
            if (new core.DartString(this._positivePrefix).length > new core.DartString(this._negativePrefix).length) {
                this.gotNegative = false;
            }else if (new core.DartString(this._negativePrefix).length > new core.DartString(this._positivePrefix).length) {
                this.gotPositive = false;
            }
        }
        if (skip) {
            if (this.gotPositive) this.input.read(new core.DartString(this._positivePrefix).length);
            if (this.gotNegative) this.input.read(new core.DartString(this._negativePrefix).length);
        }
    }
    checkSuffixes() : void {
        let remainder = this.input.rest();
        if (op(Op.EQUALS,remainder,this._positiveSuffix)) this.gotPositiveSuffix = true;
        if (op(Op.EQUALS,remainder,this._negativeSuffix)) this.gotNegativeSuffix = true;
    }
    processNonDigit() : void {
        let foundAnInterpretation = false;
        if (this.input.index == 0 && !this.prefixesSkipped) {
            this.prefixesSkipped = true;
            this.checkPrefixes({
                skip : true});
            foundAnInterpretation = true;
        }
        for(let key of this.replacements.keys) {
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
    parse() : number {
        if (this.text == this.symbols.NAN) return (0.0 / 0.0);
        if (this.text == `${this._positivePrefix}${this.symbols.INFINITY}${this._positiveSuffix}`) {
            return 1.0 / 0.0;
        }
        if (this.text == `${this._negativePrefix}${this.symbols.INFINITY}${this._negativeSuffix}`) {
            return -1.0 / 0.0;
        }
        this.checkPrefixes();
        let parsed = this.parseNumber(this.input);
        if (this.gotPositive && !this.gotPositiveSuffix) this.invalidNumber();
        if (this.gotNegative && !this.gotNegativeSuffix) this.invalidNumber();
        if (!this.input.atEnd()) this.invalidNumber();
        return parsed;
    }
    invalidNumber() : void {
         throw new core.FormatException(`Invalid Number: ${this.input.contents}`);
    }
    parseNumber(input : _Stream) : number {
        if (this.gotNegative) {
            this._normalized.write('-');
        }
        while (!this.done && !input.atEnd()){
            let digit : number = this.asDigit(input.peek());
            if (digit != null) {
                this._normalized.writeCharCode(this._zero + digit);
                input.next();
            }else {
                this.processNonDigit();
            }
            this.checkSuffixes();
        }
        let normalizedText = this._normalized.toString();
        let parsed : number = core.DartInt.parse(normalizedText,{
            onError : (message : any) =>  {
                return null;
            }});
        if (parsed == null) parsed = core.DartDouble.parse(normalizedText);
        return parsed / this.scale;
    }
}

@DartClass
export class _NumberFormatParser {
    private static __$_PATTERN_SEPARATOR;
    static get _PATTERN_SEPARATOR() { 
        if (this.__$_PATTERN_SEPARATOR===undefined) {
            this.__$_PATTERN_SEPARATOR = ';';
        }
        return this.__$_PATTERN_SEPARATOR;
    }

    private static __$_QUOTE;
    static get _QUOTE() { 
        if (this.__$_QUOTE===undefined) {
            this.__$_QUOTE = "'";
        }
        return this.__$_QUOTE;
    }

    private static __$_PATTERN_DIGIT;
    static get _PATTERN_DIGIT() { 
        if (this.__$_PATTERN_DIGIT===undefined) {
            this.__$_PATTERN_DIGIT = '#';
        }
        return this.__$_PATTERN_DIGIT;
    }

    private static __$_PATTERN_ZERO_DIGIT;
    static get _PATTERN_ZERO_DIGIT() { 
        if (this.__$_PATTERN_ZERO_DIGIT===undefined) {
            this.__$_PATTERN_ZERO_DIGIT = '0';
        }
        return this.__$_PATTERN_ZERO_DIGIT;
    }

    private static __$_PATTERN_GROUPING_SEPARATOR;
    static get _PATTERN_GROUPING_SEPARATOR() { 
        if (this.__$_PATTERN_GROUPING_SEPARATOR===undefined) {
            this.__$_PATTERN_GROUPING_SEPARATOR = ',';
        }
        return this.__$_PATTERN_GROUPING_SEPARATOR;
    }

    private static __$_PATTERN_DECIMAL_SEPARATOR;
    static get _PATTERN_DECIMAL_SEPARATOR() { 
        if (this.__$_PATTERN_DECIMAL_SEPARATOR===undefined) {
            this.__$_PATTERN_DECIMAL_SEPARATOR = '.';
        }
        return this.__$_PATTERN_DECIMAL_SEPARATOR;
    }

    private static __$_PATTERN_CURRENCY_SIGN;
    static get _PATTERN_CURRENCY_SIGN() { 
        if (this.__$_PATTERN_CURRENCY_SIGN===undefined) {
            this.__$_PATTERN_CURRENCY_SIGN = '¤';
        }
        return this.__$_PATTERN_CURRENCY_SIGN;
    }

    private static __$_PATTERN_PER_MILLE;
    static get _PATTERN_PER_MILLE() { 
        if (this.__$_PATTERN_PER_MILLE===undefined) {
            this.__$_PATTERN_PER_MILLE = '‰';
        }
        return this.__$_PATTERN_PER_MILLE;
    }

    private static __$_PER_MILLE_SCALE;
    static get _PER_MILLE_SCALE() { 
        if (this.__$_PER_MILLE_SCALE===undefined) {
            this.__$_PER_MILLE_SCALE = 1000;
        }
        return this.__$_PER_MILLE_SCALE;
    }

    private static __$_PATTERN_PERCENT;
    static get _PATTERN_PERCENT() { 
        if (this.__$_PATTERN_PERCENT===undefined) {
            this.__$_PATTERN_PERCENT = '%';
        }
        return this.__$_PATTERN_PERCENT;
    }

    private static __$_PERCENT_SCALE;
    static get _PERCENT_SCALE() { 
        if (this.__$_PERCENT_SCALE===undefined) {
            this.__$_PERCENT_SCALE = 100;
        }
        return this.__$_PERCENT_SCALE;
    }

    private static __$_PATTERN_EXPONENT;
    static get _PATTERN_EXPONENT() { 
        if (this.__$_PATTERN_EXPONENT===undefined) {
            this.__$_PATTERN_EXPONENT = 'E';
        }
        return this.__$_PATTERN_EXPONENT;
    }

    private static __$_PATTERN_PLUS;
    static get _PATTERN_PLUS() { 
        if (this.__$_PATTERN_PLUS===undefined) {
            this.__$_PATTERN_PLUS = '+';
        }
        return this.__$_PATTERN_PLUS;
    }

    format : NumberFormat;

    pattern : _StringIterator;

    currencySymbol : string;

    decimalDigits : number;

    constructor(format : NumberFormat,input : any,currencySymbol : string,decimalDigits : number) {
    }
    @defaultConstructor
    _NumberFormatParser(format : NumberFormat,input : any,currencySymbol : string,decimalDigits : number) {
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
    get symbols() : lib6.NumberSymbols {
        return this.format.symbols;
    }
    parse() : void {
        this.format._positivePrefix = this._parseAffix();
        let trunk = this._parseTrunk();
        this.format._positiveSuffix = this._parseAffix();
        if (this.pattern.current == _NumberFormatParser._PATTERN_SEPARATOR) {
            this.pattern.moveNext();
            this.format._negativePrefix = this._parseAffix();
            for(let each of _iterable(trunk)) {
                if (this.pattern.current != each && this.pattern.current != null) {
                    throw new core.FormatException("Positive and negative trunks must be the same");
                }
                this.pattern.moveNext();
            }
            this.format._negativeSuffix = this._parseAffix();
        }else {
            this.format._negativePrefix = this.format._negativePrefix + this.format._positivePrefix;
            this.format._negativeSuffix = this.format._positiveSuffix + this.format._negativeSuffix;
        }
    }
    inQuote : boolean;

    _parseAffix() : string {
        let affix = new core.DartStringBuffer();
        this.inQuote = false;
        while (this.parseCharacterAffix(affix) && this.pattern.moveNext())/* TODO (EmptyStatementImpl) : ; */;
        return affix.toString();
    }
    parseCharacterAffix(affix : core.DartStringBuffer) : boolean {
        let ch = this.pattern.current;
        if (ch == null) return false;
        if (ch == _NumberFormatParser._QUOTE) {
            if (this.pattern.peek == _NumberFormatParser._QUOTE) {
                this.pattern.moveNext();
                affix.write(_NumberFormatParser._QUOTE);
            }else {
                this.inQuote = !this.inQuote;
            }
            return true;
        }
        if (this.inQuote) {
            affix.write(ch);
        }else {
            switch (ch) {
                case _NumberFormatParser._PATTERN_DIGIT:
                case _NumberFormatParser._PATTERN_ZERO_DIGIT:
                case _NumberFormatParser._PATTERN_GROUPING_SEPARATOR:
                case _NumberFormatParser._PATTERN_DECIMAL_SEPARATOR:
                case _NumberFormatParser._PATTERN_SEPARATOR:
                    return false;
                case _NumberFormatParser._PATTERN_CURRENCY_SIGN:
                    affix.write(this.currencySymbol);
                    break;
                case _NumberFormatParser._PATTERN_PERCENT:
                    if (this.format._multiplier != 1 && this.format._multiplier != _NumberFormatParser._PERCENT_SCALE) {
                        throw new core.FormatException('Too many percent/permill');
                    }
                    this.format._multiplier = _NumberFormatParser._PERCENT_SCALE;
                    affix.write(this.symbols.PERCENT);
                    break;
                case _NumberFormatParser._PATTERN_PER_MILLE:
                    if (this.format._multiplier != 1 && this.format._multiplier != _NumberFormatParser._PER_MILLE_SCALE) {
                        throw new core.FormatException('Too many percent/permill');
                    }
                    this.format._multiplier = _NumberFormatParser._PER_MILLE_SCALE;
                    affix.write(this.symbols.PERMILL);
                    break;
                default:
                    affix.write(ch);
            }
        }
        return true;
    }
    decimalPos;

    digitLeftCount;

    zeroDigitCount;

    digitRightCount;

    groupingCount;

    _parseTrunk() : string {
        let loop = true;
        let trunk = new core.DartStringBuffer();
        while (this.pattern.current != null && loop){
            loop = this.parseTrunkCharacter(trunk);
        }
        if (op(Op.EQUALS,this.zeroDigitCount,0) && op(Op.GT,this.digitLeftCount,0) && op(Op.GEQ,this.decimalPos,0)) {
            let n = op(Op.EQUALS,this.decimalPos,0) ? 1 : this.decimalPos;
            this.digitRightCount = op(Op.MINUS,this.digitLeftCount,n);
            this.digitLeftCount = op(Op.MINUS,n,1);
            this.zeroDigitCount = 1;
        }
        if (op(Op.LT,this.decimalPos,0) && op(Op.GT,this.digitRightCount,0) || op(Op.GEQ,this.decimalPos,0) && (op(Op.LT,this.decimalPos,this.digitLeftCount) || op(Op.GT,this.decimalPos,op(Op.PLUS,this.digitLeftCount,this.zeroDigitCount))) || op(Op.EQUALS,this.groupingCount,0)) {
            throw new core.FormatException(`Malformed pattern "${this.pattern.input}"`);
        }
        let totalDigits = op(Op.PLUS,op(Op.PLUS,this.digitLeftCount,this.zeroDigitCount),this.digitRightCount);
        this.format.maximumFractionDigits = op(Op.GEQ,this.decimalPos,0) ? op(Op.MINUS,totalDigits,this.decimalPos) : 0;
        if (op(Op.GEQ,this.decimalPos,0)) {
            this.format.minimumFractionDigits = op(Op.MINUS,op(Op.PLUS,this.digitLeftCount,this.zeroDigitCount),this.decimalPos);
            if (this.format.minimumFractionDigits < 0) {
                this.format.minimumFractionDigits = 0;
            }
        }
        let effectiveDecimalPos = op(Op.GEQ,this.decimalPos,0) ? this.decimalPos : totalDigits;
        this.format.minimumIntegerDigits = op(Op.MINUS,effectiveDecimalPos,this.digitLeftCount);
        if (this.format._useExponentialNotation) {
            this.format.maximumIntegerDigits = op(Op.PLUS,this.digitLeftCount,this.format.minimumIntegerDigits);
            if (this.format.maximumFractionDigits == 0 && this.format.minimumIntegerDigits == 0) {
                this.format.minimumIntegerDigits = 1;
            }
        }
        this.format._finalGroupingSize = math.max(0,this.groupingCount);
        if (!this.format._groupingSizeSetExplicitly) {
            this.format._groupingSize = this.format._finalGroupingSize;
        }
        this.format._decimalSeparatorAlwaysShown = op(Op.EQUALS,this.decimalPos,0) || op(Op.EQUALS,this.decimalPos,totalDigits);
        return trunk.toString();
    }
    parseTrunkCharacter(trunk : any) : boolean {
        let ch = this.pattern.current;
        switch (ch) {
            case _NumberFormatParser._PATTERN_DIGIT:
                if (op(Op.GT,this.zeroDigitCount,0)) {
                    this.digitRightCount++;
                }else {
                    this.digitLeftCount++;
                }
                if (op(Op.GEQ,this.groupingCount,0) && op(Op.LT,this.decimalPos,0)) {
                    this.groupingCount++;
                }
                break;
            case _NumberFormatParser._PATTERN_ZERO_DIGIT:
                if (op(Op.GT,this.digitRightCount,0)) {
                    throw new core.FormatException('Unexpected "0" in pattern "' + this.pattern.input + '"');
                }
                this.zeroDigitCount++;
                if (op(Op.GEQ,this.groupingCount,0) && op(Op.LT,this.decimalPos,0)) {
                    this.groupingCount++;
                }
                break;
            case _NumberFormatParser._PATTERN_GROUPING_SEPARATOR:
                if (op(Op.GT,this.groupingCount,0)) {
                    this.format._groupingSizeSetExplicitly = true;
                    this.format._groupingSize = this.groupingCount;
                }
                this.groupingCount = 0;
                break;
            case _NumberFormatParser._PATTERN_DECIMAL_SEPARATOR:
                if (op(Op.GEQ,this.decimalPos,0)) {
                    throw new core.FormatException(`Multiple decimal separators in pattern "${this.pattern}"`);
                }
                this.decimalPos = op(Op.PLUS,op(Op.PLUS,this.digitLeftCount,this.zeroDigitCount),this.digitRightCount);
                break;
            case _NumberFormatParser._PATTERN_EXPONENT:
                trunk.write(ch);
                if (this.format._useExponentialNotation) {
                    throw new core.FormatException(`Multiple exponential symbols in pattern "${this.pattern}"`);
                }
                this.format._useExponentialNotation = true;
                this.format.minimumExponentDigits = 0;
                this.pattern.moveNext();
                let nextChar = this.pattern.current;
                if (nextChar == _NumberFormatParser._PATTERN_PLUS) {
                    trunk.write(this.pattern.current);
                    this.pattern.moveNext();
                    this.format._useSignForPositiveExponent = true;
                }
                while (this.pattern.current == _NumberFormatParser._PATTERN_ZERO_DIGIT){
                    trunk.write(this.pattern.current);
                    this.pattern.moveNext();
                    this.format.minimumExponentDigits++;
                }
                if (op(Op.LT,(op(Op.PLUS,this.digitLeftCount,this.zeroDigitCount)),1) || this.format.minimumExponentDigits < 1) {
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
}

@DartClass
export class _StringIterable extends core.DartIterableBase<string> {
    iterator : core.DartIterator<string>;

    constructor(s : string) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _StringIterable(s : string) {
        this.iterator = _iterator(s);
    }
}

@DartClass
@Implements(core.DartIterator)
export class _StringIterator implements core.DartIterator<string> {
    next(value?: any): IteratorResult<string> {
        return {
            done:!this.moveNext(),
            value:this.current
        }
    }
    input : string;

    nextIndex : number;

    _current : string;

    constructor(input : any) {
    }
    @defaultConstructor
    _StringIterator(input : any) {
        this.nextIndex = 0;
        this._current = null;
        this.input = _StringIterator._validate(input);
    }
    get current() : string {
        return this._current;
    }
    moveNext() : boolean {
        if (this.nextIndex >= new core.DartString(this.input).length) {
            this._current = null;
            return false;
        }
        this._current = this.input[this.nextIndex++];
        return true;
    }
    get peek() : string {
        return this.nextIndex >= new core.DartString(this.input).length ? null : this.input[this.nextIndex];
    }
    get iterator() : core.DartIterator<string> {
        return this;
    }
    static _validate(input : any) : string {
        if (isNot(input, "string")) throw new core.ArgumentError(input);
        return input;
    }
}

@DartClass
export class MicroMoney {
    constructor(micros : any) {
    }
    @defaultFactory
    static $MicroMoney(micros : any) : MicroMoney {
        return new _MicroMoney(micros);
    }
}

@DartClass
@Implements(MicroMoney)
export class _MicroMoney implements MicroMoney {
    _micros;

    constructor(_micros : any) {
    }
    @defaultConstructor
    _MicroMoney(_micros : any) {
        this._micros = _micros;
    }
    private static __$_multiplier;
    static get _multiplier() { 
        if (this.__$_multiplier===undefined) {
            this.__$_multiplier = 1000000;
        }
        return this.__$_multiplier;
    }

    get _integerPart() {
        return op(Op.QUOTIENT,this._micros,_MicroMoney._multiplier);
    }
    get _fractionPart() : number {
        return (op(Op.MINUS,this,this._integerPart))._micros.toInt().abs();
    }
    get isNegative() : boolean {
        return this._micros.isNegative;
    }
    abs() : _MicroMoney {
        return this.isNegative ? new _MicroMoney(this._micros.abs()) : this;
    }
    [OperatorMethods.MINUS](other : any) : _MicroMoney {
        if (is(other, _MicroMoney)) return new _MicroMoney(op(Op.MINUS,this._micros,other._micros));
        return new _MicroMoney(op(Op.MINUS,this._micros,(op(Op.TIMES,other,_MicroMoney._multiplier))));
    }
    [OperatorMethods.PLUS](other : any) : _MicroMoney {
        if (is(other, _MicroMoney)) return new _MicroMoney(op(Op.PLUS,this._micros,other._micros));
        return new _MicroMoney(op(Op.PLUS,this._micros,(op(Op.TIMES,other,_MicroMoney._multiplier))));
    }
    [OperatorMethods.QUOTIENT](divisor : any) : _MicroMoney {
        if (isNot(divisor, "number")) {
            throw new core.ArgumentError.value(divisor,'divisor','_MicroMoney ~/ only supports int arguments.');
        }
        return new _MicroMoney(op(Op.TIMES,(op(Op.QUOTIENT,this._integerPart,divisor)),_MicroMoney._multiplier));
    }
    [OperatorMethods.MULTIPLY](other : any) : _MicroMoney {
        if (isNot(other, "number")) {
            throw new core.ArgumentError.value(other,'other','_MicroMoney * only supports int arguments.');
        }
        return new _MicroMoney(op(Op.PLUS,op(Op.TIMES,(op(Op.TIMES,this._integerPart,other)),_MicroMoney._multiplier),(this._fractionPart * other)));
    }
    remainder(other : any) : _MicroMoney {
        if (isNot(other, "number")) {
            throw new core.ArgumentError.value(other,'other','_MicroMoney.remainder only supports int arguments.');
        }
        return new _MicroMoney(this._micros.remainder(other * _MicroMoney._multiplier));
    }
    toDouble() : double {
        return op(Op.DIVIDE,this._micros.toDouble(),_MicroMoney._multiplier);
    }
    toInt() : number {
        return this._integerPart.toInt();
    }
    toString() : string {
        let beforeDecimal = this._integerPart.toString();
        let decimalPart = '';
        let fractionPart = this._fractionPart;
        if (fractionPart != 0) {
            decimalPart = '.' + new core.DartInt(fractionPart).toString();
        }
        return `${beforeDecimal}${decimalPart}`;
    }
}

@DartClass
export class _CompactStyleWithNegative extends _CompactStyleBase {
    constructor(positiveStyle : _CompactStyle,negativeStyle : _CompactStyle) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _CompactStyleWithNegative(positiveStyle : _CompactStyle,negativeStyle : _CompactStyle) {
        this.positiveStyle = positiveStyle;
        this.negativeStyle = negativeStyle;
    }
    positiveStyle : _CompactStyle;

    negativeStyle : _CompactStyle;

    styleForSign(number : any) : _CompactStyle {
        return op(Op.LT,number,0) ? this.negativeStyle : this.positiveStyle;
    }
    get totalDigits() : number {
        return this.positiveStyle.totalDigits;
    }
    get divisor() : number {
        return this.positiveStyle.divisor;
    }
    get allStyles() {
        return new core.DartList.literal(this.positiveStyle,this.negativeStyle);
    }
}

@DartClass
export class _CompactStyle extends _CompactStyleBase {
    constructor(_namedArguments? : {pattern? : string,requiredDigits? : number,divisor? : number,expectedDigits? : number,prefix? : string,suffix? : string}) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _CompactStyle(_namedArguments? : {pattern? : string,requiredDigits? : number,divisor? : number,expectedDigits? : number,prefix? : string,suffix? : string}) {
        let {pattern,requiredDigits,divisor,expectedDigits,prefix,suffix} = Object.assign({
            "requiredDigits" : 0,
            "divisor" : 1,
            "expectedDigits" : 1,
            "prefix" : '',
            "suffix" : ''}, _namedArguments );
        this.pattern = pattern;
        this.requiredDigits = requiredDigits;
        this.divisor = divisor;
        this.expectedDigits = expectedDigits;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    pattern : string;

    requiredDigits : number;

    divisor : number;

    expectedDigits : number;

    prefix : string;

    suffix : string;

    get totalDigits() {
        return this.requiredDigits + this.expectedDigits - 1;
    }
    get isFallback() : boolean {
        return this.pattern == null || this.pattern == '0';
    }
    get printsAsIs() : boolean {
        return this.isFallback || new core.DartString(new core.DartString(this.pattern).replaceAll(new core.DartRegExp('[0 ¤]'),'')).isEmpty;
    }
    styleForSign(number : any) : _CompactStyle {
        return this;
    }
    get allStyles() {
        return new core.DartList.literal(this);
    }
}

@DartClass
export class _CompactNumberFormat extends NumberFormat {
    static _forDecimal(symbols : lib6.NumberSymbols) : string {
        return symbols.DECIMAL_PATTERN;
    }
    _patterns : core.DartMap<number,string>;

    _styles : core.DartList<_CompactStyleBase>;

    constructor(_namedArguments? : {locale? : string,formatType? : _CompactFormatType,name? : string,currencySymbol? : string,getPattern? : (symbols : lib6.NumberSymbols) => string,computeCurrencySymbol? : (NumberFormat : any) => string,decimalDigits? : number,isForCurrency? : boolean}) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _CompactNumberFormat(_namedArguments? : {locale? : string,formatType? : _CompactFormatType,name? : string,currencySymbol? : string,getPattern? : (symbols : lib6.NumberSymbols) => string,computeCurrencySymbol? : (NumberFormat : any) => string,decimalDigits? : number,isForCurrency? : boolean}) {
        let {locale,formatType,name,currencySymbol,getPattern,computeCurrencySymbol,decimalDigits,isForCurrency} = Object.assign({
            "getPattern" : _CompactNumberFormat._forDecimal.bind(this),
            "isForCurrency" : false}, _namedArguments );
        this._styles = new core.DartList.literal();
        this._regex = new core.DartRegExp('([^0]*)(0+)(.*)');
        this._justZeros = new core.DartRegExp('^0*$');
        super._forPattern(locale,getPattern,{
            name : name,currencySymbol : currencySymbol,computeCurrencySymbol : computeCurrencySymbol,decimalDigits : decimalDigits,isForCurrency : isForCurrency});
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
        this._patterns.forEach((impliedDigits : number,pattern : string) =>  {
            if (new core.DartString(pattern).contains(";")) {
                let patterns = new core.DartString(pattern).split(";");
                this._styles.add(new _CompactStyleWithNegative(this._createStyle(patterns.first,impliedDigits),this._createStyle(patterns.last,impliedDigits)));
            }else {
                this._styles.add(this._createStyle(pattern,impliedDigits));
            }
        });
        this._styles = this._styles.reversed.toList();
        this._styles.add(new _CompactStyle());
    }
    _regex;

    _justZeros;

    _hasNonZeroContent(pattern : string) : boolean {
        return !this._justZeros.hasMatch(pattern);
    }
    _createStyle(pattern : string,impliedDigits : number) : _CompactStyle {
        let match = this._regex.firstMatch(pattern);
        let integerDigits = match.group(2).length;
        let prefix = match.group(1);
        let suffix = match.group(3);
        let divisor = 1;
        if (this._hasNonZeroContent(pattern)) {
            divisor = math.pow(10,impliedDigits - integerDigits + 1);
        }
        return new _CompactStyle({
            pattern : pattern,requiredDigits : impliedDigits,expectedDigits : integerDigits,prefix : prefix,suffix : suffix,divisor : divisor});
    }
    _style : _CompactStyle;

    format(number : any) : string {
        this._style = this._styleFor(number);
        let divisor = this._style.printsAsIs ? 1 : this._style.divisor;
        let numberToFormat = this._divide(number,divisor);
        let formatted = super.format(numberToFormat);
        let prefix = this._style.prefix;
        let suffix = this._style.suffix;
        if (this._isForCurrency && !this._style.isFallback) {
            formatted = new core.DartString(new core.DartString(formatted).replaceFirst(this.currencySymbol,'')).trim();
            prefix = new core.DartString(prefix).replaceFirst('¤',this.currencySymbol);
            suffix = new core.DartString(suffix).replaceFirst('¤',this.currencySymbol);
        }
        let withExtras = `${prefix}${formatted}${suffix}`;
        this._style = null;
        return withExtras;
    }
    _fractionDigitsAfter(remainingSignificantDigits : number) : number {
        let newFractionDigits = super._fractionDigitsAfter(remainingSignificantDigits);
        if (!this._isForCurrency || !this._style.isFallback) return newFractionDigits;
        if (newFractionDigits > 0 && newFractionDigits < this.decimalDigits) {
            return this.decimalDigits;
        }else {
            return math.min(newFractionDigits,this.decimalDigits);
        }
    }
    _divide(numerator : any,denominator : number) : number {
        if (is(numerator, "number")) {
            return numerator / denominator;
        }
        let divided = op(Op.QUOTIENT,numerator,denominator);
        let integerPart = divided.toInt();
        if (divided != integerPart) {
            throw new core.FormatException("Number too big to use with compact format",numerator);
        }
        let remainder = numerator.remainder(denominator).toInt();
        let originalFraction = op(Op.MINUS,numerator,(op(Op.QUOTIENT,numerator,1)));
        let fraction = op(Op.EQUALS,originalFraction,0) ? 0 : op(Op.DIVIDE,originalFraction,denominator);
        return op(Op.PLUS,op(Op.PLUS,integerPart,(op(Op.DIVIDE,remainder,denominator))),fraction);
    }
    _styleFor(number : any) : _CompactStyle {
        let originalLength = NumberFormat.numberOfIntegerDigits(number);
        let additionalDigits = originalLength - this.significantDigits;
        let digitLength = originalLength;
        if (additionalDigits > 0) {
            let divisor = math.pow(10,additionalDigits);
            let rounded = op(Op.TIMES,(op(Op.DIVIDE,number.toDouble(),divisor)).round(),divisor);
            digitLength = NumberFormat.numberOfIntegerDigits(rounded);
        }
        for(let style of this._styles) {
            if (digitLength > style.totalDigits) {
                return style.styleForSign(number);
            }
        }
        throw new core.FormatException("No compact style found for number. This should not happen",number);
    }
    get _stylesForSearching() : core.DartIterable<_CompactStyle> {
        return this._styles.reversed.expand((x : any) =>  {
            return x.allStyles;
        });
    }
    parse(text : string) : number {
        for(let style of this._stylesForSearching) {
            if (new core.DartString(text).startsWith(style.prefix) && new core.DartString(text).endsWith(style.suffix)) {
                let numberText = new core.DartString(text).substring(new core.DartString(style.prefix).length,new core.DartString(text).length - new core.DartString(style.suffix).length);
                let number = this._tryParsing(numberText);
                if (number != null) {
                    return number * style.divisor;
                }
            }
        }
        throw new core.FormatException(`Cannot parse compact number in locale '${this.locale}'`,text);
    }
    _tryParsing(text : string) : number {
        try {
            return super.parse(text);
        } catch (__error__) {

            if (is(__error__,core.FormatException)){
                return null;
            }
        }
    }
    get compactSymbols() : lib6.CompactNumberSymbols {
        return lib8.properties.compactNumberSymbols.get(this._locale);
    }
}

@DartClass
export class _DateFormatLiteralField extends _DateFormatField {
    constructor(pattern : any,parent : any) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _DateFormatLiteralField(pattern : any,parent : any) {
        super._DateFormatField(pattern,parent);
    }
    parse(input : _Stream,dateFields : _DateBuilder) {
        this.parseLiteral(input);
    }
    parseLoose(input : _Stream,dateFields : _DateBuilder) {
        return this.parseLiteralLoose(input);
    }
}

@DartClass
export class _DateFormatQuotedField extends _DateFormatField {
    _fullPattern : string;

    fullPattern() : string {
        return this._fullPattern;
    }
    constructor(pattern : any,parent : any) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _DateFormatQuotedField(pattern : any,parent : any) {
        super._DateFormatField(_DateFormatQuotedField._patchQuotes(pattern),parent);
        this._fullPattern = pattern;
    }
    parse(input : _Stream,dateFields : _DateBuilder) {
        this.parseLiteral(input);
    }
    parseLoose(input : _Stream,dateFields : _DateBuilder) {
        return this.parseLiteralLoose(input);
    }
    private static __$_twoEscapedQuotes;
    static get _twoEscapedQuotes() { 
        if (this.__$_twoEscapedQuotes===undefined) {
            this.__$_twoEscapedQuotes = new core.DartRegExp("''");
        }
        return this.__$_twoEscapedQuotes;
    }
    static set _twoEscapedQuotes(__$value : any)  { 
        this.__$_twoEscapedQuotes = __$value;
    }

    static _patchQuotes(pattern : string) : string {
        if (pattern == "''") {
            return "'";
        }else {
            return new core.DartString(new core.DartString(pattern).substring(1,new core.DartString(pattern).length - 1)).replaceAll(_DateFormatQuotedField._twoEscapedQuotes,"'");
        }
    }
}

@DartClass
export class _DateFormatPatternField extends _DateFormatField {
    constructor(pattern : any,parent : any) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _DateFormatPatternField(pattern : any,parent : any) {
        super._DateFormatField(pattern,parent);
    }
    format(date : core.DartDateTime) : string {
        return this.formatField(date);
    }
    parse(input : _Stream,dateFields : _DateBuilder) : void {
        this.parseField(input,dateFields);
    }
    parseLoose(input : _Stream,dateFields : _DateBuilder) : void {
        new _LoosePatternField(this.pattern,this.parent).parse(input,dateFields);
    }
    _forDate : boolean;

    get forDate() : boolean {
        return this._forDate = ( this._forDate ) || ( new core.DartString('cdDEGLMQvyZz').contains(this.pattern[0]) );
    }
    parseField(input : _Stream,builder : _DateBuilder) : void {
        try {
            switch (this.pattern[0]) {
                case 'a':
                    this.parseAmPm(input,builder);
                    break;
                case 'c':
                    this.parseStandaloneDay(input);
                    break;
                case 'd':
                    this.handleNumericField(input,builder.setDay.bind(builder));
                    break;
                case 'D':
                    this.handleNumericField(input,builder.setDay.bind(builder));
                    break;
                case 'E':
                    this.parseDayOfWeek(input);
                    break;
                case 'G':
                    this.parseEra(input);
                    break;
                case 'h':
                    this.parse1To12Hours(input,builder);
                    break;
                case 'H':
                    this.handleNumericField(input,builder.setHour.bind(builder));
                    break;
                case 'K':
                    this.handleNumericField(input,builder.setHour.bind(builder));
                    break;
                case 'k':
                    this.handleNumericField(input,builder.setHour.bind(builder),-1);
                    break;
                case 'L':
                    this.parseStandaloneMonth(input,builder);
                    break;
                case 'M':
                    this.parseMonth(input,builder);
                    break;
                case 'm':
                    this.handleNumericField(input,builder.setMinute.bind(builder));
                    break;
                case 'Q':
                    break;
                case 'S':
                    this.handleNumericField(input,builder.setFractionalSecond.bind(builder));
                    break;
                case 's':
                    this.handleNumericField(input,builder.setSecond.bind(builder));
                    break;
                case 'v':
                    break;
                case 'y':
                    this.handleNumericField(input,builder.setYear.bind(builder));
                    break;
                case 'z':
                    break;
                case 'Z':
                    break;
                default:
                    return;
            }
        } catch (__error__) {

            {
                let e = __error__;
                this.throwFormatException(input);
            }
        }
    }
    formatField(date : core.DartDateTime) : string {
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
    get symbols() : lib10.DateSymbols {
        return this.parent.dateSymbols;
    }
    formatEra(date : core.DartDateTime) {
        let era = date.year > 0 ? 1 : 0;
        return this.width >= 4 ? this.symbols.ERANAMES[era] : this.symbols.ERAS[era];
    }
    formatYear(date : core.DartDateTime) {
        let year = date.year;
        if (year < 0) {
            year = -year;
        }
        return this.width == 2 ? this.padTo(2,year % 100) : this.padTo(this.width,year);
    }
    handleNumericField(input : _Stream,setter : Function,offset? : number) : void {
        offset = offset || 0;
        let result = input.nextInteger({
            digitMatcher : this.parent.digitMatcher,zeroDigit : this.parent.localeZeroCodeUnit});
        if (result == null) this.throwFormatException(input);
        setter(result + offset);
    }
    parseEnumeratedString(input : _Stream,possibilities : core.DartList<any>) : number {
        let results = new _Stream(possibilities).findIndexes((each : any) =>  {
            return op(Op.EQUALS,input.peek(each.length),each);
        });
        if (results.isEmpty) this.throwFormatException(input);
        results.sort((a : any,b : any) =>  {
            return possibilities[a].length.compareTo(possibilities[b].length);
        });
        let longestResult = results.last;
        input.read(possibilities[longestResult].length);
        return longestResult;
    }
    formatMonth(date : core.DartDateTime) : string {
        switch (this.width) {
            case 5:
                return this.symbols.NARROWMONTHS[date.month - 1];
            case 4:
                return this.symbols.MONTHS[date.month - 1];
            case 3:
                return this.symbols.SHORTMONTHS[date.month - 1];
            default:
                return this.padTo(this.width,date.month);
        }
    }
    parseMonth(input : any,dateFields : any) : void {
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
                return this.handleNumericField(input,dateFields.setMonth);
        }
        dateFields.month = this.parseEnumeratedString(input,possibilities) + 1;
    }
    format24Hours(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.hour);
    }
    formatFractionalSeconds(date : core.DartDateTime) : string {
        let basic = this.padTo(3,date.millisecond);
        if (this.width - 3 > 0) {
            let extra = this.padTo(this.width - 3,0);
            return basic + extra;
        }else {
            return basic;
        }
    }
    formatAmPm(date : core.DartDateTime) : string {
        let hours = date.hour;
        let index = (hours >= 12) && (hours < 24) ? 1 : 0;
        let ampm = this.symbols.AMPMS;
        return ampm[index];
    }
    parseAmPm(input : any,dateFields : any) : void {
        let ampm = this.parseEnumeratedString(input,this.symbols.AMPMS);
        if (ampm == 1) dateFields.pm = true;
    }
    format1To12Hours(date : core.DartDateTime) : string {
        let hours = date.hour;
        if (date.hour > 12) hours = hours - 12;
        if (hours == 0) hours = 12;
        return this.padTo(this.width,hours);
    }
    parse1To12Hours(input : _Stream,dateFields : _DateBuilder) : void {
        this.handleNumericField(input,dateFields.setHour.bind(dateFields));
        if (dateFields.hour == 12) dateFields.hour = 0;
    }
    format0To11Hours(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.hour % 12);
    }
    format0To23Hours(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.hour);
    }
    formatStandaloneDay(date : core.DartDateTime) : string {
        switch (this.width) {
            case 5:
                return this.symbols.STANDALONENARROWWEEKDAYS[date.weekday % 7];
            case 4:
                return this.symbols.STANDALONEWEEKDAYS[date.weekday % 7];
            case 3:
                return this.symbols.STANDALONESHORTWEEKDAYS[date.weekday % 7];
            default:
                return this.padTo(1,date.day);
        }
    }
    parseStandaloneDay(input : _Stream) : void {
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
                return this.handleNumericField(input,(x : any) =>  {
                    return x;
                });
        }
        this.parseEnumeratedString(input,possibilities);
    }
    formatStandaloneMonth(date : core.DartDateTime) : string {
        switch (this.width) {
            case 5:
                return this.symbols.STANDALONENARROWMONTHS[date.month - 1];
            case 4:
                return this.symbols.STANDALONEMONTHS[date.month - 1];
            case 3:
                return this.symbols.STANDALONESHORTMONTHS[date.month - 1];
            default:
                return this.padTo(this.width,date.month);
        }
    }
    parseStandaloneMonth(input : any,dateFields : any) : void {
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
                return this.handleNumericField(input,dateFields.setMonth);
        }
        dateFields.month = this.parseEnumeratedString(input,possibilities) + 1;
    }
    formatQuarter(date : core.DartDateTime) : string {
        let quarter = new core.DartDouble(((date.month - 1) / 3)).truncate();
        switch (this.width) {
            case 4:
                return this.symbols.QUARTERS[quarter];
            case 3:
                return this.symbols.SHORTQUARTERS[quarter];
            default:
                return this.padTo(this.width,quarter + 1);
        }
    }
    formatDayOfMonth(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.day);
    }
    formatDayOfYear(date : core.DartDateTime) : string {
        return this.padTo(this.width,_dayOfYear(date.month,date.day,_isLeapYear(date)));
    }
    formatDayOfWeek(date : core.DartDateTime) : string {
        return (this.width >= 4 ? this.symbols.WEEKDAYS : this.symbols.SHORTWEEKDAYS)[(date.weekday) % 7];
    }
    parseDayOfWeek(input : _Stream) : void {
        let possibilities = this.width >= 4 ? this.symbols.WEEKDAYS : this.symbols.SHORTWEEKDAYS;
        this.parseEnumeratedString(input,possibilities);
    }
    parseEra(input : _Stream) : void {
        let possibilities = this.width >= 4 ? this.symbols.ERANAMES : this.symbols.ERAS;
        this.parseEnumeratedString(input,possibilities);
    }
    formatMinutes(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.minute);
    }
    formatSeconds(date : core.DartDateTime) : string {
        return this.padTo(this.width,date.second);
    }
    formatTimeZoneId(date : core.DartDateTime) : string {
        throw 'new core.UnimplementedError()';
    }
    formatTimeZone(date : core.DartDateTime) : string {
        throw 'new core.UnimplementedError()';
    }
    formatTimeZoneRFC(date : core.DartDateTime) : string {
        throw 'new core.UnimplementedError()';
    }
    padTo(width : number,toBePrinted : any) : string {
        return this.parent._localizeDigits(new core.DartString(`${toBePrinted}`).padLeft(width,'0'));
    }
}

@DartClass
export class _LoosePatternField extends _DateFormatPatternField {
    constructor(pattern : string,parent : any) {
        // @ts-ignore
        super();
    }
    @defaultConstructor
    _LoosePatternField(pattern : string,parent : any) {
        super._DateFormatPatternField(pattern,parent);
    }
    parseEnumeratedString(input : _Stream,possibilities : core.DartList<any>) : number {
        let lowercasePossibilities = possibilities.map((x : any) =>  {
            return x.toLowerCase();
        }).toList();
        try {
            return super.parseEnumeratedString(input,lowercasePossibilities);
        } catch (__error__) {

            if (is(__error__,core.FormatException)){
                return -1;
            }
        }
    }
    parseMonth(input : any,dateFields : any) : void {
        if (this.width <= 2) {
            this.handleNumericField(input,dateFields.setMonth);
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.MONTHS,this.symbols.SHORTMONTHS);
        for(let monthNames of possibilities) {
            let month = this.parseEnumeratedString(input,monthNames);
            if (month != -1) {
                dateFields.month = month + 1;
                return;
            }
        }
        this.throwFormatException(input);
    }
    parseStandaloneDay(input : any) : void {
        if (this.width <= 2) {
            this.handleNumericField(input,(x : any) =>  {
                return x;
            });
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.STANDALONEWEEKDAYS,this.symbols.STANDALONESHORTWEEKDAYS);
        for(let dayNames of possibilities) {
            let day = this.parseEnumeratedString(input,dayNames);
            if (day != -1) {
                return;
            }
        }
    }
    parseStandaloneMonth(input : any,dateFields : any) : void {
        if (this.width <= 2) {
            this.handleNumericField(input,dateFields.setMonth);
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.STANDALONEMONTHS,this.symbols.STANDALONESHORTMONTHS);
        for(let monthNames of possibilities) {
            let month = this.parseEnumeratedString(input,monthNames);
            if (month != -1) {
                dateFields.month = month + 1;
                return;
            }
        }
        this.throwFormatException(input);
    }
    parseDayOfWeek(input : _Stream) : void {
        if (this.width <= 2) {
            this.handleNumericField(input,(x : any) =>  {
                return x;
            });
            return;
        }
        let possibilities = new core.DartList.literal(this.symbols.WEEKDAYS,this.symbols.SHORTWEEKDAYS);
        for(let dayNames of possibilities) {
            let day = this.parseEnumeratedString(input,dayNames);
            if (day != -1) {
                return;
            }
        }
    }
}

export class properties {
}
