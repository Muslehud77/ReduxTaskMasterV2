import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import auth from '../../../utils/firebase.config';

const initialState = {
  name: '',
  email: '',
  isLoading : true,
  isError : false,
  error : ''
};


export const createUser = createAsyncThunk("userSlice/createUser",
async({email,password,name})=> {
  const data = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser,{
    displayName : name
  })
  console.log(data);
  
  return { email: data.user.email, name: data.user.displayName };
  
})

export const userSignIn = createAsyncThunk("userSlice/userSignIn",
async({email,password}) => {
  const data = await signInWithEmailAndPassword(auth,email,password)
  console.log(data);
  
  return {email : data.user.email, name: data.user.displayName}
})


export const googleSignIn = createAsyncThunk("userSlice/googleSignIn",

async()=>{
  const googleProvider = new GoogleAuthProvider()
  const data = await signInWithPopup(auth,googleProvider)
  console.log(data);
  return {name : data.user.displayName,email : data.user.email}
}

)

const pending = (state)=>{
  state.isLoading = true;
  state.isError = false;
  state.email = "";
  state.name = "";
  state.error = "";
}

const fulfilled = (state,payload)=>{
  state.isLoading = false;
  state.isError = false;
  state.email = payload.email;
  state.name = payload.name;
  state.error = "";
}

const rejected = (state,action)=>{
  state.isLoading = false;
  state.isError = true;
  state.email = "";
  state.name = "";
  state.error = action.error.message;
}


const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser : (state, {payload})=>{
     
      state.name = payload.displayName;
      state.email =payload.email;
      
    },
    toggleLoading : (state, {payload})=>{
        state.isLoading = payload.loading;
       
    },

    handleLogout : (state)=> {
       state.isLoading = false;
       state.isError = false;
       state.email = '';
       state.name = '';
       state.error = "";
    }


  },
  extraReducers : (builder)=>{
    builder.addCase(createUser.pending, (state)=>{
      state.isLoading = true
      state.isError = false
      state.email = ''
      state.name = ''
      state.error = ''
    })
    .addCase(createUser.fulfilled, (state,{payload})=>{
      state.isLoading = false
      state.isError = false
      state.email = payload.email
      state.name = payload.name
      state.error = ''
    })
    .addCase(createUser.rejected, (state, action)=>{
      state.isLoading = false
      state.isError = true
      state.email = ''
      state.name = ''
      state.error = action.error.message
    })

    builder.addCase(userSignIn.pending, (state)=>{
       state.isLoading = true;
       state.isError = false;
       state.email = "";
       state.name = "";
       state.error = "";
    })
    .addCase(userSignIn.fulfilled, (state,{payload})=>{
        state.isLoading = false;
        state.isError = false;
        state.email = payload.email;
        state.name = payload.name;
        state.error = "";
    })
    .addCase(userSignIn.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.email = "";
       state.name = "";
       state.error = action.error.message;
    })

    builder.addCase(googleSignIn.pending,(state)=>{
      pending(state)
    })
    .addCase(googleSignIn.fulfilled,(state,{payload})=>{
       fulfilled(state,payload)
    })
    .addCase(googleSignIn.rejected,(state,action)=>{
      rejected(state,action)
    })

  }
});

export const { setUser, toggleLoading, handleLogout } = userSlice.actions;

export default userSlice.reducer;
