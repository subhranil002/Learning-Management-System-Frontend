import { useRef } from "react";

function useDebounce(callback, delay = 1000) {
    const timerRef = useRef();

    function debouncedFunction(...args) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }

    return debouncedFunction;
}

export default useDebounce;
