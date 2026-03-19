import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";

const Dashboard = () => {
  const navigate = useNavigate();

  const { patients } = useSelector((state: RootState) => state.patient);

  // ✅ Memoized calculations
  const { total, avgAge, diseaseMap, topDisease, recentPatients } =
    useMemo(() => {
      const total = patients.length;

      const avgAge =
        patients.reduce((acc: any, p: any) => acc + p.age, 0) / (total || 1);

      const diseaseMap: Record<string, number> = {};

      patients.forEach((p) => {
        diseaseMap[p.disease] = (diseaseMap[p.disease] || 0) + 1;
      });

      const topDisease =
        Object.entries(diseaseMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

      const recentPatients = [...patients].slice(-5).reverse();

      return { total, avgAge, diseaseMap, topDisease, recentPatients };
    }, [patients]);

  return (
    <div className="p-4 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* 🔥 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">Total Patients</h3>
          <p className="text-xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">Average Age</h3>
          <p className="text-xl font-bold">{avgAge.toFixed(1)}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">Top Disease</h3>
          <p className="text-xl font-bold">{topDisease}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600">Unique Diseases</h3>
          <p className="text-xl font-bold">{Object.keys(diseaseMap).length}</p>
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/patients")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Patients
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          View Analytics
        </button>
      </div>

      {/* 🚑 Alerts */}
      {patients.some((p) => p.age > 60) && (
        <div className="bg-red-100 border border-red-300 p-3 rounded text-red-700">
          ⚠️ Some patients are above 60 years old (high priority)
        </div>
      )}

      {/* 📋 Recent Patients */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-3 text-gray-700">Recent Patients</h2>

        {recentPatients.length === 0 ? (
          <p className="text-gray-500">No recent patients</p>
        ) : (
          <ul className="space-y-2">
            {recentPatients.map((p) => (
              <li key={p.id} className="flex justify-between border-b pb-1">
                <span>{p.name}</span>
                <span className="text-sm text-gray-500">{p.disease}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
