import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({element: Component, ...props}) {
  return (
    ((props.isLoggedIn && !props.isAuthPage) || (!props.isLoggedIn && props.isAuthPage)) ? <Component {...props} />  : <Navigate to="/" replace/>
  );
}