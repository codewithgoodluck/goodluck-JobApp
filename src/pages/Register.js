import React from 'react'
import { useState, useEffect } from 'react';
import { Logo } from '../component';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../component/FormRow';
// import { Toast } from 'react-toastify/dist/components';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
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
  const { user, isLoading } = useSelector(store => store.user)
 const navigate = useNavigate()
  const dispatch = useDispatch()
  // get vlues from the form 
  const handleChange = (e) => {
    // update the state value from the user
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`)

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    // send the user information to the STORE
    e.preventDefault();
    const { name, email, password, isMember } = values;
    console.log(name, email, password, isMember)
    //  CHECK THE USER INFORMATION BEFORE SENDOING TO THE STORE
    //!isMember && !name=> IF IS MEMEBER IS FALSE CHACK FOR NAME
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields')
      return;
    }

    // send information to the store
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
    }

    dispatch(registerUser({ email: email, password: password, name: name }))

  }

  // Helps switch from the login screen to register screen(Member) 
  const toggleMember = () => {
    //changes the state of is member from true to false of false to  true
    // toggle the oppoist of is member
    setValues({ ...values, isMember: !values.isMember });
  }


  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/');
      }, 2000)
    }

  },[user])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        {/* Create a form row component and make the values dynamic */}

        {/* If the user has registred or is a member display the login text  */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {/* name field */}
        {/* if is member is false display name field */}

        {/* If the user has not registred  display the name field  */}
        {!values.isMember && (<FormRow type='text' name='name' value={values.name} handleChange={handleChange}></FormRow>)}


        <FormRow type='email' name='email' value={values.email} handleChange={handleChange}></FormRow>

        <FormRow type='password' name='password' value={values.password} handleChange={handleChange}></FormRow>

        <button type='submit' className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>
        <p>
          {!values.isMember ? 'Already a member?' : ' Not a member yet?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {/* This is just to control the llogin and register text  */}
            {!values.isMember ? 'Login' : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
