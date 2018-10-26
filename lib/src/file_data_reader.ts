/** Library asset:intl/lib/src/file_data_reader.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
//import * as lib4 from "@dart2ts.packages/path/lib/path";
//import * as io from "@dart2ts/dart/io";

@DartClass
@Implements(lib3.LocaleDataReader)
export class FileDataReader implements lib3.LocaleDataReader {
    path : string;

    constructor(path : string) {
    }
    @defaultConstructor
    FileDataReader(path : string) {
        this.path = path;
    }

    @Abstract
    LocaleDataReader() {
        
    }

    read(locale : string) : async.Future<any> {
        throw "unimplemented";
        /*
        let file = new io.File(lib4.join(this.path,`${locale}.json`));
        return file.readAsString();*/
    }
}

export class properties {
}
