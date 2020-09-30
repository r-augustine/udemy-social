import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault();

        if(password != password2){
            console.log('Passwords do no match');
        } else {
            console.log('success')
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={ e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" value={name} onChange={ e => onChange(e) } name="name" placeholder="Name" required/>
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={email} onChange={ e => onChange(e) } placeholder="Email Address" required/>
                    <small className="form-text"> This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={password} onChange={ e => onChange(e) } minLength="6" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password2" value={password2} onChange={ e => onChange(e) } minLength="6" placeholder="Confirm Password"/>
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">Already have an account? <Link to="/login">Sign In</Link></p>
        </Fragment>
    )
}
