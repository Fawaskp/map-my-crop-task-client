import { useFormik } from "formik";

export function useFormikValidation(handleSubmit, schema, initialValues) {
    return useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                handleSubmit(values);
            } catch (error) {
                // error here
            }
        },
    });
};