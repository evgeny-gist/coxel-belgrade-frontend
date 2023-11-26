// TODO fix typings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { requestsRepository } from "@repositories/requests";
import { observer } from "mobx-react";
import { Field, Form, Formik } from "formik";
import { Request } from "@domain/request";
import { FormControl, FormLabel, Input, Button, Textarea, Box, Text } from "@chakra-ui/react";
import { messagesRepository } from "@repositories/messages";

export const RequestsForm = observer(() => {
    const { enabled, loading } = requestsRepository;
    const completedAttributes = messagesRepository.getCompleted();

    if (!enabled) {
        return <></>;
    }

    const initialValues: Request = {
        name: "",
        email: "",
        text: "",
        files: [],
        topic: "",
        additional_contacts: [],
    };

    const handleSubmit = (value: Request): void => {
        if (loading) {
            return;
        }

        requestsRepository.submit(value, completedAttributes);
    };

    return (
        <Box p={8} borderRadius={16} borderColor="gray.300" borderWidth={6}>
            <Text mb={6} fontSize="xl">
                Опишите подробнее вашу проблему и мы свяжемся с вами
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <Field name="name">
                            {({ field }: { field: any }) => (
                                // TODO solve typing issue
                                <FormControl mb={3}>
                                    <FormLabel>Ваше имя</FormLabel>
                                    <Input {...field} placeholder="Имя" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="topic">
                            {({ field }: { field: any }) => (
                                <FormControl mb={3}>
                                    <FormLabel>Тема обращения</FormLabel>
                                    <Input {...field} placeholder="Тема" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field }: { field: any }) => (
                                <FormControl mb={3}>
                                    <FormLabel>Электронная почта</FormLabel>
                                    <Input type="email" {...field} placeholder="Почта" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="text">
                            {({ field }: { field: any }) => (
                                <FormControl mb={5}>
                                    <FormLabel>Текст обращения</FormLabel>
                                    <Textarea {...field} placeholder="Текст обращения" />
                                </FormControl>
                            )}
                        </Field>
                        <Button colorScheme="blue" isLoading={loading} type="submit">
                            Отправить
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
});
