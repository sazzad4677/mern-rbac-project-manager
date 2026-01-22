import { Checkbox } from "../../ui/checkbox"
import { useController } from "react-hook-form"
import { useGenericFormContext } from "../GenericFormContext"

type CheckboxFieldProps = {
    name: string
    label: string
}

const CheckboxField = ({ name, label }: CheckboxFieldProps) => {
    const { form, isLoading } = useGenericFormContext()
    const {
        field: { value, onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: form.control,
    })

    return (
        <div className="space-y-1 leading-none">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={name}
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={isLoading}
                    {...field}
                />
                <label
                    htmlFor={name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                >
                    {label}
                </label>
            </div>
            {error && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default CheckboxField
