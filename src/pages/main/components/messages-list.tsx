import { Attribute, AttributeLoader } from "@entities/attribute";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { messagesRepository } from "@repositories/messages";
import { isAttribute, isAttributeUncompleted } from "@domain/attribute";
import { last } from "../../../utils/arrays";
import { Recommendation } from "@entities/recommendation";

type MessagesListProps = {
    marginBottom?: string | number;
};

export const MessagesList = observer(({ marginBottom }: MessagesListProps) => {
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

    const isFinalStep = !last(
        messages.filter((m) => isAttribute(m) && isAttributeUncompleted(m))
    );

    return (
        <Box marginBottom={marginBottom}>
            {messages.map((m) =>
                isAttribute(m) ? (
                    <Attribute
                        attribute={m}
                        key={m.question}
                        marginBottom={4}
                        onSelect={handleSelect}
                    />
                ) : (
                    <Recommendation
                        recommedation={m}
                        isFinalStep={isFinalStep}
                        key={JSON.stringify(m.cases)}
                    />
                )
            )}
            {loading && <AttributeLoader />}
        </Box>
    );
});
