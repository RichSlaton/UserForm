import { Document } from "./Document";
import { DocumentArray, CallbackType } from "./General";
import { AWSError } from "aws-sdk";
export interface PopulateSettings {
    properties?: string[] | string | boolean;
}
interface PopulateInternalSettings {
    parentKey?: string;
}
export declare function PopulateDocument(this: Document): Promise<Document>;
export declare function PopulateDocument(this: Document, callback: CallbackType<Document, AWSError>): void;
export declare function PopulateDocument(this: Document, settings: PopulateSettings): Promise<Document>;
export declare function PopulateDocument(this: Document, settings: PopulateSettings, callback: CallbackType<Document, AWSError>): void;
export declare function PopulateDocument(this: Document, settings: PopulateSettings, callback: CallbackType<Document, AWSError> | null, internalSettings?: PopulateInternalSettings): void;
export declare function PopulateDocuments(this: DocumentArray<Document>): Promise<DocumentArray<Document>>;
export declare function PopulateDocuments(this: DocumentArray<Document>, callback: CallbackType<DocumentArray<Document>, AWSError>): void;
export declare function PopulateDocuments(this: DocumentArray<Document>, settings: PopulateSettings): Promise<DocumentArray<Document>>;
export declare function PopulateDocuments(this: DocumentArray<Document>, settings: PopulateSettings, callback: CallbackType<DocumentArray<Document>, AWSError>): void;
export {};
