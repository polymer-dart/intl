import { OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as lib3 from "./src/intl_helpers";
export declare class CompositeMessageLookup implements lib3.MessageLookup {
    availableMessages: core.DartMap<string, MessageLookupByLibrary>;
    MessageLookup(): void;
    localeExists(localeName: any): boolean;
    _lastLocale: string;
    _lastLookup: MessageLookupByLibrary;
    lookupMessage(message_str: string, locale: string, name: string, args: core.DartList<any>, meaning: string, _namedArguments?: {
        ifAbsent?: (message_str: string, args: core.DartList<any>) => any;
    }): string;
    _lookupMessageCatalog(locale: string): MessageLookupByLibrary;
    addLocale(localeName: string, findLocale: Function): void;
    constructor();
    CompositeMessageLookup(): void;
}
export declare class MessageLookupByLibrary {
    lookupMessage(message_str: string, locale: string, name: string, args: core.DartList<any>, meaning: string, _namedArguments?: {
        ifAbsent?: (message_str: string, args: core.DartList<any>) => any;
    }): string;
    evaluateMessage(translation: any, args: core.DartList<any>): string;
    [OperatorMethods.INDEX](messageName: string): any;
    readonly messages: core.DartMap<string, any>;
    readonly localeName: string;
    toString(): string;
    static simpleMessage(translatedString: any): () => any;
    constructor();
    MessageLookupByLibrary(): void;
}
export declare class properties {
}
