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
    const onlyOneCase = cases.length === 1;

    return (
        <Accordion allowToggle index={onlyOneCase ? 0 : -1}>
            {cases.map((c) => (
                <AccordionItem key={`${c.name}__${c.date}`}>
                    <h2>
                        <AccordionButton px={0}>
                            <Box as="span" flex="1" textAlign="left" color="blackAlpha.600">
                                {c.name}
                            </Box>
                            {!onlyOneCase && <AccordionIcon />}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel px={0} pb={4}>
                        {c.text}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
