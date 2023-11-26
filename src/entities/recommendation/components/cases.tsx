import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import { Case } from "@domain/case";
import DOMPurify from "dompurify";
import { FC } from "react";
import "./cases.css";

type CasesProps = {
    cases: Case[];
    marginBottom?: string | number;
};

export const Cases: FC<CasesProps> = ({ cases }) => {
    const onlyOneCase = cases.length === 1;

    return (
        <Accordion allowToggle index={onlyOneCase ? 0 : undefined}>
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
                        <div
                            className="markdown_container"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.text) }}
                        ></div>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
