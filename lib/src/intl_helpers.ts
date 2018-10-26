/** Library asset:intl/lib/src/intl_helpers.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./../intl";

export var initializeInternalMessageLookup : (lookupFunction : Function) => void = (lookupFunction : Function) : void =>  {
    if (is(properties.messageLookup, UninitializedLocaleData)) {
        (properties.messageLookup as UninitializedLocaleData<any>)._reportErrors();
        properties.messageLookup = lookupFunction();
    }
};
export var computeMessageName : (name : string,text : string,meaning : string) => string = (name : string,text : string,meaning : string) : string =>  {
    if (name != null && name != "") return name;
    return meaning == null ? text : `${text}_${meaning}`;
};

@DartClass
export class MessageLookup {
    @Abstract
    lookupMessage(message_str : string,locale : string,name : string,args : core.DartList<any>,meaning : string,_namedArguments? : {ifAbsent? : (message_str : string,args : core.DartList<any>) => any}) : string{ throw 'abstract'}
    @Abstract
    addLocale(localeName : string,findLocale : Function) : void{ throw 'abstract'}
    constructor() {
    }
    @defaultConstructor
    MessageLookup() {
    }
}

@DartClass
@Implements(MessageLookup)
export class UninitializedLocaleData<F>  implements MessageLookup {
    message : string;

    fallbackData : F;

    @Abstract
    MessageLookup(){

    }

    constructor(message : string,fallbackData : F) {
    }
    @defaultConstructor
    UninitializedLocaleData(message : string,fallbackData : F) {
        this._badMessages = new core.DartList.literal();
        this.message = message;
        this.fallbackData = fallbackData;
    }
    [OperatorMethods.INDEX](key : string) {
        return (key == 'en_US') ? this.fallbackData : this._throwException();
    }
    private static __$throwOnFallback : boolean;
    static get throwOnFallback() : boolean { 
        if (this.__$throwOnFallback===undefined) {
            this.__$throwOnFallback = false;
        }
        return this.__$throwOnFallback;
    }
    static set throwOnFallback(__$value : boolean)  { 
        this.__$throwOnFallback = __$value;
    }

    _badMessages : core.DartList<string>;

    _reportErrors() : void {
        if (UninitializedLocaleData.throwOnFallback && this._badMessages.length > 0) {
            throw new core.StateError("The following messages were called before locale initialization:" + ` ${this._uninitializedMessages}`);
        }
    }
    get _uninitializedMessages() : string {
        return (((_) : core.DartList<string> =>  {
            {
                _.sort();
                return _;
            }
        })(this._badMessages.toSet().toList())).join("\n    ");
    }
    lookupMessage(message_str : string,locale : string,name : string,args : core.DartList<any>,meaning : string,_namedArguments? : {ifAbsent? : (message_str : string,args : core.DartList<any>) => any}) : string {
        let {ifAbsent} = Object.assign({
        }, _namedArguments );
        if (UninitializedLocaleData.throwOnFallback) {
            this._badMessages.add((name || message_str));
        }
        return message_str;
    }
    findLocale(locale : string) : string {
        return (locale || lib3.Intl.getCurrentLocale());
    }
    get keys() : core.DartList<string> {
         this._throwException();
         return null;
    }
    containsKey(key : string) : boolean {
        return (key == 'en_US') ? true : this._throwException();
    }
    _throwException():any {
        throw new LocaleDataException("Locale data has not been initialized" + `, call ${this.message}.`);
    }
    addLocale(localeName : string,findLocale : Function) : void {
        return this._throwException();
    }
}



@DartClass
export class LocaleDataException  {
    message : string;

    constructor(message : string) {
    }
    @defaultConstructor
    LocaleDataException(message : string) {
        this.message = message;
    }
    toString() {
        return `LocaleDataException: ${this.message}`;
    }

   
}

@DartClass
export class LocaleDataReader {
    @Abstract
    read(locale : string) : async.Future<any>{ throw 'abstract'}
    constructor() {
    }
    @defaultConstructor
    LocaleDataReader() {
    }
}

export class properties {
    private static __$messageLookup : MessageLookup;
    static get messageLookup() : MessageLookup { 
        if (this.__$messageLookup===undefined) {
            this.__$messageLookup = new UninitializedLocaleData<any>('initializeMessages(<locale>)',null);
        }
        return this.__$messageLookup;
    }
    static set messageLookup(__$value : MessageLookup)  { 
        this.__$messageLookup = __$value;
    }

}
