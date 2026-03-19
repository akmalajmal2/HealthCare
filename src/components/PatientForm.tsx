import { useState, type ChangeEvent, type FormEvent } from "react";
import Input from "./Input";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addPatient } from "../features/patientSlice";

const PatientForm = () => {
  const [form, setForm] = useState({ name: "", age: "", disease: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addPatient({
        name: form.name,
        age: Number(form.age) || 0,
        disease: form.disease,
      }) as any,
    );

    setForm({ name: "", age: "", disease: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        value={form.name}
        name="name"
        required
        placeholder="patient name"
      />
      <Input
        onChange={handleChange}
        value={form.age}
        name="age"
        required
        placeholder="patient age"
      />
      <Input
        onChange={handleChange}
        value={form.disease}
        name="disease"
        required
        placeholder="patient disease"
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
};
export default PatientForm;
