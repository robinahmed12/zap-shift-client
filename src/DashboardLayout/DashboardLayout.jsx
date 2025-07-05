import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiPackage, FiMenu, FiX } from "react-icons/fi";
import { FiDollarSign, FiClock, FiUserCheck, FiUserPlus } from "react-icons/fi";
import useAuth from "../hook/useAuth";
import useUserRole from "../hook/useUserRole";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const email = user?.email;
  const { data: role } = useUserRole(email);
  console.log(role);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-30 w-64 h-full bg-white shadow-md transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 border-b border-gray-200">
          <Link
            to={"/"}
            className="text-2xl font-bold"
            style={{ color: "#E30613" }}
          >
            Parcel Delivery
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                style={{ color: "#000000" }}
                onClick={() => setSidebarOpen(false)}
              >
                <FiHome className="mr-3" style={{ color: "#E30613" }} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-parcel"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                style={{ color: "#000000" }}
                onClick={() => setSidebarOpen(false)}
              >
                <FiPackage className="mr-3" style={{ color: "#E30613" }} />
                <span>My Parcel</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payment-history"
                className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                style={{ color: "#000000" }}
                onClick={() => setSidebarOpen(false)}
              >
                <FiDollarSign className="mr-3" style={{ color: "#E30613" }} />
                <span>Payment History</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/pending-riders"
                    className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                    style={{ color: "#000000" }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FiClock className="mr-3" style={{ color: "#E30613" }} />
                    <span>Pending Riders</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/active-riders"
                    className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                    style={{ color: "#000000" }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FiUserCheck
                      className="mr-3"
                      style={{ color: "#E30613" }}
                    />
                    <span>Active Riders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/assign-rider"
                    className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                    style={{ color: "#000000" }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FiUserPlus className="mr-3" style={{ color: "#E30613" }} />
                    <span>Assign Rider</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/make-admin"
                    className="flex items-center p-3 rounded-lg hover:bg-red-50 group"
                    style={{ color: "#000000" }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FiUserPlus className="mr-3" style={{ color: "#E30613" }} />
                    <span>Make Admin</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="flex items-center space-x-4">
              <span className="font-medium">Welcome back!</span>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
