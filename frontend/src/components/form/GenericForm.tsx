import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode, useImperativeHandle, forwardRef } from "react"
import { FieldValues, SubmitHandler, useForm, UseFormReturn, DefaultValues, KeepStateOptions } from "react-hook-form"
import { ZodType } from "zod"
import GenericFormContext from "./GenericFormContext"

interface GenericFormProps<T extends FieldValues> {
    schema: ZodType<T>
    defaultValues: DefaultValues<T>
    onSubmit: SubmitHandler<T>
    children: ReactNode
    className?: string
    id?: string
}

export interface GenericFormRef<T extends FieldValues> {
    reset: (values?: DefaultValues<T>, keepStateOptions?: KeepStateOptions) => void
    setValue: UseFormReturn<T>["setValue"]
    trigger: UseFormReturn<T>["trigger"]
    form: UseFormReturn<T>
}

const GenericForm = forwardRef<GenericFormRef<any>, GenericFormProps<any>>(
    ({ schema, defaultValues, onSubmit, children, className, id }, ref) => {
        const form = useForm({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            resolver: zodResolver(schema as any),
            defaultValues,
            mode: "onBlur",
        })

        const isLoading = form.formState.isSubmitting

        useImperativeHandle(ref, () => ({
            reset: form.reset,
            setValue: form.setValue,
            trigger: form.trigger,
            form,
        }))

        return (
            <GenericFormContext.Provider value={{ form, isLoading }}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={className}
                    id={id}
                    noValidate
                >
                    {children}
                </form>
            </GenericFormContext.Provider>
        )
    }
)

GenericForm.displayName = "GenericForm"

export default GenericForm as <T extends FieldValues>(
    props: GenericFormProps<T> & { ref?: React.Ref<GenericFormRef<T>> }
) => React.ReactElement