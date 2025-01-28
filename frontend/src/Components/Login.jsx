import React, { useState } from 'react';
import backend from '/src/assets/login.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });
  

  const validateForm = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const formData = new FormData(e.target);
    const username = formData.get("username").trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password").trim();

    if (!username) newErrors.username = "Username is required";
    if (isSignUp && !email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      const url = isSignUp ? 'https://backend-production-8a7c.up.railway.app/admin/signup' : 'https://backend-production-8a7c.up.railway.app/admin/login';
      const method = 'POST';
      const body = JSON.stringify({ username, email, password });
      const headers = { 'Content-Type': 'application/json' };

      try {
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (response.ok) {
          alert(isSignUp ? "Registered successfully!" : "Logged in successfully!");
          navigate('/dashboard');
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderError = (field) => {
    return errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-[1000px] h-auto md:h-[600px] p-5 rounded-lg shadow-lg flex flex-col md:flex-row justify-between bg-gradient-to-br from-gray-700 to-gray-800">
        
        {/* Partie gauche avec l'image */}
        <div 
          className="hidden md:flex w-2/3 mr-8 rounded-lg shadow-lg overflow-hidden items-center justify-center relative"
          style={{ 
            backgroundImage: `url(${backend})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            opacity: 0.85,
          }} 
        >
          <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
          <div className="z-10 text-center px-8">
            <h2 className="text-white text-4xl font-bold leading-tight">
              {isSignUp ? "Optimize Your Workforce" : "Welcome to Employee Management System"}
            </h2>
            <p className="text-gray-200 mt-4 text-lg leading-relaxed">
              {isSignUp 
                ? "Sign up today to streamline employee management and boost productivity."
                : "Log in to efficiently track, manage, and enhance your workforce operations."}
            </p>
          </div>
        </div>

        {/* Partie droite avec le formulaire */}
        <div className="w-full md:w-[400px] mr-2 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl mb-8 font-bold transition-all duration-300">
            {isSignUp ? "Sign Up Form" : "Log In Form"}
          </h1>

          <form onSubmit={validateForm} className="w-full space-y-4">
            {/* Champ Username */}
            <div>
              <label htmlFor="username" className="block text-lg">Username:</label>
              <input 
                type="text" 
                name="username" 
                aria-label="Username"
                autoComplete="off" 
                placeholder="Enter Username" 
                onChange={(e) => setValues({...values,username:e.target.value})}
                className="input-style"
              />
              {renderError("username")}
            </div>

            {/* Champ Email (visible uniquement lors du signup) */}
            {isSignUp && (
              <div>
                <label htmlFor="email" className="block text-lg">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  aria-label="Email"
                  autoComplete="off" 
                  placeholder="Enter Email" 
                  onChange={(e) => setValues({...values,email:e.target.value})}
                  className="input-style"
                />
                {renderError("email")}
              </div>
            )}

            {/* Champ Password */}
            <div>
              <label htmlFor="password" className="block text-lg">Password:</label>
              <input 
                type="password" 
                name="password" 
                aria-label="Password"
                autoComplete="off" 
                placeholder="Enter Password" 
                onChange={(e) => setValues({...values,password:e.target.value})}
                className="input-style mb-2"
              />
              {renderError("password")}
            </div>

            {/* Options supplémentaires pour login */}
            {!isSignUp && (
              <div className="mt-[-10px] mb-5 flex justify-between items-center">
                <label className="flex items-center text-sm">
                  <input 
                    type="checkbox" 
                    className="accent-gray-400 mr-2 h-[12px] w-[12px]" 
                  /> 
                  Remember me
                </label>
                <a href="#" className="text-gray-400 hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Bouton de soumission */}
            <button 
              type="submit" 
              className="w-full text-xl py-3 rounded-md bg-gradient-to-r from-purple-900 to-purple-950 text-white font-semibold hover:from-purple-800 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
            </button>

            {/* Lien de changement entre login et signup */}
            <div className="text-sm font-medium text-center mt-3">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <a 
                  href="#" 
                  className="ml-1 font-semibold underline cursor-pointer"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? " Log In" : " Register"}
                </a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
