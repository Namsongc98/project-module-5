import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
    const [debount, setDebounce] = useState(value)

    useEffect(() => {
        const handle = setTimeout(() => setDebounce(value), delay)
        return () => clearTimeout(handle)
    }, [value])
    return debount
}

export default useDebounce