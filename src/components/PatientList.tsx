import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../features/patientSlice";

interface Patient {
  id?: string;
  name: string;
  age: number;
  disease: string;
}

const PatientList = () => {
  const dispatch = useDispatch();
  const { patients } = useSelector((state: any) => state.patient);

  useEffect(() => {
    dispatch(fetchPatients() as any);
  }, [dispatch]);

  return (
    <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <thead className="bg-sky-900 text-white">
        <tr>
          <th className="py-2 px-4 text-left text-sm uppercase">
            Patient Name
          </th>
          <th className="py-2 px-4 text-left text-sm uppercase">Patient Age</th>
          <th className="py-2 px-4 text-left text-sm uppercase">Disease</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {patients.length > 0 &&
          patients.map((patient: Patient, idx: number) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-100 odd:bg-gray-100"
            >
              <td className="py-2 px-4">{patient.name}</td>
              <td className="py-2 px-4">{patient.age}</td>
              <td className="py-2 px-4">{patient.disease}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default PatientList;
