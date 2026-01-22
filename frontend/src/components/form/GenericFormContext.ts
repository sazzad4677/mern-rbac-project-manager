import { FieldValues, UseFormReturn } from "react-hook-form"
import { createContext, useContext } from "react"

type FormContextType<T extends FieldValues> = {
    form: UseFormReturn<T>
    isLoading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenericFormContext = createContext<FormContextType<any> | null>(null)

export const useGenericFormContext = <T extends FieldValues>() => {
    const context = useContext(GenericFormContext)
    if (!context) {
        throw new Error("useGenericFormContext must be used within a GenericForm")
    }
    return context as FormContextType<T>
}

export default GenericFormContext
