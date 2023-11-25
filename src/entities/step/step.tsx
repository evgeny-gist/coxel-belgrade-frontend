import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";
import { CompletedStep, Step as StepModel, isSelectStep, isStepCompleted } from "@domain/step";
import { FC, useState } from "react";

type StepProps = {
    step: StepModel;
    marginBottom?: string | number;
    onSelect?: (value: string) => void;
};

export const Step: FC<StepProps> = ({ step, marginBottom, onSelect }) => {
    const anotherKey = "another";
    const [anotherOptionEnabled, setAnotherOption] = useState(false);
    const [anotherInputValue, setAnotherValue] = useState("");

    const handleSelect = (option: string): void => {
        if (option === anotherKey) {
            setAnotherOption(true);
        } else {
            onSelect && onSelect(option);
        }
    };

    if (!isStepCompleted(step) && isSelectStep(step)) {
        return (
            <>
                <Select
                    w="100%"
                    mb={2}
                    size="lg"
                    borderRadius="md"
                    borderColor={getBorderColor(step)}
                    placeholder={step.question}
                    color={getTextColor()}
                    onChange={(e) => handleSelect(e.target.value)}
                >
                    {step.options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                    <option value="another">Другое</option>
                </Select>
                {anotherOptionEnabled && (
                    <Input
                        borderRadius="md"
                        borderColor={getBorderColor(step)}
                        placeholder={step.question}
                        color={getTextColor()}
                        value={anotherInputValue}
                        onChange={(e) => setAnotherValue(e.target.value)}
                    />
                )}
            </>
        );
    }

    return (
        <Card
            marginBottom={marginBottom}
            w="100%"
            overflow="hidden"
            borderWidth="1px"
            borderRadius="md"
            borderColor={getBorderColor(step)}
            backgroundColor={getBgColor(step)}
        >
            <CardHeader>
                <Text color={getTextColor()} fontSize="xl">
                    {step.question}
                </Text>
            </CardHeader>
            <CardBody py={1}>
                {isStepCompleted(step) && (
                    <Text color={getTextColor()} fontSize="2xl" fontWeight="bold">
                        {getResponse(step)}
                    </Text>
                )}
            </CardBody>
            {isStepCompleted(step) && (
                <CardFooter>
                    <Button colorScheme="blue" variant="link">
                        Изменить
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

function getBgColor(step: StepModel): string {
    if (step.completed) {
        return "blue.50";
    }

    return "";
}

function getBorderColor(step: StepModel): string {
    if (step.completed) {
        return "blue.200";
    }

    return "gray.400";
}

function getResponse(step: CompletedStep): string {
    if (step.type === "plain") {
        return step.response;
    }

    const res = step.options?.find((o) => o.value === step.response)?.label;

    if (!res) {
        throw new Error("response not found");
    }

    return res;
}

function getTextColor(): string {
    return "blackAlpha.700";
}
