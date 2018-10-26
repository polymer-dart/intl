/** Library asset:intl/lib/date_symbols.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

@DartClass
export class DateSymbols {
    NAME : string;

    ERAS : core.DartList<string>;
    ERANAMES : core.DartList<string>;
    NARROWMONTHS : core.DartList<string>;
    STANDALONENARROWMONTHS : core.DartList<string>;
    MONTHS : core.DartList<string>;
    STANDALONEMONTHS : core.DartList<string>;
    SHORTMONTHS : core.DartList<string>;
    STANDALONESHORTMONTHS : core.DartList<string>;
    WEEKDAYS : core.DartList<string>;
    STANDALONEWEEKDAYS : core.DartList<string>;
    SHORTWEEKDAYS : core.DartList<string>;
    STANDALONESHORTWEEKDAYS : core.DartList<string>;
    NARROWWEEKDAYS : core.DartList<string>;
    STANDALONENARROWWEEKDAYS : core.DartList<string>;
    SHORTQUARTERS : core.DartList<string>;
    QUARTERS : core.DartList<string>;
    AMPMS : core.DartList<string>;
    DATEFORMATS : core.DartList<string>;
    TIMEFORMATS : core.DartList<string>;
    DATETIMEFORMATS : core.DartList<string>;

    AVAILABLEFORMATS : core.DartMap<string,string>;

    FIRSTDAYOFWEEK : number;

    WEEKENDRANGE : core.DartList<number>;

    FIRSTWEEKCUTOFFDAY : number;

    ZERODIGIT : string;

    constructor(_namedArguments? : {NAME? : string,ERAS? : core.DartList<string>,ERANAMES? : core.DartList<string>,NARROWMONTHS? : core.DartList<string>,STANDALONENARROWMONTHS? : core.DartList<string>,MONTHS? : core.DartList<string>,STANDALONEMONTHS? : core.DartList<string>,SHORTMONTHS? : core.DartList<string>,STANDALONESHORTMONTHS? : core.DartList<string>,WEEKDAYS? : core.DartList<string>,STANDALONEWEEKDAYS? : core.DartList<string>,SHORTWEEKDAYS? : core.DartList<string>,STANDALONESHORTWEEKDAYS? : core.DartList<string>,NARROWWEEKDAYS? : core.DartList<string>,STANDALONENARROWWEEKDAYS? : core.DartList<string>,SHORTQUARTERS? : core.DartList<string>,QUARTERS? : core.DartList<string>,AMPMS? : core.DartList<string>,ZERODIGIT? : string,DATEFORMATS? : core.DartList<string>,TIMEFORMATS? : core.DartList<string>,AVAILABLEFORMATS? : core.DartMap<string,string>,FIRSTDAYOFWEEK? : number,WEEKENDRANGE? : core.DartList<number>,FIRSTWEEKCUTOFFDAY? : number,DATETIMEFORMATS? : core.DartList<string>}) {
    }
    @defaultConstructor
    DateSymbols(_namedArguments? : {NAME? : string,ERAS? : core.DartList<string>,ERANAMES? : core.DartList<string>,NARROWMONTHS? : core.DartList<string>,STANDALONENARROWMONTHS? : core.DartList<string>,MONTHS? : core.DartList<string>,STANDALONEMONTHS? : core.DartList<string>,SHORTMONTHS? : core.DartList<string>,STANDALONESHORTMONTHS? : core.DartList<string>,WEEKDAYS? : core.DartList<string>,STANDALONEWEEKDAYS? : core.DartList<string>,SHORTWEEKDAYS? : core.DartList<string>,STANDALONESHORTWEEKDAYS? : core.DartList<string>,NARROWWEEKDAYS? : core.DartList<string>,STANDALONENARROWWEEKDAYS? : core.DartList<string>,SHORTQUARTERS? : core.DartList<string>,QUARTERS? : core.DartList<string>,AMPMS? : core.DartList<string>,ZERODIGIT? : string,DATEFORMATS? : core.DartList<string>,TIMEFORMATS? : core.DartList<string>,AVAILABLEFORMATS? : core.DartMap<string,string>,FIRSTDAYOFWEEK? : number,WEEKENDRANGE? : core.DartList<number>,FIRSTWEEKCUTOFFDAY? : number,DATETIMEFORMATS? : core.DartList<string>}) {
        let {NAME,ERAS,ERANAMES,NARROWMONTHS,STANDALONENARROWMONTHS,MONTHS,STANDALONEMONTHS,SHORTMONTHS,STANDALONESHORTMONTHS,WEEKDAYS,STANDALONEWEEKDAYS,SHORTWEEKDAYS,STANDALONESHORTWEEKDAYS,NARROWWEEKDAYS,STANDALONENARROWWEEKDAYS,SHORTQUARTERS,QUARTERS,AMPMS,ZERODIGIT,DATEFORMATS,TIMEFORMATS,AVAILABLEFORMATS,FIRSTDAYOFWEEK,WEEKENDRANGE,FIRSTWEEKCUTOFFDAY,DATETIMEFORMATS} = Object.assign({
        }, _namedArguments );
        this.NAME = NAME;
        this.ERAS = ERAS;
        this.ERANAMES = ERANAMES;
        this.NARROWMONTHS = NARROWMONTHS;
        this.STANDALONENARROWMONTHS = STANDALONENARROWMONTHS;
        this.MONTHS = MONTHS;
        this.STANDALONEMONTHS = STANDALONEMONTHS;
        this.SHORTMONTHS = SHORTMONTHS;
        this.STANDALONESHORTMONTHS = STANDALONESHORTMONTHS;
        this.WEEKDAYS = WEEKDAYS;
        this.STANDALONEWEEKDAYS = STANDALONEWEEKDAYS;
        this.SHORTWEEKDAYS = SHORTWEEKDAYS;
        this.STANDALONESHORTWEEKDAYS = STANDALONESHORTWEEKDAYS;
        this.NARROWWEEKDAYS = NARROWWEEKDAYS;
        this.STANDALONENARROWWEEKDAYS = STANDALONENARROWWEEKDAYS;
        this.SHORTQUARTERS = SHORTQUARTERS;
        this.QUARTERS = QUARTERS;
        this.AMPMS = AMPMS;
        this.ZERODIGIT = ZERODIGIT;
        this.DATEFORMATS = DATEFORMATS;
        this.TIMEFORMATS = TIMEFORMATS;
        this.AVAILABLEFORMATS = AVAILABLEFORMATS;
        this.FIRSTDAYOFWEEK = FIRSTDAYOFWEEK;
        this.WEEKENDRANGE = WEEKENDRANGE;
        this.FIRSTWEEKCUTOFFDAY = FIRSTWEEKCUTOFFDAY;
        this.DATETIMEFORMATS = DATETIMEFORMATS;
    }
    @namedConstructor
    deserializeFromMap(map : core.DartMap<any,any>) {
        var _getStringList : (name : string) => core.DartList<string> = (name : string) : core.DartList<string> =>  {
            return new core.DartList.from(map.get(name));
        };
        this.NAME = map.get("NAME");
        this.ERAS = _getStringList("ERAS");
        this.ERANAMES = _getStringList("ERANAMES");
        this.NARROWMONTHS = _getStringList("NARROWMONTHS");
        this.STANDALONENARROWMONTHS = _getStringList("STANDALONENARROWMONTHS");
        this.MONTHS = _getStringList("MONTHS");
        this.STANDALONEMONTHS = _getStringList("STANDALONEMONTHS");
        this.SHORTMONTHS = _getStringList("SHORTMONTHS");
        this.STANDALONESHORTMONTHS = _getStringList("STANDALONESHORTMONTHS");
        this.WEEKDAYS = _getStringList("WEEKDAYS");
        this.STANDALONEWEEKDAYS = _getStringList("STANDALONEWEEKDAYS");
        this.SHORTWEEKDAYS = _getStringList("SHORTWEEKDAYS");
        this.STANDALONESHORTWEEKDAYS = _getStringList("STANDALONESHORTWEEKDAYS");
        this.NARROWWEEKDAYS = _getStringList("NARROWWEEKDAYS");
        this.STANDALONENARROWWEEKDAYS = _getStringList("STANDALONENARROWWEEKDAYS");
        this.SHORTQUARTERS = _getStringList("SHORTQUARTERS");
        this.QUARTERS = _getStringList("QUARTERS");
        this.AMPMS = _getStringList("AMPMS");
        this.ZERODIGIT = map.get("ZERODIGIT");
        this.DATEFORMATS = _getStringList("DATEFORMATS");
        this.TIMEFORMATS = _getStringList("TIMEFORMATS");
        this.AVAILABLEFORMATS = new core.DartMap.from((map.get("AVAILABLEFORMATS") || new core.DartMap.literal([
        ])));
        this.FIRSTDAYOFWEEK = map.get("FIRSTDAYOFWEEK");
        this.WEEKENDRANGE = new core.DartList.from(map.get("WEEKENDRANGE"));
        this.FIRSTWEEKCUTOFFDAY = map.get("FIRSTWEEKCUTOFFDAY");
        this.DATETIMEFORMATS = _getStringList("DATETIMEFORMATS");
    }
    static deserializeFromMap : new(map : core.DartMap<any,any>) => DateSymbols;

    serializeToMap() : core.DartMap<any,any> {
        let basicMap = this._serializeToMap();
        if (this.ZERODIGIT != null && this.ZERODIGIT != '') {
            basicMap.set("ZERODIGIT",this.ZERODIGIT);
        }
        return basicMap;
    }
    _serializeToMap() : core.DartMap<any,any> {
        return new core.DartMap.literal<any,any>([
            ["NAME",this.NAME],
            ["ERAS",this.ERAS],
            ["ERANAMES",this.ERANAMES],
            ["NARROWMONTHS",this.NARROWMONTHS],
            ["STANDALONENARROWMONTHS",this.STANDALONENARROWMONTHS],
            ["MONTHS",this.MONTHS],
            ["STANDALONEMONTHS",this.STANDALONEMONTHS],
            ["SHORTMONTHS",this.SHORTMONTHS],
            ["STANDALONESHORTMONTHS",this.STANDALONESHORTMONTHS],
            ["WEEKDAYS",this.WEEKDAYS],
            ["STANDALONEWEEKDAYS",this.STANDALONEWEEKDAYS],
            ["SHORTWEEKDAYS",this.SHORTWEEKDAYS],
            ["STANDALONESHORTWEEKDAYS",this.STANDALONESHORTWEEKDAYS],
            ["NARROWWEEKDAYS",this.NARROWWEEKDAYS],
            ["STANDALONENARROWWEEKDAYS",this.STANDALONENARROWWEEKDAYS],
            ["SHORTQUARTERS",this.SHORTQUARTERS],
            ["QUARTERS",this.QUARTERS],
            ["AMPMS",this.AMPMS],
            ["DATEFORMATS",this.DATEFORMATS],
            ["TIMEFORMATS",this.TIMEFORMATS],
            ["AVAILABLEFORMATS",this.AVAILABLEFORMATS],
            ["FIRSTDAYOFWEEK",this.FIRSTDAYOFWEEK],
            ["WEEKENDRANGE",this.WEEKENDRANGE],
            ["FIRSTWEEKCUTOFFDAY",this.FIRSTWEEKCUTOFFDAY],
            ["DATETIMEFORMATS",this.DATETIMEFORMATS]]);
    }
    toString() {
        return this.NAME;
    }
}

export class properties {
    private static __$en_USSymbols;
    static get en_USSymbols() { 
        if (this.__$en_USSymbols===undefined) {
            this.__$en_USSymbols = new DateSymbols({
                NAME : "en_US",ERAS : new core.DartList.literal('BC','AD'),ERANAMES : new core.DartList.literal('Before Christ','Anno Domini'),NARROWMONTHS : new core.DartList.literal('J','F','M','A','M','J','J','A','S','O','N','D'),STANDALONENARROWMONTHS : new core.DartList.literal('J','F','M','A','M','J','J','A','S','O','N','D'),MONTHS : new core.DartList.literal('January','February','March','April','May','June','July','August','September','October','November','December'),STANDALONEMONTHS : new core.DartList.literal('January','February','March','April','May','June','July','August','September','October','November','December'),SHORTMONTHS : new core.DartList.literal('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'),STANDALONESHORTMONTHS : new core.DartList.literal('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'),WEEKDAYS : new core.DartList.literal('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),STANDALONEWEEKDAYS : new core.DartList.literal('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),SHORTWEEKDAYS : new core.DartList.literal('Sun','Mon','Tue','Wed','Thu','Fri','Sat'),STANDALONESHORTWEEKDAYS : new core.DartList.literal('Sun','Mon','Tue','Wed','Thu','Fri','Sat'),NARROWWEEKDAYS : new core.DartList.literal('S','M','T','W','T','F','S'),STANDALONENARROWWEEKDAYS : new core.DartList.literal('S','M','T','W','T','F','S'),SHORTQUARTERS : new core.DartList.literal('Q1','Q2','Q3','Q4'),QUARTERS : new core.DartList.literal('1st quarter','2nd quarter','3rd quarter','4th quarter'),AMPMS : new core.DartList.literal('AM','PM'),DATEFORMATS : new core.DartList.literal('EEEE, MMMM d, y','MMMM d, y','MMM d, y','M/d/yy'),TIMEFORMATS : new core.DartList.literal('h:mm:ss a zzzz','h:mm:ss a z','h:mm:ss a','h:mm a'),FIRSTDAYOFWEEK : 6,WEEKENDRANGE : new core.DartList.literal(5,6),FIRSTWEEKCUTOFFDAY : 5,DATETIMEFORMATS : new core.DartList.literal('{1} \'at\' {0}','{1} \'at\' {0}','{1}, {0}','{1}, {0}')});
        }
        return this.__$en_USSymbols;
    }
    static set en_USSymbols(__$value : any)  { 
        this.__$en_USSymbols = __$value;
    }

    private static __$en_USPatterns;
    static get en_USPatterns() { 
        if (this.__$en_USPatterns===undefined) {
            this.__$en_USPatterns = new core.DartMap.literal([
                ['d','d'],
                ['E','EEE'],
                ['EEEE','EEEE'],
                ['LLL','LLL'],
                ['LLLL','LLLL'],
                ['M','L'],
                ['Md','M/d'],
                ['MEd','EEE, M/d'],
                ['MMM','LLL'],
                ['MMMd','MMM d'],
                ['MMMEd','EEE, MMM d'],
                ['MMMM','LLLL'],
                ['MMMMd','MMMM d'],
                ['MMMMEEEEd','EEEE, MMMM d'],
                ['QQQ','QQQ'],
                ['QQQQ','QQQQ'],
                ['y','y'],
                ['yM','M/y'],
                ['yMd','M/d/y'],
                ['yMEd','EEE, M/d/y'],
                ['yMMM','MMM y'],
                ['yMMMd','MMM d, y'],
                ['yMMMEd','EEE, MMM d, y'],
                ['yMMMM','MMMM y'],
                ['yMMMMd','MMMM d, y'],
                ['yMMMMEEEEd','EEEE, MMMM d, y'],
                ['yQQQ','QQQ y'],
                ['yQQQQ','QQQQ y'],
                ['H','HH'],
                ['Hm','HH:mm'],
                ['Hms','HH:mm:ss'],
                ['j','h a'],
                ['jm','h:mm a'],
                ['jms','h:mm:ss a'],
                ['jmv','h:mm a v'],
                ['jmz','h:mm a z'],
                ['jz','h a z'],
                ['m','m'],
                ['ms','mm:ss'],
                ['s','s'],
                ['v','v'],
                ['z','z'],
                ['zzzz','zzzz'],
                ['ZZZZ','ZZZZ']]);
        }
        return this.__$en_USPatterns;
    }
    static set en_USPatterns(__$value : any)  { 
        this.__$en_USPatterns = __$value;
    }

}
