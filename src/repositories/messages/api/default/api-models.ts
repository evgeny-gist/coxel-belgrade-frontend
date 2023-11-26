export type AttributeRequest = {
    attrs: { value: string, name: string }[],
    request_form: null,
};

export type AttributeResponse = {
    cases?: CaseResponse[];
    question?: {
        attr_name: string;
        question_text: string;
        answers: string[];
    };
    show_request_form: boolean;
    not_strict_recommendation: boolean;
};

type CaseResponse = {
    text: string;
    update_date: string;
    name: string;
};
