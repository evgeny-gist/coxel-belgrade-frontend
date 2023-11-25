export type Step = {
    completed: boolean;
    question: string;
    type: StepType;
    response?: string;
    options?: SelectOption[];
};

export type CompletedStep = Omit<Step, "completed"> & {
    completed: true;
    response: NonNullable<Step["response"]>;
};
export const isStepCompleted = (s: Step): s is CompletedStep =>
    s.completed && Boolean(s.response);

export type UncompletedStep = Omit<Step, "completed"> & {
    completed: false;
};
export const isStepUncompleted = (s: Step): s is CompletedStep => !s.completed && !s.response;

export type SelectStep = Omit<Step, "options"> & {
    options: NonNullable<Step["options"]>;
};
export const isSelectStep = (s: Step): s is SelectStep => s.type === "select";

export type SelectOption = {
    label: string;
    value: string;
};

export type StepType = "select" | "plain";
