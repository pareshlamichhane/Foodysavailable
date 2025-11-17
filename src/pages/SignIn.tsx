import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useAuth from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SignIn({}: any) {
  const { login, socialLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    const success = login(formData.email, formData.password);
    
    if (success) {
      navigate('home');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth response
    const mockGoogleUser = {
      email: 'google.user@gmail.com',
      name: 'Google User'
    };
    socialLogin('google', mockGoogleUser);
    navigate('/');
  };

  const handleFacebookLogin = () => {
    // Simulate Facebook OAuth response
    const mockFacebookUser = {
      email: 'facebook.user@fb.com',
      name: 'Facebook User'
    };
    socialLogin('facebook', mockFacebookUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">FoodHub</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome Back!</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    setError('');
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    setError('');
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-orange-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className='flex justify-center items-center '>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg px-20 hover:bg-gray-300 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>


            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-orange-600 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials:</p>
            <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1">
              <p><strong>Admin:</strong> admin@foodhub.com / admin123</p>
              <p><strong>User:</strong> john@example.com / user123</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-orange-600 text-sm"
          >
            ← Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}