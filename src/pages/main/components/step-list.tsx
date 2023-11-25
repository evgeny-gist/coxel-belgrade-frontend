import { Step } from "../../../entities/step";
import { steps as mockSteps } from "../mocks";
import { Box } from "@chakra-ui/react";

export const StepList = () => {
    const steps = mockSteps;

    return (
        <Box>
            {steps.map((s) => (
                <Step step={s} key={s.question} marginBottom={4} />
            ))}
        </Box>
    );
};
