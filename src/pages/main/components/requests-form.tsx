import { requestsRepository } from "@repositories/requests";
import { observer } from "mobx-react";

export const RequestsForm = observer(() => {
    const { enabled } = requestsRepository;

    if (!enabled) {
        return <></>;
    }

    return <div>RequestsForm</div>;
});
