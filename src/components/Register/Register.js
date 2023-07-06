import AuthForm from '../AuthForm/AuthForm';

export default function Register() {
  return (
    <main className="register">
      <AuthForm isRegister={true}/>
    </main>
  )
}