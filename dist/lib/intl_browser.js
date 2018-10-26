import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl";
export var findSystemLocale = () => {
    lib3.Intl.systemLocale = lib3.Intl.canonicalizedLocale(window.navigator.language);
    return new async.Future.value(lib3.Intl.systemLocale);
};
export class properties {
}
//# sourceMappingURL=intl_browser.js.map