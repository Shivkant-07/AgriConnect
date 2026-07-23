import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login",{email,password});
      console.log(response.data);
      alert("you are successfully logged in")
     navigate("/");
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
            Farmer Login
          </h1>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            Login
          </button>

        </div>
      </div>
    </form>
  );
}

export default Login;