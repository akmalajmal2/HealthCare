import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

interface RegisterProp {
  email: string;
  password: string;
}

const Register = () => {
  const [form, setForm] = useState<RegisterProp>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      alert("Registration successfull");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <section className="bg-gray-100 h-screen flex flex-col items-center justify-center ">
      <form
        onSubmit={handleRegister}
        className="max-w-lg max-h-lg flex flex-col gap-4 bg-emerald-100 rounded-2xl p-6 border border-emerald-300"
      >
        <h3 className="font-bold text-3xl  text-gray-700 mb-3 text-center">
          Register
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
        <Button variant="secondary" type="submit">
          {loading ? "Creating..." : "Register"}
        </Button>
        {error && <p className="text-lg text-red-900 font-semibold">{error}</p>}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Register;
