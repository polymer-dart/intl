/** Library asset:intl/lib/intl_standalone.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl";
//import * as io from "@dart2ts/dart/io";

export var findSystemLocale : () => async.Future<string> = () : async.Future<string> =>  {
    try {
        lib3.Intl.systemLocale = lib3.Intl.canonicalizedLocale(/*io.Platform.localeName*/"en_US");
    } catch (__error__) {

        {
            let e = __error__;
            return new async.Future.value();
        }
    }
    return new async.Future.value(lib3.Intl.systemLocale);
};
export class properties {
}
