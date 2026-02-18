import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Button, Input, Loader } from '../components/common/index';
import { useAuth } from '../context/AuthContext';

/**
 * Sign In Page - Allows users to log in with dummy credentials
 */
export function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    // Call login function from Auth Context
    const success = await login(email, password);
    if (success) {
      navigate('/user/dashboard');
    } else {
      setFormError(error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Centered Sign In Form */}
      <div className="flex items-center justify-center py-24">
        <div className="bg-surface rounded-xl shadow-sm border border-border p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary text-center mb-8 text-sm">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />

            {/* Error Message */}
            {(formError || error) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-danger text-sm">{formError || error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="py-3 text-lg"
            >
              {isLoading ? <Loader size="sm" /> : 'Sign In'}
            </Button>

            {/* Helper Text with Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <p className="text-primary font-semibold mb-2">Demo Credentials:</p>
              <p className="text-text-secondary">Email: test@example.com</p>
              <p className="text-text-secondary">Password: 123456</p>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-text-secondary mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Sign Up Page - Allows users to create a new account
 */
export function SignUp() {
  const navigate = useNavigate();
  const { signup, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Basic validation
    if (!email || !password || !name || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    // Call signup function from Auth Context
    const success = await signup(email, password, name);
    if (success) {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Centered Sign Up Form */}
      <div className="flex items-center justify-center py-24">
        <div className="bg-surface rounded-xl shadow-sm border border-border p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            Create Account
          </h1>
          <p className="text-text-secondary text-center mb-8 text-sm">
            Join BRD Agent and start generating BRDs from conversations
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />

            {/* Error Message */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-danger text-sm">{formError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="py-3 text-lg"
            >
              {isLoading ? <Loader size="sm" /> : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-text-secondary mt-6">
            Already have an account?{' '}
            <a href="/signin" className="text-primary font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
