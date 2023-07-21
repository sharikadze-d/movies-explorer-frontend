import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({element: Component, ...props}) {
  console.log(props.isLoggedIn)
  return (
    props.isLoggedIn ? <Component {...props} />  : <Navigate to="/signup" replace/>
  );
}