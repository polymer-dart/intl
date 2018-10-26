import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl";
//import * as io from "@dart2ts/dart/io";
export var findSystemLocale = () => {
    try {
        lib3.Intl.systemLocale = lib3.Intl.canonicalizedLocale(/*io.Platform.localeName*/ "en_US");
    }
    catch (__error__) {
        {
            let e = __error__;
            return new async.Future.value();
        }
    }
    return new async.Future.value(lib3.Intl.systemLocale);
};
export class properties {
}
//# sourceMappingURL=intl_standalone.js.map