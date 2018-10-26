var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass } from "@dart2ts/dart/utils";
let NumberSymbols = class NumberSymbols {
    constructor(_namedArguments) {
    }
    NumberSymbols(_namedArguments) {
        let { NAME, DECIMAL_SEP, GROUP_SEP, PERCENT, ZERO_DIGIT, PLUS_SIGN, MINUS_SIGN, EXP_SYMBOL, PERMILL, INFINITY, NAN, DECIMAL_PATTERN, SCIENTIFIC_PATTERN, PERCENT_PATTERN, CURRENCY_PATTERN, DEF_CURRENCY_CODE } = Object.assign({}, _namedArguments);
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
};
__decorate([
    defaultConstructor
], NumberSymbols.prototype, "NumberSymbols", null);
NumberSymbols = __decorate([
    DartClass
], NumberSymbols);
export { NumberSymbols };
let CompactNumberSymbols = class CompactNumberSymbols {
    constructor(_namedArguments) {
    }
    CompactNumberSymbols(_namedArguments) {
        let { COMPACT_DECIMAL_SHORT_PATTERN, COMPACT_DECIMAL_LONG_PATTERN, COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN } = Object.assign({}, _namedArguments);
        this.COMPACT_DECIMAL_SHORT_PATTERN = COMPACT_DECIMAL_SHORT_PATTERN;
        this.COMPACT_DECIMAL_LONG_PATTERN = COMPACT_DECIMAL_LONG_PATTERN;
        this.COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN = COMPACT_DECIMAL_SHORT_CURRENCY_PATTERN;
    }
};
__decorate([
    defaultConstructor
], CompactNumberSymbols.prototype, "CompactNumberSymbols", null);
CompactNumberSymbols = __decorate([
    DartClass
], CompactNumberSymbols);
export { CompactNumberSymbols };
export class properties {
}
//# sourceMappingURL=number_symbols.js.map