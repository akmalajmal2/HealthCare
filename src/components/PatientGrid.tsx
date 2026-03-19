import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../features/patientSlice";
import type { RootState } from "../app/store";

interface Patient {
  id?: string;
  name: string;
  age: number;
  disease: string;
}

const PatientGrid = () => {
  const dispatch = useDispatch();
  const { patients, loading } = useSelector(
    (state: RootState) => state.patient,
  );

  useEffect(() => {
    dispatch(fetchPatients() as any);
  }, [dispatch]);

  // ✅ Loading state
  if (loading) {
    return <p className="text-center text-gray-600">Loading patients...</p>;
  }

  // ✅ Empty state
  if (!patients.length) {
    return <p className="text-center text-gray-500">No patients found</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {patients.map((patient: Patient) => (
        <li
          key={patient.id} // ✅ FIXED
          className="bg-purple-100 border border-purple-300 rounded-xl p-4 text-gray-800 shadow-sm hover:shadow-md transition"
        >
          <h4 className="font-semibold">
            Patient Name: <span className="font-normal">{patient.name}</span>
          </h4>

          <h4 className="font-semibold">
            Age: <span className="font-normal">{patient.age || "N/A"}</span>
          </h4>

          <p className="font-semibold">
            Disease:{" "}
            <span className="font-normal">{patient.disease || "N/A"}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default PatientGrid;
