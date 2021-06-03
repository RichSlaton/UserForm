import { Model } from "./Model";
import { Schema } from "./Schema";
import { DynamoDB, AWSError } from "aws-sdk";
import { CallbackType, ObjectType } from "./General";
import { SerializerOptions } from "./Serializer";
import { PopulateSettings } from "./Populate";
import { Condition } from "./Condition";
export interface DocumentSaveSettings {
    overwrite?: boolean;
    return?: "request" | "document";
    condition?: Condition;
}
export interface DocumentSettings {
    type?: "fromDynamo" | "toDynamo";
}
export declare class Document {
    constructor(model: Model<Document>, object?: DynamoDB.AttributeMap | ObjectType, settings?: DocumentSettings);
    model?: Model<Document>;
    static objectToDynamo(object: ObjectType): DynamoDB.AttributeMap;
    static objectToDynamo(object: any, settings: {
        type: "value";
    }): DynamoDB.AttributeValue;
    static objectToDynamo(object: ObjectType, settings: {
        type: "object";
    }): DynamoDB.AttributeMap;
    static fromDynamo(object: DynamoDB.AttributeMap): ObjectType;
    static isDynamoObject(object: ObjectType, recurrsive?: boolean): boolean | null;
    static attributesWithSchema: (document: Document, model: Model<Document>) => Promise<string[]>;
    static objectFromSchema: (object: any, model: Model<Document>, settings?: DocumentObjectFromSchemaSettings) => Promise<any>;
    static prepareForObjectFromSchema: (object: any, model: Model<Document>, settings: DocumentObjectFromSchemaSettings) => any;
    conformToSchema: (this: Document, settings?: DocumentObjectFromSchemaSettings) => Promise<Document>;
    toDynamo: (this: Document, settings?: Partial<DocumentObjectFromSchemaSettings>) => Promise<any>;
    prepareForResponse(): Promise<Document>;
    original(): ObjectType | null;
    toJSON(): ObjectType;
    serialize(nameOrOptions?: SerializerOptions | string): ObjectType;
    delete(this: Document): Promise<void>;
    delete(this: Document, callback: CallbackType<void, AWSError>): void;
    save(this: Document): Promise<Document>;
    save(this: Document, callback: CallbackType<Document, AWSError>): void;
    save(this: Document, settings: DocumentSaveSettings & {
        return: "request";
    }): Promise<DynamoDB.PutItemInput>;
    save(this: Document, settings: DocumentSaveSettings & {
        return: "request";
    }, callback: CallbackType<DynamoDB.PutItemInput, AWSError>): void;
    save(this: Document, settings: DocumentSaveSettings & {
        return: "document";
    }): Promise<Document>;
    save(this: Document, settings: DocumentSaveSettings & {
        return: "document";
    }, callback: CallbackType<Document, AWSError>): void;
    populate(): Promise<Document>;
    populate(callback: CallbackType<Document, AWSError>): void;
    populate(settings: PopulateSettings): Promise<Document>;
    populate(settings: PopulateSettings, callback: CallbackType<Document, AWSError>): void;
}
export declare class AnyDocument extends Document {
    [key: string]: any;
}
export interface DocumentObjectFromSchemaSettings {
    type: "toDynamo" | "fromDynamo";
    schema?: Schema;
    checkExpiredItem?: boolean;
    saveUnknown?: boolean;
    defaults?: boolean;
    forceDefault?: boolean;
    customTypesDynamo?: boolean;
    validate?: boolean;
    required?: boolean | "nested";
    enum?: boolean;
    populate?: boolean;
    combine?: boolean;
    modifiers?: ("set" | "get")[];
    updateTimestamps?: boolean | {
        updatedAt?: boolean;
        createdAt?: boolean;
    };
}
