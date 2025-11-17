import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate proper email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const trimmedEmail = email.trim();

    // Check format only
    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      alert('Email is sent, check your inbox');
      navigate('/verify-otp', { state: { email: trimmedEmail } });
    }, 1000); // 1 second delay to simulate API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">FoodHub</h1>
          <p className="text-gray-600">Reset your password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Sign In
          </button>

          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-600 mb-6">
            No worries! Enter your email and we'll send you an OTP to reset your password.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />

                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
