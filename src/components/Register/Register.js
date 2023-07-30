import './Register.css';

import AuthForm from '../AuthForm/AuthForm';

export default function Register({ onSubmit, errMessage }) {
  return (
    <main className="register">
      <AuthForm
        isRegister={true}
        onSubmit={onSubmit}
        errMessage={errMessage}
      />
    </main>
  )
}