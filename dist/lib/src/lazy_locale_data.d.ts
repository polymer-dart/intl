import { OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
export declare class LazyLocaleData {
    map: core.DartMap<any, any>;
    _reader: lib3.LocaleDataReader;
    availableLocales: core.DartList<any>;
    _creationFunction: Function;
    availableLocaleSet: core.DartSet<any>;
    private static __$jsonDecoder;
    static readonly jsonDecoder: any;
    constructor(_reader: lib3.LocaleDataReader, _creationFunction: Function, keys: core.DartList<any>);
    LazyLocaleData(_reader: lib3.LocaleDataReader, _creationFunction: Function, keys: core.DartList<any>): void;
    containsKey(locale: string): boolean;
    readonly keys: core.DartList<any>;
    [OperatorMethods.INDEX](localeName: string): any;
    unsupportedLocale(localeName: any): void;
    initLocale(localeName: string): async.Future<any>;
    jsonData(input: async.Future<any>): async.Future<any>;
}
export declare class properties {
}
