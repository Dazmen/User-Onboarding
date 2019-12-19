import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Onboarding = ({ values, errors, touched, status}) => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(user => [...user, status]);
    }, [status]);

    return(
        <div className='formCont'>
            <Form className='logInForm'>
                <label>Username</label>
                <Field
                    id='user'
                    type='text'
                    name='user'
                    placeholder='User Name'
                />

                <label>Email</label>
                <Field
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Email'
                />

                <label>Password</label>
                <Field
                    id='pass'
                    type='password'
                    name='pass'
                    placeholder='Password'
                />
                <p>
                    <label>by clicking you have agreed to the Terms of Service.
                    <Field
                        id='TOS'
                        type='checkbox'
                        name='TOS'
                    />
                    </label>
                </p>

                <button type='submit'>Submit!</button>

            </Form>
            {user.map(item => {
                return (
                    <ul key={item.id}>
                        <li>Username: {item.user}</li>
                        <li>Email: {item.email}</li>
                        <li>Password: {item.pass}</li>
                    </ul>
                )
            })}
        </div>

    )
}

const FormikOnboarding = withFormik({
    mapPropsToValues(props) {
        return {
            user: props.user || '',
            email: props.email || '',
            pass: props.pass || '',
            TOS: props.TOS || false,
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        pass: Yup.string().required(),
        email: Yup.string().email(),
        TOS: Yup.boolean(true),
    }),
    handleSubmit(values, { setStatus, resetForm }){
        console.log('submitting', values);
        axios
            .post('https://reqres.in/api/users', values)
            .then(response => {
                setStatus(response.data);
                resetForm();
            })
            .catch(error => {
                console.log (error.response)
            });
    }
})(Onboarding);

export default FormikOnboarding