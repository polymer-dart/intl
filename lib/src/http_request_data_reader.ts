/** Library asset:intl/lib/src/http_request_data_reader.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
import * as lib4 from "@dart2ts.packages/html5/lib/html";

@DartClass
@Implements(lib3.LocaleDataReader)
export class HttpRequestDataReader implements lib3.LocaleDataReader {
    url : string;

    constructor(url : string) {
    }
    @defaultConstructor
    HttpRequestDataReader(url : string) {
        this.url = url;
    }

    @Abstract
    LocaleDataReader() {
    }

    read(locale : string) : async.Future<any> {
        return this._getString(`${this.url}${locale}.json`).then((r : any) =>  {
            return r.responseText;
        });
    }
    _getString(url : string) : async.Future<XMLHttpRequest> {
        let xhr : lib4.HttpRequest = new lib4.HttpRequest({
            url : url,isAsync : true,method : 'GET'});
        return xhr.send();
    }
}

export class properties {
}
