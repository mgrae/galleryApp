import { useState, useEffect, useRef, useCallback } from 'react';

function useIntersectionObserver(
    callback: () => void,
    options?: IntersectionObserverInit
): [(node: Element | null) => void, boolean] {
    const observer = useRef<IntersectionObserver | null>(null);
    const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
    const refCallback = useCallback((node: Element | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isIntersecting) {
                setIsIntersecting(true)
                callback();
            } else if (!entries[0].isIntersecting) {
                setIsIntersecting(false)
            }
        }, options);

        if (node) {
            observer.current.observe(node);
        }
    }, [callback, options, isIntersecting]);

    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return [refCallback, isIntersecting];
}

export default useIntersectionObserver;