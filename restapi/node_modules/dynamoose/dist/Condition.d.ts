declare const OR: unique symbol;
import { DynamoDB } from "aws-sdk";
import { ObjectType } from "./General";
export declare type ConditionFunction = (condition: Condition) => Condition;
declare type ConditionStorageType = {
    [key: string]: ConditionsConditionStorageObject;
} | typeof OR;
export declare type ConditionStorageTypeNested = ConditionStorageType | Array<ConditionStorageTypeNested>;
declare type ConditionStorageSettingsConditions = ConditionStorageTypeNested[];
declare type ConditionRequestObjectResult = {
    ExpressionAttributeNames?: DynamoDB.Types.ExpressionAttributeNameMap;
    ExpressionAttributeValues?: DynamoDB.Types.ExpressionAttributeValueMap;
};
interface ConditionComparisonType {
    name: ConditionComparisonComparatorName;
    typeName: ConditionComparisonComparatorDynamoName;
    not?: ConditionComparisonComparatorDynamoName;
    multipleArguments?: boolean;
}
declare enum ConditionComparisonComparatorName {
    equals = "eq",
    lessThan = "lt",
    lessThanEquals = "le",
    greaterThan = "gt",
    greaterThanEquals = "ge",
    beginsWith = "beginsWith",
    contains = "contains",
    exists = "exists",
    in = "in",
    between = "between"
}
declare enum ConditionComparisonComparatorDynamoName {
    equals = "EQ",
    notEquals = "NE",
    lessThan = "LT",
    lessThanEquals = "LE",
    greaterThan = "GT",
    greaterThanEquals = "GE",
    beginsWith = "BEGINS_WITH",
    contains = "CONTAINS",
    notContains = "NOT_CONTAINS",
    exists = "EXISTS",
    notExists = "NOT_EXISTS",
    in = "IN",
    between = "BETWEEN"
}
export declare type ConditionInitalizer = Condition | ObjectType | string;
export interface BasicOperators<T = Condition> {
    and: () => T;
    or: () => T;
    not: () => T;
    parenthesis: (value: Condition | ConditionFunction) => T;
    group: (value: Condition | ConditionFunction) => T;
    where: (key: string) => T;
    filter: (key: string) => T;
    attribute: (key: string) => T;
    eq: (value: any) => T;
    lt: (value: any) => T;
    le: (value: any) => T;
    gt: (value: any) => T;
    ge: (value: any) => T;
    beginsWith: (value: any) => T;
    contains: (value: any) => T;
    exists: () => T;
    in: (value: any) => T;
    between: (...values: any[]) => T;
}
export interface Condition extends BasicOperators {
    settings: {
        conditions: ConditionStorageSettingsConditions;
        pending: {
            key?: string;
            type?: ConditionComparisonType;
            value?: any;
            not?: boolean;
        };
        raw?: ConditionInitalizer;
    };
    and: () => Condition;
    or: () => Condition;
    not: () => Condition;
    parenthesis: (value: Condition | ConditionFunction) => Condition;
    group: (value: Condition | ConditionFunction) => Condition;
    where: (key: string) => Condition;
    filter: (key: string) => Condition;
    attribute: (key: string) => Condition;
    eq: (value: any) => Condition;
    lt: (value: any) => Condition;
    le: (value: any) => Condition;
    gt: (value: any) => Condition;
    ge: (value: any) => Condition;
    beginsWith: (value: any) => Condition;
    contains: (value: any) => Condition;
    exists: () => Condition;
    in: (value: any) => Condition;
    between: (...values: any[]) => Condition;
    requestObject: (settings?: ConditionRequestObjectSettings) => ConditionRequestObjectResult;
}
export declare class Condition {
    constructor(object?: ConditionInitalizer);
}
interface ConditionsConditionStorageObject {
    type: ConditionComparisonComparatorDynamoName;
    value: any;
}
interface ConditionRequestObjectSettings {
    conditionString: string;
    index?: {
        start: number;
        set: (newIndex: number) => void;
    };
    conditionStringType: "array" | "string";
}
export {};
