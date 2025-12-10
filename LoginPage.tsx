 import React, { useState } from 'react';
import { apiLogin, apiRegister } from "../services/api";

interface LoginPageProps {
  onLogin: (token: string, user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👀 Eye icon toggle
  const [error, setError] = useState(""); // ❌ Error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data;

    if (isLoginView) {
      // LOGIN
      try {
        data = await apiLogin(email, password);

        if (data.token && data.user) {
          localStorage.setItem("mt_token", data.token);
          localStorage.setItem("mt_user", JSON.stringify(data.user));
          onLogin(data.token, data.user);
          setError(""); // clear error on success
        } else {
          setError("Invalid email or password"); // ❌ red message
        }
      } catch (err) {
        setError("User not found. Please register first."); // ❌ red message
      }
    } else {
      // REGISTER
      try {
        data = await apiRegister(name, email, password);

        if (data.token) {
          alert("Account created! Please login now.");
          setIsLoginView(true);
          setError(""); // clear previous errors
        } else {
          setError("Registration failed");
        }
      } catch (err) {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          {/* 🔹 Password field with eye icon for both Login & Register */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* 🔹 Error message for Login */}
          {isLoginView && error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg">
            {isLoginView ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => {
            setIsLoginView(!isLoginView);
            setError(""); // clear error when switching views
          }}
        >
          {isLoginView ? "Create new account" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
