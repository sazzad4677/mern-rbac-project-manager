import { Input, InputProps } from "../../ui/input"
import { useController } from "react-hook-form"
import { useGenericFormContext } from "../GenericFormContext"

type TextFieldProps = Omit<InputProps, "name" | "error"> & {
    name: string
}

const TextField = ({ name, ...props }: TextFieldProps) => {
    const { form, isLoading } = useGenericFormContext()
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: form.control,
    })

    return (
        <Input
            {...props}
            {...field}
            disabled={isLoading || props.disabled}
            error={error?.message}
        />
    )
}

export default TextField
