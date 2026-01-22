import { Select, SelectProps } from "../../ui/select"
import { useController } from "react-hook-form"
import { useGenericFormContext } from "../GenericFormContext"

type SelectFieldProps = Omit<SelectProps, "name" | "error"> & {
    name: string
}

const SelectField = ({ name, ...props }: SelectFieldProps) => {
    const { form, isLoading } = useGenericFormContext()
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: form.control,
    })

    return (
        <Select
            {...props}
            {...field}
            disabled={isLoading || props.disabled}
            error={error?.message}
        />
    )
}

export default SelectField
