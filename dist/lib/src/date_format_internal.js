/** Library asset:intl/lib/src/date_format_internal.dart */
import { is } from "@dart2ts/dart/_common";
import * as lib3 from "./../date_symbols";
import * as lib4 from "./intl_helpers";
export var initializeDateSymbols = (symbols) => {
    if (is(properties.dateTimeSymbols, lib4.UninitializedLocaleData)) {
        properties.dateTimeSymbols = symbols();
    }
};
export var initializeDatePatterns = (patterns) => {
    if (is(properties.dateTimePatterns, lib4.UninitializedLocaleData)) {
        properties.dateTimePatterns = patterns();
    }
};
export var initializeIndividualLocaleDateFormatting = (init) => {
    return init(properties.dateTimeSymbols, properties.dateTimePatterns);
};
export class properties {
    static get dateTimeSymbols() {
        return properties._dateTimeSymbols;
    }
    static set dateTimeSymbols(symbols) {
        properties._dateTimeSymbols = symbols;
        properties.cachedDateSymbols = null;
        properties.lastDateSymbolLocale = null;
    }
    static get _dateTimeSymbols() {
        if (this.__$_dateTimeSymbols === undefined) {
            this.__$_dateTimeSymbols = new lib4.UninitializedLocaleData('initializeDateFormatting(<locale>)', lib3.properties.en_USSymbols);
        }
        return this.__$_dateTimeSymbols;
    }
    static set _dateTimeSymbols(__$value) {
        this.__$_dateTimeSymbols = __$value;
    }
    static get cachedDateSymbols() {
        return this.__$cachedDateSymbols;
    }
    static set cachedDateSymbols(__$value) {
        this.__$cachedDateSymbols = __$value;
    }
    static get lastDateSymbolLocale() {
        return this.__$lastDateSymbolLocale;
    }
    static set lastDateSymbolLocale(__$value) {
        this.__$lastDateSymbolLocale = __$value;
    }
    static get dateTimePatterns() {
        if (this.__$dateTimePatterns === undefined) {
            this.__$dateTimePatterns = new lib4.UninitializedLocaleData('initializeDateFormatting(<locale>)', lib3.properties.en_USPatterns);
        }
        return this.__$dateTimePatterns;
    }
    static set dateTimePatterns(__$value) {
        this.__$dateTimePatterns = __$value;
    }
}
//# sourceMappingURL=date_format_internal.js.map