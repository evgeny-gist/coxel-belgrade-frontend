import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import { Case } from "@domain/case";
import { FC } from "react";

type CasesProps = {
    cases: Case[];
    marginBottom?: string | number;
};

export const Cases: FC<CasesProps> = ({ cases }) => {
    return (
        <Accordion allowToggle>
            {cases.map((c) => (
                <AccordionItem key={`${c.name}__${c.date}`}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {c.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>{c.text}</AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
