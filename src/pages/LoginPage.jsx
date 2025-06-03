import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer un email valide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3111/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        dispatch(setUser(userData));

        navigate("/home");
      } else if (response.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-4">Crypto</h1>

          <img
            src="https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2Fcrypto-logo.png?alt=media"
            alt="Crypto logo"
            className="mx-auto mb-4 h-24"
          />

          <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>

          <p className="text-gray-400 mb-6 text-sm">
            Enter your email below to login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
                placeholder="Email"
              />
              <p className="text-sm text-gray-400 mt-1">
                Enter your email address
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white text-black border border-gray-300"
                placeholder="Password"
              />
              <p className="text-sm text-gray-400 mt-1">Enter your password</p>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2Flogin.png?alt=media"
          alt="Crypto login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default LoginPage;
