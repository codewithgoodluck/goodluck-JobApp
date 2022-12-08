import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utilis/axios';
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utilis/localStorage';


const initialState = {
  isLoading: false,
  // user:null,
  // invoke user from local storage
  user: getUserFromLocalStorage (),

};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkApi) => {
  // console.log(`Register User :$`(user))
  // user is a parameter
  // This now send information to the API USING AXIOS
  try {
    const resp = await customFetch.post('/auth/register', user)
    console.log(user)
     return resp.data
  } catch (error) {
  
    return thunkApi.rejectWithValue(error.response.data.msg);
  }

})

export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkApi) => {
  // console.log(`Register User :$`(user))
  // user is a parameter
  // This now send information to the API USING AXIOS
  try {
    const resp = await customFetch.post('/auth/login', user)
    console.log(user)
     return resp.data
  } catch (error) {
  
    return thunkApi.rejectWithValue(error.response.data.msg);
  }

})






const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [registerUser.pending]:(state)=>{
      state.isLoading=true;
    },
    [registerUser.fulfilled]:(state,{payload})=>{
      console.log(payload);
      const {user} = payload;
      state.isLoading=false;
      state.user=user;
      addUserToLocalStorage(user)
      toast.success(`Hello there ${user.name}`)
    },
    [registerUser.rejected]:(state,{payload})=>{
      state.isLoading=false
      toast.error(payload);
    },
    [loginUser.pending]:(state)=>{
      state.isLoading=true;
     
    },
    [loginUser.fulfilled]:(state,{payload})=>{
      console.log(payload);
      const {user} = payload;
      state.isLoading=false;
      state.user=user;
      addUserToLocalStorage(user)
      toast.success(`Welcome back ${user.name}`)
    },
    [loginUser.rejected]:(state,{payload})=>{
      state.isLoading=false
      toast.error(payload);
    },
  }
})

export default userSlice.reducer;