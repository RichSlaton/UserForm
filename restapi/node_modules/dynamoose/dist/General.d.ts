import { Document } from "./Document";
import { Model } from "./Model";
export declare type CallbackType<R, E> = (error?: E | null, response?: R) => void;
export declare type ObjectType = {
    [key: string]: any;
};
export declare type FunctionType = (...args: any[]) => any;
export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
interface ModelDocumentConstructor<T extends Document> {
    new (object: {
        [key: string]: any;
    }): T;
    Model: Model<T>;
}
export declare type ModelType<T extends Document> = T & Model<T> & ModelDocumentConstructor<T>;
export interface DocumentArray<T> extends Array<T> {
    populate: () => Promise<DocumentArray<T>>;
    toJSON: () => ObjectType;
}
export declare enum SortOrder {
    ascending = "ascending",
    descending = "descending"
}
export {};
