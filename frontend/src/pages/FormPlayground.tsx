import { z } from "zod"
import { Button } from "../components/ui/button"
import GenericForm, { GenericFormRef } from "../components/form/GenericForm"
import CheckboxField from "../components/form/fields/CheckboxField"
import SelectField from "../components/form/fields/SelectField"
import TextField from "../components/form/fields/TextField"
import { useRef } from "react"

const demoSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    terms: z.literal(true, {
        message: "You must accept the terms",
    }),
})

type DemoFormValues = z.infer<typeof demoSchema>

const FormPlayground = () => {
    const formRef = useRef<GenericFormRef<DemoFormValues>>(null)

    const handleSubmit = (data: DemoFormValues) => {
        console.log("Form Submitted:", data)
        alert(JSON.stringify(data, null, 2))
    }

    return (
        <div className="container mx-auto max-w-md py-8 px-4">
            <div className="rounded-lg border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Form Playground
                </h1>

                <GenericForm
                    ref={formRef}
                    schema={demoSchema}
                    defaultValues={{
                        fullName: "",
                        email: "",
                        role: "",
                        terms: false as unknown as true,
                    }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <TextField
                            name="fullName"
                            label="Full Name"
                            placeholder="John Doe"
                        />

                        <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                        />

                        <SelectField
                            name="role"
                            label="Select Role"
                            options={[
                                { label: "Admin", value: "admin" },
                                { label: "User", value: "user" },
                                { label: "Guest", value: "guest" },
                            ]}
                        />

                        <CheckboxField
                            name="terms"
                            label="I accept the terms and conditions"
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        Submit Form
                    </Button>
                </GenericForm>
            </div>
        </div>
    )
}

export default FormPlayground
