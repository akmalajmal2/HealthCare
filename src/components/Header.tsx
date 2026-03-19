import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();

  const headers = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Analytics", url: "/analytics" },
    { id: 3, title: "Patients", url: "/patients" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        {/* Logo */}
        <h3
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer mb-3 md:mb-0"
        >
          Logo
        </h3>

        {/* Navigation */}
        <ul className="flex flex-col md:flex-row items-center gap-6">
          {headers.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `transition hover:text-blue-400 ${
                    isActive ? "text-blue-400! underline!" : ""
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}

          {/* Logout */}
          <li>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
