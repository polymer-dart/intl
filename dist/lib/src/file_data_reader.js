var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass, Implements, Abstract } from "@dart2ts/dart/utils";
import * as lib3 from "./intl_helpers";
//import * as lib4 from "@dart2ts.packages/path/lib/path";
//import * as io from "@dart2ts/dart/io";
let FileDataReader = class FileDataReader {
    constructor(path) {
    }
    FileDataReader(path) {
        this.path = path;
    }
    LocaleDataReader() {
    }
    read(locale) {
        throw "unimplemented";
        /*
        let file = new io.File(lib4.join(this.path,`${locale}.json`));
        return file.readAsString();*/
    }
};
__decorate([
    defaultConstructor
], FileDataReader.prototype, "FileDataReader", null);
__decorate([
    Abstract
], FileDataReader.prototype, "LocaleDataReader", null);
FileDataReader = __decorate([
    DartClass,
    Implements(lib3.LocaleDataReader)
], FileDataReader);
export { FileDataReader };
export class properties {
}
//# sourceMappingURL=file_data_reader.js.map