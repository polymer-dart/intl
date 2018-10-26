/** Library asset:intl/lib/src/lazy_locale_data.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./intl_helpers";
import * as convert from "@dart2ts/dart/convert";

@DartClass
export class LazyLocaleData {
    map : core.DartMap<any,any>;

    _reader : lib3.LocaleDataReader;

    availableLocales : core.DartList<any>;

    _creationFunction : Function;

    availableLocaleSet : core.DartSet<any>;

    private static __$jsonDecoder;
    static get jsonDecoder() { 
        if (this.__$jsonDecoder===undefined) {
            this.__$jsonDecoder = new convert.JsonCodec();
        }
        return this.__$jsonDecoder;
    }

    constructor(_reader : lib3.LocaleDataReader,_creationFunction : Function,keys : core.DartList<any>) {
    }
    @defaultConstructor
    LazyLocaleData(_reader : lib3.LocaleDataReader,_creationFunction : Function,keys : core.DartList<any>) {
        this._reader = _reader;
        this._creationFunction = _creationFunction;
        this.map = new core.DartMap<any,any>();
        this.availableLocales = keys;
        this.availableLocaleSet = new core.DartSet.from(this.availableLocales);
    }
    containsKey(locale : string) : boolean {
        return this.availableLocaleSet.contains(locale);
    }
    get keys() : core.DartList<any> {
        return this.availableLocales;
    }
    [OperatorMethods.INDEX](localeName : string) {
        if (this.containsKey(localeName)) {
            let data = this.map.get(localeName);
            if (op(Op.EQUALS,data,null)) {
                throw new lib3.LocaleDataException(`Locale ${localeName} has not been initialized.` + ` Call initializeDateFormatting(${localeName}, <data url>) first`);
            }else {
                return data;
            }
        }else {
            this.unsupportedLocale(localeName);
        }
    }
    unsupportedLocale(localeName : any) {
        throw new lib3.LocaleDataException(`Locale ${localeName} has no data available`);
    }
    initLocale(localeName : string) : async.Future<any> {
        let data = this._reader.read(localeName);
        return this.jsonData(data).then((input : any) =>  {
            this.map.set(localeName,this._creationFunction(input));
        });
    }
    jsonData(input : async.Future<any>) : async.Future<any> {
        return input.then((response : any) =>  {
            return LazyLocaleData.jsonDecoder.decode(response);
        });
    }
}

export class properties {
}
