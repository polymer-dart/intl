/** Library asset:intl/lib/date_symbol_data_custom.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./date_symbols";
import * as lib4 from "./src/date_format_internal";

export var initializeDateFormattingCustom : (_namedArguments? : {locale? : string,symbols? : lib3.DateSymbols,patterns? : core.DartMap<string,string>}) => void = (_namedArguments? : {locale? : string,symbols? : lib3.DateSymbols,patterns? : core.DartMap<string,string>}) : void =>  {
    let {locale,symbols,patterns} = Object.assign({
    }, _namedArguments );
    lib4.initializeDateSymbols(_emptySymbols);
    lib4.initializeDatePatterns(_emptyPatterns);
    if (op(Op.EQUALS,symbols,null)) throw new core.ArgumentError("Missing DateTime formatting symbols");
    if (patterns == null) throw new core.ArgumentError("Missing DateTime formatting patterns");
    if (locale != symbols.NAME) throw new core.ArgumentError.value(new core.DartList.literal(locale,symbols.NAME),"Locale does not match symbols.NAME");
    op(Op.INDEX_ASSIGN,lib4.properties.dateTimeSymbols,symbols.NAME,symbols);
    op(Op.INDEX_ASSIGN,lib4.properties.dateTimePatterns,symbols.NAME,patterns);
};
export var _emptySymbols : () => core.DartMap<string,lib3.DateSymbols> = () : core.DartMap<string,lib3.DateSymbols> =>  {
    return new core.DartMap.literal([
    ]);
};
export var _emptyPatterns : () => core.DartMap<string,core.DartMap<string,string>> = () : core.DartMap<string,core.DartMap<string,string>> =>  {
    return new core.DartMap.literal([
    ]);
};
export class properties {
}
