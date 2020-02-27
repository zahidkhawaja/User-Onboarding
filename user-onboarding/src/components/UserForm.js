import React from "react";
import { withFormik, Form, Field } from "formik";

const UserForm = () => {
    return (
        <Form>
            <Field id = "name" type = "text" name = "name" placeholder = "Name" />
            <Field id = "email" type = "email" name = "email" placeholder = "Email" />
            <Field id = "password" type = "password" name = "password" placeholder = "Password" />
            <Field id = "terms" type = "checkbox" name = "terms"/>
        </Form>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    }
})(UserForm);

export default FormikUserForm;