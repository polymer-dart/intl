/** Library asset:intl/lib/src/date_format_internal.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./../date_symbols";
import * as lib4 from "./intl_helpers";

export var initializeDateSymbols : (symbols : Function) => void = (symbols : Function) : void =>  {
    if (is(properties.dateTimeSymbols, lib4.UninitializedLocaleData)) {
        properties.dateTimeSymbols = symbols();
    }
};
export var initializeDatePatterns : (patterns : Function) => void = (patterns : Function) : void =>  {
    if (is(properties.dateTimePatterns, lib4.UninitializedLocaleData)) {
        properties.dateTimePatterns = patterns();
    }
};
export var initializeIndividualLocaleDateFormatting : (init : Function) => async.Future<any> = (init : Function) : async.Future<any> =>  {
    return init(properties.dateTimeSymbols,properties.dateTimePatterns);
};
export class properties {
    static get dateTimeSymbols() : any {
        return properties._dateTimeSymbols;
    }
    static set dateTimeSymbols(symbols : any) {
        properties._dateTimeSymbols = symbols;
        properties.cachedDateSymbols = null;
        properties.lastDateSymbolLocale = null;
    }
    private static __$_dateTimeSymbols : any;
    static get _dateTimeSymbols() : any { 
        if (this.__$_dateTimeSymbols===undefined) {
            this.__$_dateTimeSymbols = new lib4.UninitializedLocaleData<any>('initializeDateFormatting(<locale>)',lib3.properties.en_USSymbols);
        }
        return this.__$_dateTimeSymbols;
    }
    static set _dateTimeSymbols(__$value : any)  { 
        this.__$_dateTimeSymbols = __$value;
    }

    private static __$cachedDateSymbols : lib3.DateSymbols;
    static get cachedDateSymbols() : lib3.DateSymbols { 
        return this.__$cachedDateSymbols;
    }
    static set cachedDateSymbols(__$value : lib3.DateSymbols)  { 
        this.__$cachedDateSymbols = __$value;
    }

    private static __$lastDateSymbolLocale : string;
    static get lastDateSymbolLocale() : string { 
        return this.__$lastDateSymbolLocale;
    }
    static set lastDateSymbolLocale(__$value : string)  { 
        this.__$lastDateSymbolLocale = __$value;
    }

    private static __$dateTimePatterns : any;
    static get dateTimePatterns() : any { 
        if (this.__$dateTimePatterns===undefined) {
            this.__$dateTimePatterns = new lib4.UninitializedLocaleData<any>('initializeDateFormatting(<locale>)',lib3.properties.en_USPatterns);
        }
        return this.__$dateTimePatterns;
    }
    static set dateTimePatterns(__$value : any)  { 
        this.__$dateTimePatterns = __$value;
    }

}
