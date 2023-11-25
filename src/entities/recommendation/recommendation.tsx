import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import {
    Recommendation as RecommendationModel,
    isOptimalRecommendation,
    isUniqueRecommendation,
} from "@domain/recommendation";
import { FC } from "react";
import { Cases } from "./components/cases";

type RecommendationProps = {
    recommedation: RecommendationModel;
    marginBottom?: string | number;
};

export const Recommendation: FC<RecommendationProps> = ({ marginBottom, recommedation }) => {
    return (
        <Card
            marginBottom={marginBottom}
            w="100%"
            overflow="hidden"
            borderWidth="1px"
            borderRadius="md"
            borderColor={getBorderColor(recommedation)}
            backgroundColor={getBgColor(recommedation)}
        >
            <CardHeader>
                <Heading size="sm" color="blackAlpha.700">
                    {getTitle(recommedation)}
                </Heading>
            </CardHeader>
            {!!recommedation.cases.length && (
                <CardBody>
                    <Cases cases={recommedation.cases} />
                </CardBody>
            )}
        </Card>
    );
};

function getBorderColor(r: RecommendationModel): string {
    if (isUniqueRecommendation(r)) {
        return "red.200";
    }

    if (isOptimalRecommendation(r)) {
        return "green.200";
    }

    return "yellow.200";
}

function getBgColor(r: RecommendationModel): string {
    if (isUniqueRecommendation(r)) {
        return "red.50";
    }

    if (isOptimalRecommendation(r)) {
        return "green.50";
    }

    return "yellow.50";
}

function getTitle(r: RecommendationModel): string {
    if (isUniqueRecommendation(r)) {
        return "Мы не смогли найти похожие случаи в нашей практике :(";
    }

    if (isOptimalRecommendation(r)) {
        return "Вот случаи, описывающие вашу ситуацию";
    }

    return "Мы пока не сталкивались конкретно с такой проблемой. Но у нас были похожие случаи. Возможно, они будут вам полезны";
}
