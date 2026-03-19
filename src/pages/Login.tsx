import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginProps>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert("Login successfull");
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  return (
    <section className="bg-gray-100 h-screen flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg max-h-lg flex flex-col gap-4 bg-blue-200 rounded-2xl p-6 border border-blue-300"
      >
        <h3 className="font-bold text-3xl  text-gray-700 mb-3 text-center">
          Login
        </h3>
        <label>
          Email:
          <Input
            className="ml-auto"
            required
            type="email"
            onChange={handleChange}
            name="email"
            value={form.email}
            placeholder="enter email"
          />
        </label>
        <label className="block">
          Password:
          <Input
            required
            type="password"
            onChange={handleChange}
            name="password"
            value={form.password}
            placeholder="enter password"
          />
        </label>
        <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
        {error && <p className="text-lg text-red-900 font-semibold">{error}</p>}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
