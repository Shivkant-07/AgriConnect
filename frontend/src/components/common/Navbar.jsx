import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaLeaf,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [farmerMenu, setFarmerMenu] = useState(false);
 
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Weather", path: "/weather" },
    { name: "Mandi", path: "/mandi" },
    { name: "Schemes", path: "/schemes" },
    { name: "News", path: "/news" },
    { name: "Marketplace", path: "/marketplace"},
    { name: "My Requests", path: "/my-requests"},
    { name: "Profile", path: "/profile"},
    
  ];

  return (
    <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <FaLeaf className="text-yellow-300 text-3xl" />
          <h1 className="text-2xl font-bold">
            AgriConnect
          </h1>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold"
                  : "hover:text-yellow-300 transition"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!token ? (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setFarmerMenu(!farmerMenu)
                }
                className="flex items-center gap-2 hover:text-yellow-300"
              >
                <FaUserCircle className="text-2xl" />

                Farmer ▾
              </button>

              {farmerMenu && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-lg w-48 overflow-hidden">

                  <Link
                    to="/add-crop"
                     onClick={() => setFarmerMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Add Crop
                  </Link>

                  <Link
                    to="/my-crops"
                     onClick={() => setFarmerMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    My Crops
                  </Link>

                  <button
                   onClick={() => {setFarmerMenu(false); handleLogout(); }}
                    className="block w-full text-left px-4 py-3 hover:bg-red-100 text-red-600"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-green-800 px-6 py-4 flex flex-col gap-4">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {!token ? (
            <>
              <NavLink to="/login">
                Login
              </NavLink>

              <NavLink to="/register">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/add-crop">
                Add Crop
              </NavLink>

              <NavLink to="/my-crops">
                My Crops
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-left text-red-300"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;