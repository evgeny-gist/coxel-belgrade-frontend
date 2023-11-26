import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Input,
    Kbd,
    Select,
    Text,
} from "@chakra-ui/react";
import {
    CompletedAttribute,
    Attribute as AttributeModel,
    isSelectAttribute,
    isAttributeCompleted,
} from "@domain/attribute";
import { observer } from "mobx-react";
import { FC, useState } from "react";

type AttributeProps = {
    attribute: AttributeModel;
    marginBottom?: string | number;
    onSelect?: (value: string) => void;
    onUpdateStart?: () => void;
    onUpdate?: (value: string) => void;
};

export const Attribute: FC<AttributeProps> = observer((props) => {
    const { attribute, marginBottom, onSelect, onUpdate, onUpdateStart } = props;

    const anotherKey = "another";
    const [anotherOptionEnabled, setAnotherOption] = useState(false);
    const [anotherInputValue, setAnotherValue] = useState("");

    const anotherValueCanBeSubmitted = anotherInputValue.length > 0;
    const submitAnotherValue = () => {
        onSelect && onSelect(anotherInputValue);
    };

    const [isUpdating, setUpdating] = useState(false);

    const handleSelect = (option: string): void => {
        if (option === anotherKey) {
            setAnotherOption(true);
        } else {
            onSelect && onSelect(option);
        }
    };

    if (isUpdating && isAttributeCompleted(attribute)) {
        const handleUpdate = (value: string): void => {
            setUpdating(false);
            onUpdate && onUpdate(value);
        };

        return (
            <Attribute
                {...props}
                attribute={{
                    ...attribute,
                    completed: false,
                    response: undefined,
                }}
                onSelect={handleUpdate}
            />
        );
    }

    if (!isAttributeCompleted(attribute) && isSelectAttribute(attribute)) {
        const onInputKeyDown = (event: KeyboardEvent): void => {
            if (anotherValueCanBeSubmitted && event.key === "Enter") {
                submitAnotherValue();
            }
        };

        return (
            <Box mb={marginBottom}>
                <Heading as="h4" fontSize="md" mb={4} fontWeight={400}>
                    {attribute.question}
                </Heading>
                <Select
                    variant="filled"
                    w="100%"
                    mb={2}
                    size="md"
                    backgroundColor="whiteAlpha.700"
                    borderWidth={3}
                    borderRadius="xl"
                    borderColor={getBorderColor(attribute)}
                    placeholder="-"
                    color={getTextColor()}
                    onChange={(e) => handleSelect(e.target.value)}
                >
                    {attribute.options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                    <option value="another">Другое</option>
                </Select>
                {anotherOptionEnabled && (
                    <Box position="relative">
                        <Input
                            variant="filled"
                            borderColor={getBorderColor(attribute)}
                            borderRadius="xl"
                            borderWidth={3}
                            backgroundColor="whiteAlpha.700"
                            placeholder={attribute.question}
                            color={getTextColor()}
                            value={anotherInputValue}
                            onChange={(e) => setAnotherValue(e.target.value)}
                            onKeyDown={(e) => onInputKeyDown(e as unknown as KeyboardEvent)}
                        />
                        {anotherValueCanBeSubmitted && (
                            <Button
                                variant="link"
                                position="absolute"
                                right={5}
                                top="50%"
                                transform="translateY(-50%)"
                                onClick={submitAnotherValue}
                            >
                                <Kbd>enter</Kbd>
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        );
    }

    const handleUpdateClick = () => {
        onUpdateStart && onUpdateStart();
        setUpdating(true);
    };

    // TODO card styles duplicate between attribute, recommendation, and form; fix it
    return (
        <Card
            marginBottom={marginBottom}
            w="100%"
            overflow="hidden"
            borderWidth={3}
            borderRadius={16}
            borderColor={getBorderColor(attribute)}
            backgroundColor={getBgColor()}
        >
            <CardHeader>
                <Text color={getTextColor()} fontSize="lg">
                    {attribute.question}
                </Text>
            </CardHeader>
            <CardBody display="flex" justifyContent="space-between" alignItems="baseline">
                {isAttributeCompleted(attribute) && (
                    <Heading as="h3" color={getTextColor()} fontSize="xl" fontWeight="bold">
                        {getResponse(attribute)}
                    </Heading>
                )}
                {isAttributeCompleted(attribute) && (
                    <Button
                        colorScheme="blue"
                        variant="link"
                        onClick={() => handleUpdateClick()}
                    >
                        Изменить
                    </Button>
                )}
            </CardBody>
        </Card>
    );
});

function getBgColor(): string {
    // if (step.completed) {
    //     return "blue.50";
    // }

    return "gray.50";
}

function getBorderColor(step: AttributeModel): string {
    if (step.completed) {
        return "blue.100";
    }

    return "blue.100";
}

function getResponse(step: CompletedAttribute): string {
    if (step.type === "plain") {
        return step.response;
    }

    const res = step.options?.find((o) => o.value === step.response)?.label;

    return res || step.response;
}

function getTextColor(): string {
    return "blackAlpha.700";
}
