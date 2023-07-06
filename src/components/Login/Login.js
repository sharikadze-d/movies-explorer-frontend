import './Login.css';

import AuthForm from '../AuthForm/AuthForm';

export default function Login() {
  return (
    <main className="login">
      <AuthForm isRegister={false}/>
    </main>
  )
}