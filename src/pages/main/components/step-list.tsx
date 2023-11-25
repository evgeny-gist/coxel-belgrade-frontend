import { Step } from "@entities/step";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { stepsRepository } from "@repositories/steps";

export const StepList = observer(() => {
    const steps = stepsRepository.get();

    return (
        <Box>
            {steps.map((s) => (
                <Step step={s} key={s.question} marginBottom={4} />
            ))}
        </Box>
    );
});
