import { OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
export declare var initializeInternalMessageLookup: (lookupFunction: Function) => void;
export declare var computeMessageName: (name: string, text: string, meaning: string) => string;
export declare class MessageLookup {
    lookupMessage(message_str: string, locale: string, name: string, args: core.DartList<any>, meaning: string, _namedArguments?: {
        ifAbsent?: (message_str: string, args: core.DartList<any>) => any;
    }): string;
    addLocale(localeName: string, findLocale: Function): void;
    constructor();
    MessageLookup(): void;
}
export declare class UninitializedLocaleData<F> implements MessageLookup {
    message: string;
    fallbackData: F;
    MessageLookup(): void;
    constructor(message: string, fallbackData: F);
    UninitializedLocaleData(message: string, fallbackData: F): void;
    [OperatorMethods.INDEX](key: string): any;
    private static __$throwOnFallback;
    static throwOnFallback: boolean;
    _badMessages: core.DartList<string>;
    _reportErrors(): void;
    readonly _uninitializedMessages: string;
    lookupMessage(message_str: string, locale: string, name: string, args: core.DartList<any>, meaning: string, _namedArguments?: {
        ifAbsent?: (message_str: string, args: core.DartList<any>) => any;
    }): string;
    findLocale(locale: string): string;
    readonly keys: core.DartList<string>;
    containsKey(key: string): boolean;
    _throwException(): any;
    addLocale(localeName: string, findLocale: Function): void;
}
export declare class LocaleDataException {
    message: string;
    constructor(message: string);
    LocaleDataException(message: string): void;
    toString(): string;
}
export declare class LocaleDataReader {
    read(locale: string): async.Future<any>;
    constructor();
    LocaleDataReader(): void;
}
export declare class properties {
    private static __$messageLookup;
    static messageLookup: MessageLookup;
}
