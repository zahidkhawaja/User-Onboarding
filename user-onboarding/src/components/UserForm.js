import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({values, handleChange, touched, errors, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("Status has changed", status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    return (
        <div className = "form">
           
        <Form>
            <label htmlFor = "name"> Name
            <Field id = "name" type = "text" name = "name" placeholder = "Name" />
            {touched.name && errors.name && (
                <p className = "error">{errors.name}</p>
            )}
            </label>
            <br/>
            <label htmlFor = "email"> Email
            <Field id = "email" type = "email" name = "email" placeholder = "Email" />
            {touched.email && errors.email && (
                <p className = "error"> {errors.email}</p>
            )}
            </label>
            <br/>
            <label htmlFor = "password"> Password
            <Field id = "password" type = "password" name = "password" placeholder = "Password" />
            {touched.password && errors.password && (
                <p className = "error">{errors.password}</p>
            )}
            </label>
            <br/>
            <label htmlFor = "terms"> Agree to Terms of Services
            <Field id = "terms" type = "checkbox" name = "terms"/>
            {touched.terms && errors.terms && (
                <p className = "error">{errors.terms}</p>
            )}
            </label>
            <br/>
            <button type = "submit">Submit</button>
            
        </Form>
        
        {users.map(user => (
            <div className = "returned-container"> 
            <div className = "returned">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            </div>
            </div>
        ))}
        </div>
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
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required."),
        email: Yup.string().required("Email is required."),
        password: Yup.string().required("Password is required.").min(8, "Password must be at least 8 characters."),
        terms: Yup.boolean().oneOf([true], "You must agree to the Terms of Services.")
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitting", values);
        axios.post("https://reqres.in/api/users", values)
            .then(response => {
                console.log("Success", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(response => {
                console.log("Error posting data", response);
            });
    }
})(UserForm);

export default FormikUserForm;