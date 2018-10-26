var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LazyLocaleData_1;
import { defaultConstructor, DartClass, op, Op, OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as lib3 from "./intl_helpers";
import * as convert from "@dart2ts/dart/convert";
let LazyLocaleData = LazyLocaleData_1 = class LazyLocaleData {
    constructor(_reader, _creationFunction, keys) {
    }
    static get jsonDecoder() {
        if (this.__$jsonDecoder === undefined) {
            this.__$jsonDecoder = new convert.JsonCodec();
        }
        return this.__$jsonDecoder;
    }
    LazyLocaleData(_reader, _creationFunction, keys) {
        this._reader = _reader;
        this._creationFunction = _creationFunction;
        this.map = new core.DartMap();
        this.availableLocales = keys;
        this.availableLocaleSet = new core.DartSet.from(this.availableLocales);
    }
    containsKey(locale) {
        return this.availableLocaleSet.contains(locale);
    }
    get keys() {
        return this.availableLocales;
    }
    [OperatorMethods.INDEX](localeName) {
        if (this.containsKey(localeName)) {
            let data = this.map.get(localeName);
            if (op(Op.EQUALS, data, null)) {
                throw new lib3.LocaleDataException(`Locale ${localeName} has not been initialized.` + ` Call initializeDateFormatting(${localeName}, <data url>) first`);
            }
            else {
                return data;
            }
        }
        else {
            this.unsupportedLocale(localeName);
        }
    }
    unsupportedLocale(localeName) {
        throw new lib3.LocaleDataException(`Locale ${localeName} has no data available`);
    }
    initLocale(localeName) {
        let data = this._reader.read(localeName);
        return this.jsonData(data).then((input) => {
            this.map.set(localeName, this._creationFunction(input));
        });
    }
    jsonData(input) {
        return input.then((response) => {
            return LazyLocaleData_1.jsonDecoder.decode(response);
        });
    }
};
__decorate([
    defaultConstructor
], LazyLocaleData.prototype, "LazyLocaleData", null);
LazyLocaleData = LazyLocaleData_1 = __decorate([
    DartClass
], LazyLocaleData);
export { LazyLocaleData };
export class properties {
}
//# sourceMappingURL=lazy_locale_data.js.map