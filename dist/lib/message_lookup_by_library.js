var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass, Implements, op, Op, OperatorMethods, Abstract, AbstractProperty } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as lib3 from "./src/intl_helpers";
import * as lib4 from "./intl";
let CompositeMessageLookup = class CompositeMessageLookup {
    constructor() {
    }
    MessageLookup() { }
    localeExists(localeName) {
        return this.availableMessages.containsKey(localeName);
    }
    lookupMessage(message_str, locale, name, args, meaning, _namedArguments) {
        let { ifAbsent } = Object.assign({}, _namedArguments);
        let knownLocale = (locale || lib4.Intl.getCurrentLocale());
        let messages = (knownLocale == this._lastLocale) ? this._lastLookup : this._lookupMessageCatalog(knownLocale);
        if (op(Op.EQUALS, messages, null)) {
            return op(Op.EQUALS, ifAbsent, null) ? message_str : ifAbsent(message_str, args);
        }
        return messages.lookupMessage(message_str, locale, name, args, meaning, {
            ifAbsent: ifAbsent
        });
    }
    _lookupMessageCatalog(locale) {
        let verifiedLocale = lib4.Intl.verifiedLocale(locale, this.localeExists.bind(this), {
            onFailure: (locale) => {
                return locale;
            }
        });
        this._lastLocale = locale;
        this._lastLookup = this.availableMessages.get(verifiedLocale);
        return this._lastLookup;
    }
    addLocale(localeName, findLocale) {
        if (this.localeExists(localeName))
            return;
        let canonical = lib4.Intl.canonicalizedLocale(localeName);
        let newLocale = findLocale(canonical);
        if (newLocale != null) {
            this.availableMessages.set(localeName, newLocale);
            this.availableMessages.set(canonical, newLocale);
            if (this._lastLocale == newLocale) {
                this._lastLocale = null;
                this._lastLookup = null;
            }
        }
    }
    CompositeMessageLookup() {
        this.availableMessages = new core.DartMap();
    }
};
__decorate([
    Abstract
], CompositeMessageLookup.prototype, "MessageLookup", null);
__decorate([
    defaultConstructor
], CompositeMessageLookup.prototype, "CompositeMessageLookup", null);
CompositeMessageLookup = __decorate([
    DartClass,
    Implements(lib3.MessageLookup)
], CompositeMessageLookup);
export { CompositeMessageLookup };
let MessageLookupByLibrary = class MessageLookupByLibrary {
    constructor() {
    }
    lookupMessage(message_str, locale, name, args, meaning, _namedArguments) {
        let { ifAbsent } = Object.assign({}, _namedArguments);
        let notFound = false;
        let actualName = lib3.computeMessageName(name, message_str, meaning);
        if (actualName == null)
            notFound = true;
        let translation = op(Op.INDEX, this, actualName);
        notFound = notFound || (op(Op.EQUALS, translation, null));
        if (notFound) {
            return op(Op.EQUALS, ifAbsent, null) ? message_str : ifAbsent(message_str, args);
        }
        else {
            args = (args || new core.DartList.literal());
            return this.evaluateMessage(translation, args);
        }
    }
    evaluateMessage(translation, args) {
        return Function.apply(translation, args);
    }
    [OperatorMethods.INDEX](messageName) {
        return this.messages.get(messageName);
    }
    get messages() { throw 'abstract'; }
    get localeName() { throw 'abstract'; }
    toString() {
        return this.localeName;
    }
    static simpleMessage(translatedString) {
        return () => {
            return translatedString;
        };
    }
    MessageLookupByLibrary() {
    }
};
__decorate([
    AbstractProperty
], MessageLookupByLibrary.prototype, "messages", null);
__decorate([
    AbstractProperty
], MessageLookupByLibrary.prototype, "localeName", null);
__decorate([
    defaultConstructor
], MessageLookupByLibrary.prototype, "MessageLookupByLibrary", null);
MessageLookupByLibrary = __decorate([
    DartClass
], MessageLookupByLibrary);
export { MessageLookupByLibrary };
export class properties {
}
//# sourceMappingURL=message_lookup_by_library.js.map