import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
export declare class FileDataReader implements lib3.LocaleDataReader {
    path: string;
    constructor(path: string);
    FileDataReader(path: string): void;
    LocaleDataReader(): void;
    read(locale: string): async.Future<any>;
}
export declare class properties {
}
