import { Skeleton } from "@chakra-ui/react";
import { Step as StepModel } from "@domain/step";
import { Step } from ".";

export const StepLoader = () => {
    const mockStep: StepModel = {
        completed: false,
        question: "",
        type: "select",
        options: [],
    };

    return (
        <Skeleton>
            <Step step={mockStep} />
        </Skeleton>
    );
};
