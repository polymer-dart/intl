import * as lib8 from "./date_symbols";
export var initializeDateFormatting = (locale, filePath) => {
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
export var _createDateSymbol = (map) => {
    return new lib8.DateSymbols.deserializeFromMap(map);
};
export class properties {
}
//# sourceMappingURL=date_symbol_data_file.js.map