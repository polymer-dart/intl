/** Library asset:intl/lib/message_lookup_by_library.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./src/intl_helpers";
import * as lib4 from "./intl";

@DartClass
@Implements(lib3.MessageLookup)
export class CompositeMessageLookup implements lib3.MessageLookup {
    availableMessages : core.DartMap<string,MessageLookupByLibrary>;

    @Abstract
    MessageLookup(){}

    localeExists(localeName : any) : boolean {
        return this.availableMessages.containsKey(localeName);
    }
    _lastLocale : string;

    _lastLookup : MessageLookupByLibrary;

    lookupMessage(message_str : string,locale : string,name : string,args : core.DartList<any>,meaning : string,_namedArguments? : {ifAbsent? : (message_str : string,args : core.DartList<any>) => any}) : string {
        let {ifAbsent} = Object.assign({
        }, _namedArguments );
        let knownLocale = (locale || lib4.Intl.getCurrentLocale());
        let messages = (knownLocale == this._lastLocale) ? this._lastLookup : this._lookupMessageCatalog(knownLocale);
        if (op(Op.EQUALS,messages,null)) {
            return op(Op.EQUALS,ifAbsent,null) ? message_str : ifAbsent(message_str,args);
        }
        return messages.lookupMessage(message_str,locale,name,args,meaning,{
            ifAbsent : ifAbsent});
    }
    _lookupMessageCatalog(locale : string) : MessageLookupByLibrary {
        let verifiedLocale = lib4.Intl.verifiedLocale(locale,this.localeExists.bind(this),{
            onFailure : (locale : any) =>  {
                return locale;
            }});
        this._lastLocale = locale;
        this._lastLookup = this.availableMessages.get(verifiedLocale);
        return this._lastLookup;
    }
    addLocale(localeName : string,findLocale : Function) : void {
        if (this.localeExists(localeName)) return;
        let canonical = lib4.Intl.canonicalizedLocale(localeName);
        let newLocale = findLocale(canonical);
        if (newLocale != null) {
            this.availableMessages.set(localeName,newLocale);
            this.availableMessages.set(canonical,newLocale);
            if (this._lastLocale == newLocale) {
                this._lastLocale = null;
                this._lastLookup = null;
            }
        }
    }
    constructor() {
    }
    @defaultConstructor
    CompositeMessageLookup() {
        this.availableMessages = new core.DartMap<any,any>();
    }
}

@DartClass
export class MessageLookupByLibrary {
    lookupMessage(message_str : string,locale : string,name : string,args : core.DartList<any>,meaning : string,_namedArguments? : {ifAbsent? : (message_str : string,args : core.DartList<any>) => any}) : string {
        let {ifAbsent} = Object.assign({
        }, _namedArguments );
        let notFound = false;
        let actualName = lib3.computeMessageName(name,message_str,meaning);
        if (actualName == null) notFound = true;
        let translation = op(Op.INDEX,this,actualName);
        notFound = notFound || (op(Op.EQUALS,translation,null));
        if (notFound) {
            return op(Op.EQUALS,ifAbsent,null) ? message_str : ifAbsent(message_str,args);
        }else {
            args = (args || new core.DartList.literal());
            return this.evaluateMessage(translation,args);
        }
    }
    evaluateMessage(translation : any,args : core.DartList<any>) : string {
        return Function.apply(translation,args);
    }
    [OperatorMethods.INDEX](messageName : string) {
        return this.messages.get(messageName);
    }
    @AbstractProperty
    get messages() : core.DartMap<string,any>{ throw 'abstract'}
    @AbstractProperty
    get localeName() : string{ throw 'abstract'}
    toString() {
        return this.localeName;
    }
    static simpleMessage(translatedString : any) {
        return () =>  {
            return translatedString;
        };
    }
    constructor() {
    }
    @defaultConstructor
    MessageLookupByLibrary() {
    }
}

export class properties {
}
