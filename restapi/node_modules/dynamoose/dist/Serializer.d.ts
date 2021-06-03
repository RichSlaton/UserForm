import { ObjectType, ModelType } from "./General";
import { Document } from "./Document";
export interface SerializerOptions {
    include?: string[];
    exclude?: string[];
    modify?: (serialized: ObjectType, original: ObjectType) => ObjectType;
}
export declare class Serializer {
    #private;
    static defaultName: string;
    constructor();
    add(name: string, options: SerializerOptions): void;
    default: {
        set: (name?: string) => void;
    };
    delete(name: string): void;
    _serializeMany(documentsArray: ModelType<Document>[], nameOrOptions: SerializerOptions | string): ObjectType[];
    _serialize(document: ObjectType, nameOrOptions?: SerializerOptions | string): ObjectType;
}
