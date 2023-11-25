import { Attribute, AttributeLoader } from "@entities/attribute";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { messagesRepository } from "@repositories/messages";
import { isAttribute } from "@domain/attribute";

export const MessagesList = observer(() => {
    const messages = messagesRepository.get();
    const loading = messagesRepository.loading;

    const handleSelect = (value: string): void => {
        const lastMessage = messages[messages.length - 1];

        if (!isAttribute(lastMessage) || lastMessage.completed) {
            throw new Error("cannot be updated");
        }

        messagesRepository.advance(value);
    };

    return (
        <Box>
            {messages.map((m) =>
                isAttribute(m) ? (
                    <Attribute
                        attribute={m}
                        key={m.question}
                        marginBottom={4}
                        onSelect={handleSelect}
                    />
                ) : (
                    "" // TODO support recommendation
                )
            )}
            {loading && <AttributeLoader />}
        </Box>
    );
});
