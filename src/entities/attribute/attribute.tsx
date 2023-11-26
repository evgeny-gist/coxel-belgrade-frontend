import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
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
            <>
                <Select
                    w="100%"
                    mb={2}
                    size="md"
                    borderRadius="md"
                    borderColor={getBorderColor(attribute)}
                    placeholder={attribute.question}
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
                            borderRadius="md"
                            borderColor={getBorderColor(attribute)}
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
            </>
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
            borderWidth={6}
            borderRadius={16}
            borderColor={getBorderColor(attribute)}
            backgroundColor={getBgColor(attribute)}
        >
            <CardHeader>
                <Text color={getTextColor()} fontSize="lg">
                    {attribute.question}
                </Text>
            </CardHeader>
            <CardBody py={1}>
                {isAttributeCompleted(attribute) && (
                    <Heading as="h3" color={getTextColor()} fontSize="xl" fontWeight="bold">
                        {getResponse(attribute)}
                    </Heading>
                )}
            </CardBody>
            {isAttributeCompleted(attribute) && (
                <CardFooter>
                    <Button
                        colorScheme="blue"
                        variant="link"
                        onClick={() => handleUpdateClick()}
                    >
                        Изменить
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
});

function getBgColor(step: AttributeModel): string {
    if (step.completed) {
        return "blue.50";
    }

    return "";
}

function getBorderColor(step: AttributeModel): string {
    if (step.completed) {
        return "blue.100";
    }

    return "gray.200";
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
