import { FC, ReactNode, useLayoutEffect, useRef, useState } from "react";

type AutofocusProps = {
    children: ReactNode;
};

export const WithAutoScroll: FC<AutofocusProps> = ({ children }) => {
    const [initialized, setInitialized] = useState(false);
    const elRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!initialized && elRef.current) {
            setInitialized(true);
            setTimeout(
                () => elRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                100
            );
        }
    }, [initialized]);

    return <div ref={elRef}>{children}</div>;
};
