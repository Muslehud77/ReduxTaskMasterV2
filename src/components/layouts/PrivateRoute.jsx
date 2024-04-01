import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../utils/firebase.config';
import { setUser, toggleLoading } from '../../redux/features/user/userSlice';

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  // const isLoading = false;
  const { email, isLoading } = useSelector((state) => state.userSlice);
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      // console.log(user);
      if(user){
        console.log(email);
        dispatch(setUser({displayName : user.displayName,email:user.email}))
        dispatch(toggleLoading({loading : false}));
      }else{
        dispatch(toggleLoading({ loading: false }));
      }
    })
  },[])
 
  console.log(pathname);
  
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname}} />;
  }

  return children;
};

export default PrivateRoute;
