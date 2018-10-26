/** Library asset:intl/lib/number_symbols.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

@DartClass
export class NumberSymbols {
    NAME : string;

    DECIMAL_SEP : string;
    GROUP_SEP : string;
    PERCENT : string;
    ZERO_DIGIT : string;
    PLUS_SIGN : string;
    MINUS_SIGN : string;
    EXP_SYMBOL : string;
    PERMILL : string;
    INFINITY : string;
    NAN : string;
    DECIMAL_PATTERN : string;
    SCIENTIFIC_PATTERN : string;
    PERCENT_PATTERN : string;
    CURRENCY_PATTERN : string;
    DEF_CURRENCY_CODE : string;

    constructor(_namedArguments? : {NAME? : string,DECIMAL_SEP? : string,GROUP_SEP? : string,PERCENT? : string,ZERO_DIGIT? : string,PLUS_SIGN? : string,MINUS_SIGN? : string,EXP_SYMBOL? : string,PERMILL? : string,INFINITY? : string,NAN? : string,DECIMAL_PATTERN? : string,SCIENTIFIC_PATTERN? : string,PERCENT_PATTERN? : string,CURRENCY_PATTERN? : string,DEF_CURRENCY_CODE? : string}) {
    }
    @defaultConstructor
    NumberSymbols(_namedArguments? : {NAME? : string,DECIMAL_SEP? : string,GROUP_SEP? : string,PERCENT? : string,ZERO_DIGIT? : string,PLUS_SIGN? : string,MINUS_SIGN? : string,EXP_SYMBOL? : string,PERMILL? : string,INFINITY? : string,NAN? : string,DECIMAL_PATTERN? : string,SCIENTIFIC_PATTERN? : string,PERCENT_PATTERN? : string,CURRENCY_PATTERN? : string,DEF_CURRENCY_CODE? : string}) {
        let {NAME,DECIMAL_SEP,GROUP_SEP,PERCENT,ZERO_DIGIT,PLUS_SIGN,MINUS_SIGN,EXP_SYMBOL,PERMILL,INFINITY,NAN,DECIMAL_PATTERN,SCIENTIFIC_PATTERN,PERCENT_PATTERN,CURRENCY_PATTERN,DEF_CURRENCY_CODE} = Object.assign({
        }, _namedArguments );
        this.NAME = NAME;
        this.DECIMAL_SEP = DECIMAL_SEP;
        this.GROUP_SEP = GROUP_SEP;
        this.PERCENT = PERCENT;
        this.ZERO_DIGIT = ZERO_DIGIT;
        this.PLUS_SIGN = PLUS_SIGN;
        this.MINUS_SIGN = MINUS_SIGN;
        this.EXP_SYMBOL = EXP_SYMBOL;
        this.PERMILL = PERMILL;
        this.INFINITY = INFINITY;
        this.NAN = NAN;
        this.DECIMAL_PATTERN = DECIMAL_PATTERN;
        this.SCIENTIFIC_PATTERN = SCIENTIFIC_PATTERN;
        this.PERCENT_PATTERN = PERCENT_PATTERN;
        this.CURRENCY_PATTERN = CURRENCY_PATTERN;
        this.DEF_CURRENCY_CODE = DEF_CURRENCY_CODE;
    }
    toString() {
        return this.NAME;
    }
}

@DartClass
export class CompactNumberSymbols {
    COMPACT_DECIMAL_SHORT_PATTERN : core.DartMap<number,string>;

    COMPACT_DECIMAL_LONG_PATTERN : core.DartMap<number,string>;

    COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN : core.DartMap<number,string>;

    constructor(_namedArguments? : {COMPACT_DECIMAL_SHORT_PATTERN? : core.DartMap<number,string>,COMPACT_DECIMAL_LONG_PATTERN? : core.DartMap<number,string>,COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN? : core.DartMap<number,string>}) {
    }
    @defaultConstructor
    CompactNumberSymbols(_namedArguments? : {COMPACT_DECIMAL_SHORT_PATTERN? : core.DartMap<number,string>,COMPACT_DECIMAL_LONG_PATTERN? : core.DartMap<number,string>,COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN? : core.DartMap<number,string>}) {
        let {COMPACT_DECIMAL_SHORT_PATTERN,COMPACT_DECIMAL_LONG_PATTERN,COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN} = Object.assign({
        }, _namedArguments );
        this.COMPACT_DECIMAL_SHORT_PATTERN = COMPACT_DECIMAL_SHORT_PATTERN;
        this.COMPACT_DECIMAL_LONG_PATTERN = COMPACT_DECIMAL_LONG_PATTERN;
        this.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN = COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN;
    }
}

export class properties {
}
