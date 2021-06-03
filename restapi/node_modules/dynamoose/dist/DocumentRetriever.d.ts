import { Condition, ConditionInitalizer, BasicOperators } from "./Condition";
import { Model } from "./Model";
import { Document } from "./Document";
import { CallbackType, ObjectType, DocumentArray, SortOrder } from "./General";
import { AWSError } from "aws-sdk";
declare enum DocumentRetrieverTypes {
    scan = "scan",
    query = "query"
}
interface DocumentRetrieverTypeInformation {
    type: DocumentRetrieverTypes;
    pastTense: string;
}
declare abstract class DocumentRetriever {
    internalSettings?: {
        model: Model<Document>;
        typeInformation: DocumentRetrieverTypeInformation;
    };
    settings: {
        condition: Condition;
        limit?: number;
        all?: {
            delay: number;
            max: number;
        };
        startAt?: any;
        attributes?: string[];
        index?: string;
        consistent?: boolean;
        count?: boolean;
        parallel?: number;
        sort?: SortOrder;
    };
    getRequest: (this: DocumentRetriever) => Promise<any>;
    all: (this: DocumentRetriever, delay?: number, max?: number) => DocumentRetriever;
    limit: (this: DocumentRetriever, value: number) => DocumentRetriever;
    startAt: (this: DocumentRetriever, value: ObjectType) => DocumentRetriever;
    attributes: (this: DocumentRetriever, value: string[]) => DocumentRetriever;
    count: (this: DocumentRetriever) => DocumentRetriever;
    consistent: (this: DocumentRetriever) => DocumentRetriever;
    using: (this: DocumentRetriever, value: string) => DocumentRetriever;
    exec(this: DocumentRetriever, callback?: any): any;
    constructor(model: Model<Document>, typeInformation: DocumentRetrieverTypeInformation, object?: ConditionInitalizer);
}
interface DocumentRetrieverResponse<T> extends DocumentArray<T> {
    lastKey?: ObjectType;
    count: number;
}
export interface ScanResponse<T> extends DocumentRetrieverResponse<T> {
    scannedCount: number;
    timesScanned: number;
}
export interface QueryResponse<T> extends DocumentRetrieverResponse<T> {
    queriedCount: number;
    timesQueried: number;
}
export interface Scan<T> extends DocumentRetriever, BasicOperators<Scan<T>> {
    exec(): Promise<ScanResponse<T>>;
    exec(callback: CallbackType<ScanResponse<T>, AWSError>): void;
}
export declare class Scan<T> extends DocumentRetriever {
    parallel(value: number): Scan<T>;
    constructor(model: Model<Document>, object?: ConditionInitalizer);
}
export interface Query<T> extends DocumentRetriever, BasicOperators<Query<T>> {
    exec(): Promise<QueryResponse<T>>;
    exec(callback: CallbackType<QueryResponse<T>, AWSError>): void;
}
export declare class Query<T> extends DocumentRetriever {
    sort(order: SortOrder): Query<T>;
    constructor(model: Model<Document>, object?: ConditionInitalizer);
}
export {};
