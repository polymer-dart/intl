var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UninitializedLocaleData_1;
/** Library asset:intl/lib/src/intl_helpers.dart */
import { is } from "@dart2ts/dart/_common";
import { defaultConstructor, DartClass, Implements, OperatorMethods, Abstract } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as lib3 from "./../intl";
export var initializeInternalMessageLookup = (lookupFunction) => {
    if (is(properties.messageLookup, UninitializedLocaleData)) {
        properties.messageLookup._reportErrors();
        properties.messageLookup = lookupFunction();
    }
};
export var computeMessageName = (name, text, meaning) => {
    if (name != null && name != "")
        return name;
    return meaning == null ? text : `${text}_${meaning}`;
};
let MessageLookup = class MessageLookup {
    constructor() {
    }
    lookupMessage(message_str, locale, name, args, meaning, _namedArguments) { throw 'abstract'; }
    addLocale(localeName, findLocale) { throw 'abstract'; }
    MessageLookup() {
    }
};
__decorate([
    Abstract
], MessageLookup.prototype, "lookupMessage", null);
__decorate([
    Abstract
], MessageLookup.prototype, "addLocale", null);
__decorate([
    defaultConstructor
], MessageLookup.prototype, "MessageLookup", null);
MessageLookup = __decorate([
    DartClass
], MessageLookup);
export { MessageLookup };
let UninitializedLocaleData = UninitializedLocaleData_1 = class UninitializedLocaleData {
    constructor(message, fallbackData) {
    }
    MessageLookup() {
    }
    UninitializedLocaleData(message, fallbackData) {
        this._badMessages = new core.DartList.literal();
        this.message = message;
        this.fallbackData = fallbackData;
    }
    [OperatorMethods.INDEX](key) {
        return (key == 'en_US') ? this.fallbackData : this._throwException();
    }
    static get throwOnFallback() {
        if (this.__$throwOnFallback === undefined) {
            this.__$throwOnFallback = false;
        }
        return this.__$throwOnFallback;
    }
    static set throwOnFallback(__$value) {
        this.__$throwOnFallback = __$value;
    }
    _reportErrors() {
        if (UninitializedLocaleData_1.throwOnFallback && this._badMessages.length > 0) {
            throw new core.StateError("The following messages were called before locale initialization:" + ` ${this._uninitializedMessages}`);
        }
    }
    get _uninitializedMessages() {
        return (((_) => {
            {
                _.sort();
                return _;
            }
        })(this._badMessages.toSet().toList())).join("\n    ");
    }
    lookupMessage(message_str, locale, name, args, meaning, _namedArguments) {
        let { ifAbsent } = Object.assign({}, _namedArguments);
        if (UninitializedLocaleData_1.throwOnFallback) {
            this._badMessages.add((name || message_str));
        }
        return message_str;
    }
    findLocale(locale) {
        return (locale || lib3.Intl.getCurrentLocale());
    }
    get keys() {
        this._throwException();
        return null;
    }
    containsKey(key) {
        return (key == 'en_US') ? true : this._throwException();
    }
    _throwException() {
        throw new LocaleDataException("Locale data has not been initialized" + `, call ${this.message}.`);
    }
    addLocale(localeName, findLocale) {
        return this._throwException();
    }
};
__decorate([
    Abstract
], UninitializedLocaleData.prototype, "MessageLookup", null);
__decorate([
    defaultConstructor
], UninitializedLocaleData.prototype, "UninitializedLocaleData", null);
UninitializedLocaleData = UninitializedLocaleData_1 = __decorate([
    DartClass,
    Implements(MessageLookup)
], UninitializedLocaleData);
export { UninitializedLocaleData };
let LocaleDataException = class LocaleDataException {
    constructor(message) {
    }
    LocaleDataException(message) {
        this.message = message;
    }
    toString() {
        return `LocaleDataException: ${this.message}`;
    }
};
__decorate([
    defaultConstructor
], LocaleDataException.prototype, "LocaleDataException", null);
LocaleDataException = __decorate([
    DartClass
], LocaleDataException);
export { LocaleDataException };
let LocaleDataReader = class LocaleDataReader {
    constructor() {
    }
    read(locale) { throw 'abstract'; }
    LocaleDataReader() {
    }
};
__decorate([
    Abstract
], LocaleDataReader.prototype, "read", null);
__decorate([
    defaultConstructor
], LocaleDataReader.prototype, "LocaleDataReader", null);
LocaleDataReader = __decorate([
    DartClass
], LocaleDataReader);
export { LocaleDataReader };
export class properties {
    static get messageLookup() {
        if (this.__$messageLookup === undefined) {
            this.__$messageLookup = new UninitializedLocaleData('initializeMessages(<locale>)', null);
        }
        return this.__$messageLookup;
    }
    static set messageLookup(__$value) {
        this.__$messageLookup = __$value;
    }
}
//# sourceMappingURL=intl_helpers.js.map