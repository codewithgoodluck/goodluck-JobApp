import React from 'react'
import { useState, useEffect } from 'react';
import { Logo } from '../component';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../component/FormRow';
// import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../feature/user/userSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};


export const Register = () => {
const [values, setValues] = useState(initialState);
const {user, isLoading} = useSelector(store => store.user)
const dispatch = useDispatch()
  // get vlues from the form 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`)
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    console.log(name, email, password, isMember)
 
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields')
      return;
    }

    if(isMember){
      dispatch(loginUser({email: email, password: password}))
    }
    
    dispatch(registerUser({email: email, password:  password}))

  }
  const toggleMember = () => {
    //changes the state of is member from true to false
    // toggle the oppoist of is member
    setValues({ ...values, isMember: !values.isMember });
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {/* if is member is false display name field */}
        {!values.isMember && (<FormRow type='text' name='name' value={values.name} handleChange={handleChange}></FormRow>)}


        <FormRow type='email' name='email' value={values.email} handleChange={handleChange}></FormRow>

        <FormRow type='password' name='password' value={values.password} handleChange={handleChange}></FormRow>


        {/* <div className="form-row">
        <label htmlFor="" className='form-lable'>
          name
        </label>
        <input type="text" name='' value={values.name}   onChange={handleChange}  className="form-input" />
      
      </div> */}
        <button type='submit' className="btn btn-block">
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet ?' : 'Already a member?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
