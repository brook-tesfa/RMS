import React from 'react';
import { LoginForm } from '../components/auth/login-form';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}