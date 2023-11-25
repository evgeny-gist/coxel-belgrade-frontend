import { Step, StepLoader } from "@entities/step";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { stepsRepository } from "@repositories/steps";

export const StepList = observer(() => {
    const steps = stepsRepository.get();
    const loading = stepsRepository.loading;

    const handleSelect = (value: string): void => {
        stepsRepository.advance(value);
    };

    return (
        <Box>
            {steps.map((s) => (
                <Step step={s} key={s.question} marginBottom={4} onSelect={handleSelect} />
            ))}
            {loading && <StepLoader />}
        </Box>
    );
});
