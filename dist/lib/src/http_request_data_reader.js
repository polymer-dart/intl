var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass, Implements, Abstract } from "@dart2ts/dart/utils";
import * as lib3 from "./intl_helpers";
import * as lib4 from "@dart2ts.packages/html5/lib/html";
let HttpRequestDataReader = class HttpRequestDataReader {
    constructor(url) {
    }
    HttpRequestDataReader(url) {
        this.url = url;
    }
    LocaleDataReader() {
    }
    read(locale) {
        return this._getString(`${this.url}${locale}.json`).then((r) => {
            return r.responseText;
        });
    }
    _getString(url) {
        let xhr = new lib4.HttpRequest({
            url: url, isAsync: true, method: 'GET'
        });
        return xhr.send();
    }
};
__decorate([
    defaultConstructor
], HttpRequestDataReader.prototype, "HttpRequestDataReader", null);
__decorate([
    Abstract
], HttpRequestDataReader.prototype, "LocaleDataReader", null);
HttpRequestDataReader = __decorate([
    DartClass,
    Implements(lib3.LocaleDataReader)
], HttpRequestDataReader);
export { HttpRequestDataReader };
export class properties {
}
//# sourceMappingURL=http_request_data_reader.js.map