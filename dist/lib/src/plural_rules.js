import * as core from "@dart2ts/dart/core";
export var _default_rule = () => {
    return properties.OTHER;
};
export var startRuleEvaluation = (howMany) => {
    properties._n = howMany;
};
export var _fil_rule = () => {
    if (properties._v == 0 && (properties._i == 1 || properties._i == 2 || properties._i == 3) || properties._v == 0 && properties._i % 10 != 4 && properties._i % 10 != 6 && properties._i % 10 != 9 || properties._v != 0 && properties._f % 10 != 4 && properties._f % 10 != 6 && properties._f % 10 != 9) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _pt_PT_rule = () => {
    if (properties._n == 1 && properties._v == 0) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _br_rule = () => {
    if (properties._n % 10 == 1 && properties._n % 100 != 11 && properties._n % 100 != 71 && properties._n % 100 != 91) {
        return properties.ONE;
    }
    if (properties._n % 10 == 2 && properties._n % 100 != 12 && properties._n % 100 != 72 && properties._n % 100 != 92) {
        return properties.TWO;
    }
    if ((properties._n % 10 >= 3 && properties._n % 10 <= 4 || properties._n % 10 == 9) && (properties._n % 100 < 10 || properties._n % 100 > 19) && (properties._n % 100 < 70 || properties._n % 100 > 79) && (properties._n % 100 < 90 || properties._n % 100 > 99)) {
        return properties.FEW;
    }
    if (properties._n != 0 && properties._n % 1000000 == 0) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _sr_rule = () => {
    if (properties._v == 0 && properties._i % 10 == 1 && properties._i % 100 != 11 || properties._f % 10 == 1 && properties._f % 100 != 11) {
        return properties.ONE;
    }
    if (properties._v == 0 && properties._i % 10 >= 2 && properties._i % 10 <= 4 && (properties._i % 100 < 12 || properties._i % 100 > 14) || properties._f % 10 >= 2 && properties._f % 10 <= 4 && (properties._f % 100 < 12 || properties._f % 100 > 14)) {
        return properties.FEW;
    }
    return properties.OTHER;
};
export var _ro_rule = () => {
    if (properties._i == 1 && properties._v == 0) {
        return properties.ONE;
    }
    if (properties._v != 0 || properties._n == 0 || properties._n != 1 && properties._n % 100 >= 1 && properties._n % 100 <= 19) {
        return properties.FEW;
    }
    return properties.OTHER;
};
export var _hi_rule = () => {
    if (properties._i == 0 || properties._n == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _fr_rule = () => {
    if (properties._i == 0 || properties._i == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _cs_rule = () => {
    if (properties._i == 1 && properties._v == 0) {
        return properties.ONE;
    }
    if (properties._i >= 2 && properties._i <= 4 && properties._v == 0) {
        return properties.FEW;
    }
    if (properties._v != 0) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _pl_rule = () => {
    if (properties._i == 1 && properties._v == 0) {
        return properties.ONE;
    }
    if (properties._v == 0 && properties._i % 10 >= 2 && properties._i % 10 <= 4 && (properties._i % 100 < 12 || properties._i % 100 > 14)) {
        return properties.FEW;
    }
    if (properties._v == 0 && properties._i != 1 && properties._i % 10 >= 0 && properties._i % 10 <= 1 || properties._v == 0 && properties._i % 10 >= 5 && properties._i % 10 <= 9 || properties._v == 0 && properties._i % 100 >= 12 && properties._i % 100 <= 14) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _lv_rule = () => {
    if (properties._n % 10 == 0 || properties._n % 100 >= 11 && properties._n % 100 <= 19 || properties._v == 2 && properties._f % 100 >= 11 && properties._f % 100 <= 19) {
        return properties.ZERO;
    }
    if (properties._n % 10 == 1 && properties._n % 100 != 11 || properties._v == 2 && properties._f % 10 == 1 && properties._f % 100 != 11 || properties._v != 2 && properties._f % 10 == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _he_rule = () => {
    if (properties._i == 1 && properties._v == 0) {
        return properties.ONE;
    }
    if (properties._i == 2 && properties._v == 0) {
        return properties.TWO;
    }
    if (properties._v == 0 && (properties._n < 0 || properties._n > 10) && properties._n % 10 == 0) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _mt_rule = () => {
    if (properties._n == 1) {
        return properties.ONE;
    }
    if (properties._n == 0 || properties._n % 100 >= 2 && properties._n % 100 <= 10) {
        return properties.FEW;
    }
    if (properties._n % 100 >= 11 && properties._n % 100 <= 19) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _si_rule = () => {
    if ((properties._n == 0 || properties._n == 1) || properties._i == 0 && properties._f == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var localeHasPluralRules = (locale) => {
    return properties.pluralRules.containsKey(locale);
};
export var _da_rule = () => {
    if (properties._n == 1 || properties._t != 0 && (properties._i == 0 || properties._i == 1)) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _ru_rule = () => {
    if (properties._v == 0 && properties._i % 10 == 1 && properties._i % 100 != 11) {
        return properties.ONE;
    }
    if (properties._v == 0 && properties._i % 10 >= 2 && properties._i % 10 <= 4 && (properties._i % 100 < 12 || properties._i % 100 > 14)) {
        return properties.FEW;
    }
    if (properties._v == 0 && properties._i % 10 == 0 || properties._v == 0 && properties._i % 10 >= 5 && properties._i % 10 <= 9 || properties._v == 0 && properties._i % 100 >= 11 && properties._i % 100 <= 14) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _be_rule = () => {
    if (properties._n % 10 == 1 && properties._n % 100 != 11) {
        return properties.ONE;
    }
    if (properties._n % 10 >= 2 && properties._n % 10 <= 4 && (properties._n % 100 < 12 || properties._n % 100 > 14)) {
        return properties.FEW;
    }
    if (properties._n % 10 == 0 || properties._n % 10 >= 5 && properties._n % 10 <= 9 || properties._n % 100 >= 11 && properties._n % 100 <= 14) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _mk_rule = () => {
    if (properties._v == 0 && properties._i % 10 == 1 || properties._f % 10 == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _ga_rule = () => {
    if (properties._n == 1) {
        return properties.ONE;
    }
    if (properties._n == 2) {
        return properties.TWO;
    }
    if (properties._n >= 3 && properties._n <= 6) {
        return properties.FEW;
    }
    if (properties._n >= 7 && properties._n <= 10) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _pt_rule = () => {
    if (properties._n >= 0 && properties._n <= 2 && properties._n != 2) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _es_rule = () => {
    if (properties._n == 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _is_rule = () => {
    if (properties._t == 0 && properties._i % 10 == 1 && properties._i % 100 != 11 || properties._t != 0) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _ar_rule = () => {
    if (properties._n == 0) {
        return properties.ZERO;
    }
    if (properties._n == 1) {
        return properties.ONE;
    }
    if (properties._n == 2) {
        return properties.TWO;
    }
    if (properties._n % 100 >= 3 && properties._n % 100 <= 10) {
        return properties.FEW;
    }
    if (properties._n % 100 >= 11 && properties._n % 100 <= 99) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _sl_rule = () => {
    if (properties._v == 0 && properties._i % 100 == 1) {
        return properties.ONE;
    }
    if (properties._v == 0 && properties._i % 100 == 2) {
        return properties.TWO;
    }
    if (properties._v == 0 && properties._i % 100 >= 3 && properties._i % 100 <= 4 || properties._v != 0) {
        return properties.FEW;
    }
    return properties.OTHER;
};
export var _lt_rule = () => {
    if (properties._n % 10 == 1 && (properties._n % 100 < 11 || properties._n % 100 > 19)) {
        return properties.ONE;
    }
    if (properties._n % 10 >= 2 && properties._n % 10 <= 9 && (properties._n % 100 < 11 || properties._n % 100 > 19)) {
        return properties.FEW;
    }
    if (properties._f != 0) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var _en_rule = () => {
    if (properties._i == 1 && properties._v == 0) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _ak_rule = () => {
    if (properties._n >= 0 && properties._n <= 1) {
        return properties.ONE;
    }
    return properties.OTHER;
};
export var _cy_rule = () => {
    if (properties._n == 0) {
        return properties.ZERO;
    }
    if (properties._n == 1) {
        return properties.ONE;
    }
    if (properties._n == 2) {
        return properties.TWO;
    }
    if (properties._n == 3) {
        return properties.FEW;
    }
    if (properties._n == 6) {
        return properties.MANY;
    }
    return properties.OTHER;
};
export var PluralCase;
(function (PluralCase) {
    PluralCase[PluralCase["ZERO"] = 0] = "ZERO";
    PluralCase[PluralCase["ONE"] = 1] = "ONE";
    PluralCase[PluralCase["TWO"] = 2] = "TWO";
    PluralCase[PluralCase["FEW"] = 3] = "FEW";
    PluralCase[PluralCase["MANY"] = 4] = "MANY";
    PluralCase[PluralCase["OTHER"] = 5] = "OTHER";
})(PluralCase || (PluralCase = {}));
export class properties {
    static get OTHER() {
        return PluralCase.OTHER;
    }
    static get _n() {
        return this.__$_n;
    }
    static set _n(__$value) {
        this.__$_n = __$value;
    }
    static get _i() {
        return properties._n;
    }
    static get opt_precision() {
        return this.__$opt_precision;
    }
    static set opt_precision(__$value) {
        this.__$opt_precision = __$value;
    }
    static get _v() {
        return 0;
    }
    static get _f() {
        return 0;
    }
    static get _t() {
        return 0;
    }
    static get ZERO() {
        return PluralCase.ZERO;
    }
    static get ONE() {
        return PluralCase.ONE;
    }
    static get TWO() {
        return PluralCase.TWO;
    }
    static get FEW() {
        return PluralCase.FEW;
    }
    static get MANY() {
        return PluralCase.MANY;
    }
    static get pluralRules() {
        if (this.__$pluralRules === undefined) {
            this.__$pluralRules = new core.DartMap.literal([
                ['af', _es_rule],
                ['am', _hi_rule],
                ['ar', _ar_rule],
                ['az', _es_rule],
                ['be', _be_rule],
                ['bg', _es_rule],
                ['bn', _hi_rule],
                ['br', _br_rule],
                ['bs', _sr_rule],
                ['ca', _en_rule],
                ['chr', _es_rule],
                ['cs', _cs_rule],
                ['cy', _cy_rule],
                ['da', _da_rule],
                ['de', _en_rule],
                ['de_AT', _en_rule],
                ['de_CH', _en_rule],
                ['el', _es_rule],
                ['en', _en_rule],
                ['en_AU', _en_rule],
                ['en_CA', _en_rule],
                ['en_GB', _en_rule],
                ['en_IE', _en_rule],
                ['en_IN', _en_rule],
                ['en_SG', _en_rule],
                ['en_US', _en_rule],
                ['en_ZA', _en_rule],
                ['es', _es_rule],
                ['es_419', _es_rule],
                ['es_ES', _es_rule],
                ['es_MX', _es_rule],
                ['es_US', _es_rule],
                ['et', _en_rule],
                ['eu', _es_rule],
                ['fa', _hi_rule],
                ['fi', _en_rule],
                ['fil', _fil_rule],
                ['fr', _fr_rule],
                ['fr_CA', _fr_rule],
                ['ga', _ga_rule],
                ['gl', _en_rule],
                ['gsw', _es_rule],
                ['gu', _hi_rule],
                ['haw', _es_rule],
                ['he', _he_rule],
                ['hi', _hi_rule],
                ['hr', _sr_rule],
                ['hu', _es_rule],
                ['hy', _fr_rule],
                ['id', _default_rule],
                ['in', _default_rule],
                ['is', _is_rule],
                ['it', _en_rule],
                ['iw', _he_rule],
                ['ja', _default_rule],
                ['ka', _es_rule],
                ['kk', _es_rule],
                ['km', _default_rule],
                ['kn', _hi_rule],
                ['ko', _default_rule],
                ['ky', _es_rule],
                ['ln', _ak_rule],
                ['lo', _default_rule],
                ['lt', _lt_rule],
                ['lv', _lv_rule],
                ['mk', _mk_rule],
                ['ml', _es_rule],
                ['mn', _es_rule],
                ['mo', _ro_rule],
                ['mr', _hi_rule],
                ['ms', _default_rule],
                ['mt', _mt_rule],
                ['my', _default_rule],
                ['nb', _es_rule],
                ['ne', _es_rule],
                ['nl', _en_rule],
                ['no', _es_rule],
                ['no_NO', _es_rule],
                ['or', _es_rule],
                ['pa', _ak_rule],
                ['pl', _pl_rule],
                ['pt', _pt_rule],
                ['pt_BR', _pt_rule],
                ['pt_PT', _pt_PT_rule],
                ['ro', _ro_rule],
                ['ru', _ru_rule],
                ['sh', _sr_rule],
                ['si', _si_rule],
                ['sk', _cs_rule],
                ['sl', _sl_rule],
                ['sq', _es_rule],
                ['sr', _sr_rule],
                ['sr_Latn', _sr_rule],
                ['sv', _en_rule],
                ['sw', _en_rule],
                ['ta', _es_rule],
                ['te', _es_rule],
                ['th', _default_rule],
                ['tl', _fil_rule],
                ['tr', _es_rule],
                ['uk', _ru_rule],
                ['ur', _en_rule],
                ['uz', _es_rule],
                ['vi', _default_rule],
                ['zh', _default_rule],
                ['zh_CN', _default_rule],
                ['zh_HK', _default_rule],
                ['zh_TW', _default_rule],
                ['zu', _hi_rule],
                ['default', _default_rule]
            ]);
        }
        return this.__$pluralRules;
    }
    static set pluralRules(__$value) {
        this.__$pluralRules = __$value;
    }
}
//# sourceMappingURL=plural_rules.js.map