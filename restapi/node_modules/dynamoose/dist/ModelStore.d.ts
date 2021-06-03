import { Model } from "./Model";
import { Document } from "./Document";
declare const returnObject: {
    <T extends Document>(input: string | Model<T>): Model<T>;
    clear(): void;
};
export = returnObject;
