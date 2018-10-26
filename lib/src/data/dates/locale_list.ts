/** Library asset:intl/lib/src/data/dates/locale_list.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

export class properties {
    private static __$availableLocalesForDateFormatting;
    static get availableLocalesForDateFormatting() { 
        if (this.__$availableLocalesForDateFormatting===undefined) {
            this.__$availableLocalesForDateFormatting = new core.DartList.literal("en_ISO","af","am","ar","ar_DZ","az","be","bg","bn","br","bs","ca","chr","cs","cy","da","de","de_AT","de_CH","el","en","en_AU","en_CA","en_GB","en_IE","en_IN","en_MY","en_SG","en_US","en_ZA","es","es_419","es_ES","es_MX","es_US","et","eu","fa","fi","fil","fr","fr_CA","fr_CH","ga","gl","gsw","gu","haw","he","hi","hr","hu","hy","id","in","is","it","it_CH","iw","ja","ka","kk","km","kn","ko","ky","ln","lo","lt","lv","mk","ml","mn","mr","ms","mt","my","nb","ne","nl","no","no_NO","or","pa","pl","ps","pt","pt_BR","pt_PT","ro","ru","si","sk","sl","sq","sr","sr_Latn","sv","sw","ta","te","th","tl","tr","uk","ur","uz","vi","zh","zh_CN","zh_HK","zh_TW","zu");
        }
        return this.__$availableLocalesForDateFormatting;
    }
    static set availableLocalesForDateFormatting(__$value : any)  { 
        this.__$availableLocalesForDateFormatting = __$value;
    }

}
