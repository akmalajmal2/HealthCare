import { useState } from "react";
import PatientForm from "../components/PatientForm";
import Button from "../components/Button";
import PatientList from "../components/PatientList";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import PatientGrid from "../components/PatientGrid";

const PatientDetails = () => {
  const [view, setView] = useState<"list" | "grid">("grid");
  const [isNewPatient, setIsNewPatient] = useState(false);
  return (
    <section className="w-full h-full">
      <Button variant="secondary" onClick={() => setIsNewPatient(true)}>
        + Patient
      </Button>
      {isNewPatient && <PatientForm />}
      <section>
        <div className="flex gap-2 mt-10 mb-2">
          <Button
            className={`flex  gap-1 rounded-3xl border  text-sm!  bg-gray-100! border-gray-300 text-gray-600! ${view === "grid" ? "bg-purple-500! border-purple-700 text-white!" : ""}`}
            onClick={() => setView("grid")}
          >
            <BsGrid1X2Fill className="p-0 m-0 leading-0" />
            <span>Grid</span>
          </Button>
          <Button
            className={`flex  gap-1 rounded-3xl border  text-sm!  bg-gray-100! border-gray-300 text-gray-600! ${view === "list" ? "bg-purple-500! border-purple-700 text-white!" : ""}`}
            onClick={() => setView("list")}
          >
            <FaThList />
            <span>List</span>
          </Button>
        </div>
        {view === "list" && <PatientList />}
        {view === "grid" && <PatientGrid />}
      </section>
    </section>
  );
};
export default PatientDetails;
