import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./src/http_request_data_reader";
import * as lib4 from "./src/data/dates/locale_list";
import * as lib5 from "./src/lazy_locale_data";
import * as lib6 from "./src/date_format_internal";
import * as lib7 from "./intl";
import * as lib8 from "./date_symbols";
export var initializeDateFormatting = (locale, url) => {
    let reader = new lib3.HttpRequestDataReader(`${url}symbols/`);
    lib6.initializeDateSymbols(() => {
        return new lib5.LazyLocaleData(reader, _createDateSymbol, lib4.properties.availableLocalesForDateFormatting);
    });
    let reader2 = new lib3.HttpRequestDataReader(`${url}patterns/`);
    lib6.initializeDatePatterns(() => {
        return new lib5.LazyLocaleData(reader2, (x) => {
            return x;
        }, lib4.properties.availableLocalesForDateFormatting);
    });
    let actualLocale = lib7.Intl.verifiedLocale(locale, (l) => {
        return lib4.properties.availableLocalesForDateFormatting.contains(l);
    });
    return lib6.initializeIndividualLocaleDateFormatting((symbols, patterns) => {
        return async.Future.wait(new core.DartList.literal(symbols.initLocale(actualLocale), patterns.initLocale(actualLocale)));
    });
};
export var _createDateSymbol = (map) => {
    return new lib8.DateSymbols.deserializeFromMap(map);
};
export class properties {
}
//# sourceMappingURL=date_symbol_data_http_request.js.map