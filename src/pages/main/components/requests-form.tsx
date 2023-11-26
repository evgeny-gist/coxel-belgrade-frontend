import { requestsRepository } from "@repositories/requests";
import { observer } from "mobx-react";
import { Field, Form, Formik } from "formik";
import { Request } from "@domain/request";
import { FormControl, FormLabel, Input, Button, Textarea, Box, Text } from "@chakra-ui/react";

export const RequestsForm = observer(() => {
    const { enabled, loading } = requestsRepository;

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

        requestsRepository.submit(value);
    };

    return (
        <Box p={8} borderRadius={16} borderColor="gray.300" borderWidth="1px">
            <Text mb={6}>Опишите подробнее вашу проблему и мы свяжемся с вами</Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <Field name="name">
                            {({ field }) => (
                                // TODO solve typing issue
                                <FormControl mb={3}>
                                    <FormLabel>Ваше имя</FormLabel>
                                    <Input {...field} placeholder="Имя" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="topic">
                            {({ field }) => (
                                <FormControl mb={3}>
                                    <FormLabel>Тема обращения</FormLabel>
                                    <Input {...field} placeholder="Тема" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field }) => (
                                <FormControl mb={3}>
                                    <FormLabel>Электронная почта</FormLabel>
                                    <Input type="email" {...field} placeholder="Почта" />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="text">
                            {({ field }) => (
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
