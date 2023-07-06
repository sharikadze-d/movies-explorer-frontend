import AuthForm from '../AuthForm/AuthForm';

export default function Login() {
  return (
    <main className="register">
      <AuthForm isRegister={false}/>
    </main>
  )
}