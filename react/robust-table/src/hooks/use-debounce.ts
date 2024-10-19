import { useEffect, useState } from "react"

const useDebounce = <T>(value: T, defaultValue: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [value, delay])

    return debouncedValue
}

export {
    useDebounce
}