import './Login.css';

import AuthForm from '../AuthForm/AuthForm';

export default function Login({ errMessage, onSubmit }) {
  return (
    <main className="login">
      <AuthForm 
        isRegister={false}
        errMessage={errMessage}
        onSubmit={onSubmit} />
    </main>
  )
}