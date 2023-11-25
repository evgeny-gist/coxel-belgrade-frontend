export type Attribute = {
    name: string;
    completed: boolean;
    question: string;
    type: AttributeType;
    response?: string;
    options?: SelectOption[];
};
export const isAttribute = (value: unknown): value is Attribute => {
    const v = value as Attribute;

    return (
        Boolean(v) &&
        typeof v.completed === "boolean" &&
        typeof v.question === "string" &&
        typeof v.type === "string"
    );
};

export type CompletedAttribute = Omit<Attribute, "completed"> & {
    completed: true;
    response: NonNullable<Attribute["response"]>;
};
export const isAttributeCompleted = (s: Attribute): s is CompletedAttribute =>
    s.completed && Boolean(s.response);

export type UncompletedAttribute = Omit<Attribute, "completed"> & {
    completed: false;
};
export const isAttributeUncompleted = (s: Attribute): s is CompletedAttribute =>
    !s.completed && !s.response;

export type SelectAttribute = Omit<Attribute, "options"> & {
    options: NonNullable<Attribute["options"]>;
};
export const isSelectAttribute = (s: Attribute): s is SelectAttribute => s.type === "select";

export type SelectOption = {
    label: string;
    value: string;
};

export type AttributeType = "select" | "plain";
