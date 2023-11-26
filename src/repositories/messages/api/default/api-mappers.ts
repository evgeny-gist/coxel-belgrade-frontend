import { CompletedAttribute } from "@domain/attribute";
import { AttributeRequest, AttributeResponse } from "./api-models";
import { ResolveResponse } from "@repositories/messages/dependencies/messages-api.interface";
import { Message } from "@domain/message";

export const mapAttributes = (attributes: CompletedAttribute[]): AttributeRequest => ({
    attrs: attributes.map((a) => ({
        name: a.name,
        value: a.response,
    })),
    request_form: null,
});

export const mapResponse = (response: AttributeResponse): ResolveResponse => ({
    messages: [
        ...(response.question
            ? [
                  <Message>{
                      completed: false,
                      name: response.question.attr_name,
                      question: response.question.question_text,
                      type: "select",
                      options: response.question.answers.map((a) => ({
                          label: a,
                          value: a,
                      })),
                  },
              ]
            : []),
        {
            strictMatch: !response.not_strict_recommendation,
            cases:
                response.cases?.map((c) => ({
                    date: c.update_date,
                    name: c.name,
                    text: c.text,
                })) || [],
        },
    ],
    showForm: response.show_request_form,
});
