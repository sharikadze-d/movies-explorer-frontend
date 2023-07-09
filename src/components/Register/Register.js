import './Register.css';

import AuthForm from '../AuthForm/AuthForm';

export default function Register({ onSubmit }) {
  return (
    <main className="register">
      <AuthForm
        isRegister={true}
        onSubmit={onSubmit}
      />
    </main>
  )
}