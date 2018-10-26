import * as async from "@dart2ts/dart/async";
import * as lib3 from "./../date_symbols";
export declare var initializeDateSymbols: (symbols: Function) => void;
export declare var initializeDatePatterns: (patterns: Function) => void;
export declare var initializeIndividualLocaleDateFormatting: (init: Function) => async.Future<any>;
export declare class properties {
    static dateTimeSymbols: any;
    private static __$_dateTimeSymbols;
    static _dateTimeSymbols: any;
    private static __$cachedDateSymbols;
    static cachedDateSymbols: lib3.DateSymbols;
    private static __$lastDateSymbolLocale;
    static lastDateSymbolLocale: string;
    private static __$dateTimePatterns;
    static dateTimePatterns: any;
}
