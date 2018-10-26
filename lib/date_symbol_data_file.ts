/** Library asset:intl/lib/date_symbol_data_file.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
//import * as lib3 from "@dart2ts.packages/path/lib/path";
import * as lib4 from "./src/file_data_reader";
import * as lib5 from "./src/data/dates/locale_list";
import * as lib6 from "./src/lazy_locale_data";
import * as lib7 from "./src/date_format_internal";
import * as lib8 from "./date_symbols";

export var initializeDateFormatting : (locale : string,filePath : string) => async.Future<any> = (locale : string,filePath : string) : async.Future<any> =>  {
    throw "unimplemented";
    /*
    let reader = new lib4.FileDataReader(lib3.join(filePath,'symbols'));
    lib7.initializeDateSymbols(() =>  {
        return new lib6.LazyLocaleData(reader,_createDateSymbol,lib5.properties.availableLocalesForDateFormatting);
    });
    let reader2 = new lib4.FileDataReader(lib3.join(filePath,'patterns'));
    lib7.initializeDatePatterns(() =>  {
        return new lib6.LazyLocaleData(reader2,(x : any) =>  {
            return x;
        },lib5.properties.availableLocalesForDateFormatting);
    });
    return lib7.initializeIndividualLocaleDateFormatting((symbols : any,patterns : any) =>  {
        return async.Future.wait(new core.DartList.literal<async.Future<any>>(symbols.initLocale(locale),patterns.initLocale(locale)));
    });*/
};
export var _createDateSymbol : (map : core.DartMap<any,any>) => lib8.DateSymbols = (map : core.DartMap<any,any>) : lib8.DateSymbols =>  {
    return new lib8.DateSymbols.deserializeFromMap(map);
};
export class properties {
}
