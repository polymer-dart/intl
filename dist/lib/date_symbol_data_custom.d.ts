import * as core from "@dart2ts/dart/core";
import * as lib3 from "./date_symbols";
export declare var initializeDateFormattingCustom: (_namedArguments?: {
    locale?: string;
    symbols?: lib3.DateSymbols;
    patterns?: core.DartMap<string, string>;
}) => void;
export declare var _emptySymbols: () => core.DartMap<string, lib3.DateSymbols>;
export declare var _emptyPatterns: () => core.DartMap<string, core.DartMap<string, string>>;
export declare class properties {
}
