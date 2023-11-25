import { Skeleton } from "@chakra-ui/react";
import { Attribute as AttributeModel } from "@domain/attribute";
import { Attribute } from ".";

export const AttributeLoader = () => {
    const mockStep: AttributeModel = {
        completed: false,
        question: "",
        type: "select",
        options: [],
    };

    return (
        <Skeleton>
            <Attribute attribute={mockStep} />
        </Skeleton>
    );
};
