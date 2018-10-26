import { op, Op } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as lib4 from "./src/date_format_internal";
export var initializeDateFormattingCustom = (_namedArguments) => {
    let { locale, symbols, patterns } = Object.assign({}, _namedArguments);
    lib4.initializeDateSymbols(_emptySymbols);
    lib4.initializeDatePatterns(_emptyPatterns);
    if (op(Op.EQUALS, symbols, null))
        throw new core.ArgumentError("Missing DateTime formatting symbols");
    if (patterns == null)
        throw new core.ArgumentError("Missing DateTime formatting patterns");
    if (locale != symbols.NAME)
        throw new core.ArgumentError.value(new core.DartList.literal(locale, symbols.NAME), "Locale does not match symbols.NAME");
    op(Op.INDEX_ASSIGN, lib4.properties.dateTimeSymbols, symbols.NAME, symbols);
    op(Op.INDEX_ASSIGN, lib4.properties.dateTimePatterns, symbols.NAME, patterns);
};
export var _emptySymbols = () => {
    return new core.DartMap.literal([]);
};
export var _emptyPatterns = () => {
    return new core.DartMap.literal([]);
};
export class properties {
}
//# sourceMappingURL=date_symbol_data_custom.js.map