import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
export declare class HttpRequestDataReader implements lib3.LocaleDataReader {
    url: string;
    constructor(url: string);
    HttpRequestDataReader(url: string): void;
    LocaleDataReader(): void;
    read(locale: string): async.Future<any>;
    _getString(url: string): async.Future<XMLHttpRequest>;
}
export declare class properties {
}
