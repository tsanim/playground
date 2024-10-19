import { useState, useEffect, RefObject } from "react";

const useIsAtBottom = <T extends HTMLElement>(ref: RefObject<T> | null): boolean => {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (ref?.current) {
                const { scrollTop, scrollHeight, clientHeight } = ref.current;
                setIsAtBottom(Math.floor(scrollHeight - scrollTop) <= clientHeight + 5);
            }
        };

        const targetElement = ref?.current;

        targetElement && targetElement.addEventListener('scroll', handleScroll);

        return () => { targetElement && targetElement.removeEventListener('scroll', handleScroll); }
    }, [ref]);

    return isAtBottom;
};

export {
    useIsAtBottom
}