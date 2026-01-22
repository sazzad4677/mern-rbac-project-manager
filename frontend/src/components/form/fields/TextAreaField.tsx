import { Textarea, TextareaProps } from "../../ui/textarea"
import { useController } from "react-hook-form"
import { useGenericFormContext } from "../GenericFormContext"

type TextAreaFieldProps = Omit<TextareaProps, "name" | "error"> & {
    name: string
}

const TextAreaField = ({ name, ...props }: TextAreaFieldProps) => {
    const { form, isLoading } = useGenericFormContext()
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: form.control,
    })

    return (
        <Textarea
            {...props}
            {...field}
            disabled={isLoading || props.disabled}
            error={error?.message}
        />
    )
}

export default TextAreaField
