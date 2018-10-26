import * as core from "@dart2ts/dart/core";
export declare class NumberSymbols {
    NAME: string;
    DECIMAL_SEP: string;
    GROUP_SEP: string;
    PERCENT: string;
    ZERO_DIGIT: string;
    PLUS_SIGN: string;
    MINUS_SIGN: string;
    EXP_SYMBOL: string;
    PERMILL: string;
    INFINITY: string;
    NAN: string;
    DECIMAL_PATTERN: string;
    SCIENTIFIC_PATTERN: string;
    PERCENT_PATTERN: string;
    CURRENCY_PATTERN: string;
    DEF_CURRENCY_CODE: string;
    constructor(_namedArguments?: {
        NAME?: string;
        DECIMAL_SEP?: string;
        GROUP_SEP?: string;
        PERCENT?: string;
        ZERO_DIGIT?: string;
        PLUS_SIGN?: string;
        MINUS_SIGN?: string;
        EXP_SYMBOL?: string;
        PERMILL?: string;
        INFINITY?: string;
        NAN?: string;
        DECIMAL_PATTERN?: string;
        SCIENTIFIC_PATTERN?: string;
        PERCENT_PATTERN?: string;
        CURRENCY_PATTERN?: string;
        DEF_CURRENCY_CODE?: string;
    });
    NumberSymbols(_namedArguments?: {
        NAME?: string;
        DECIMAL_SEP?: string;
        GROUP_SEP?: string;
        PERCENT?: string;
        ZERO_DIGIT?: string;
        PLUS_SIGN?: string;
        MINUS_SIGN?: string;
        EXP_SYMBOL?: string;
        PERMILL?: string;
        INFINITY?: string;
        NAN?: string;
        DECIMAL_PATTERN?: string;
        SCIENTIFIC_PATTERN?: string;
        PERCENT_PATTERN?: string;
        CURRENCY_PATTERN?: string;
        DEF_CURRENCY_CODE?: string;
    }): void;
    toString(): string;
}
export declare class CompactNumberSymbols {
    COMPACT_DECIMAL_SHORT_PATTERN: core.DartMap<number, string>;
    COMPACT_DECIMAL_LONG_PATTERN: core.DartMap<number, string>;
    COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN: core.DartMap<number, string>;
    constructor(_namedArguments?: {
        COMPACT_DECIMAL_SHORT_PATTERN?: core.DartMap<number, string>;
        COMPACT_DECIMAL_LONG_PATTERN?: core.DartMap<number, string>;
        COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN?: core.DartMap<number, string>;
    });
    CompactNumberSymbols(_namedArguments?: {
        COMPACT_DECIMAL_SHORT_PATTERN?: core.DartMap<number, string>;
        COMPACT_DECIMAL_LONG_PATTERN?: core.DartMap<number, string>;
        COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN?: core.DartMap<number, string>;
    }): void;
}
export declare class properties {
}
