import * as core from "@dart2ts/dart/core";
export declare var _default_rule: () => PluralCase;
export declare var startRuleEvaluation: (howMany: number) => any;
export declare var _fil_rule: () => PluralCase;
export declare var _pt_PT_rule: () => PluralCase;
export declare var _br_rule: () => PluralCase;
export declare var _sr_rule: () => PluralCase;
export declare var _ro_rule: () => PluralCase;
export declare var _hi_rule: () => PluralCase;
export declare var _fr_rule: () => PluralCase;
export declare var _cs_rule: () => PluralCase;
export declare var _pl_rule: () => PluralCase;
export declare var _lv_rule: () => PluralCase;
export declare var _he_rule: () => PluralCase;
export declare var _mt_rule: () => PluralCase;
export declare var _si_rule: () => PluralCase;
export declare var localeHasPluralRules: (locale: string) => boolean;
export declare var _da_rule: () => PluralCase;
export declare var _ru_rule: () => PluralCase;
export declare var _be_rule: () => PluralCase;
export declare var _mk_rule: () => PluralCase;
export declare var _ga_rule: () => PluralCase;
export declare var _pt_rule: () => PluralCase;
export declare var _es_rule: () => PluralCase;
export declare var _is_rule: () => PluralCase;
export declare var _ar_rule: () => PluralCase;
export declare var _sl_rule: () => PluralCase;
export declare var _lt_rule: () => PluralCase;
export declare var _en_rule: () => PluralCase;
export declare var _ak_rule: () => PluralCase;
export declare var _cy_rule: () => PluralCase;
export declare enum PluralCase {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
    FEW = 3,
    MANY = 4,
    OTHER = 5
}
export declare class properties {
    static readonly OTHER: PluralCase;
    private static __$_n;
    static _n: number;
    static readonly _i: number;
    private static __$opt_precision;
    static opt_precision: number;
    static readonly _v: number;
    static readonly _f: number;
    static readonly _t: number;
    static readonly ZERO: PluralCase;
    static readonly ONE: PluralCase;
    static readonly TWO: PluralCase;
    static readonly FEW: PluralCase;
    static readonly MANY: PluralCase;
    private static __$pluralRules;
    static pluralRules: core.DartMap<any, any>;
}
