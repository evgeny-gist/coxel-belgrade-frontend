import { Attribute, AttributeLoader } from "@entities/attribute";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { messagesRepository } from "@repositories/messages";
import { isAttribute, isAttributeUncompleted } from "@domain/attribute";
import { last } from "../../../utils/arrays";
import { Recommendation } from "@entities/recommendation";
import { WithAutoScroll } from "../../../utils/with-autofocus";
import { useState } from "react";
import { requestsRepository } from "@repositories/requests";

type MessagesListProps = {
    marginBottom?: string | number;
};

export const MessagesList = observer(({ marginBottom }: MessagesListProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const messages = messagesRepository.get();
    const loading = messagesRepository.loading;

    if (!loading && messages.length === 0) {
        messagesRepository.init();
    }

    const handleSelect = (value: string): void => {
        const lastMessage = last(messages.filter((m) => isAttribute(m)));

        if (!isAttribute(lastMessage) || lastMessage.completed) {
            throw new Error("cannot be updated");
        }

        messagesRepository.advance(value);
    };

    const handleUpdateStart = (index: number) => {
        setActiveIndex(index);
        requestsRepository.reset();
    }

    const handleUpdate = (index: number, value: string): void => {
        messagesRepository.update(index, value);
        setActiveIndex(null);
    };

    const isFinalStep = !last(
        messages.filter((m) => isAttribute(m) && isAttributeUncompleted(m))
    );

    return (
        <Box marginBottom={marginBottom}>
            {messages
                .slice(0, typeof activeIndex === "number" ? activeIndex + 1 : messages.length)
                .map((m, i) =>
                    isAttribute(m) ? (
                        <WithAutoScroll key={m.question}>
                            <Attribute
                                attribute={m}
                                marginBottom={4}
                                onSelect={handleSelect}
                                onUpdateStart={() => handleUpdateStart(i)}
                                onUpdate={(value) => handleUpdate(i, value)}
                            />
                        </WithAutoScroll>
                    ) : (
                        <WithAutoScroll key={JSON.stringify(m.cases)}>
                            <Recommendation recommedation={m} isFinalStep={isFinalStep} />
                        </WithAutoScroll>
                    )
                )}
            {loading && (
                <WithAutoScroll>
                    <AttributeLoader />
                </WithAutoScroll>
            )}
        </Box>
    );
});
