import { useSelector } from "react-redux";

const Analytics = () => {
  const { patients } = useSelector((state: any) => state.patient);
  const totalPatients = patients.length;
  const avgAge =
    patients.reduce((acc: number, p: any) => acc + p.age, 0) /
    (patients.length || 1);

  const diseaseMap: Record<string, number> = {};

  patients.forEach((p: any) => {
    diseaseMap[p.disease] = (diseaseMap[p.disease] || 0) + 1;
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded">
          <h2>Total Patients</h2>
          <p className="text-xl font-bold">{totalPatients}</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2>Average Age</h2>
          <p className="text-xl font-bold">{avgAge.toFixed(1)}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded">
          <h2>Total Diseases</h2>
          <p className="text-xl font-bold">{Object.keys(diseaseMap).length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Disease Distribution</h2>

        {Object.entries(diseaseMap).map(([disease, count]) => (
          <div key={disease} className="flex justify-between border-b py-2">
            <span>{disease}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Analytics;
