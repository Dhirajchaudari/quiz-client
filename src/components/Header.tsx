import { useNavigate } from "react-router-dom";
import Button from "../Reusable/Button";
import { useLocation } from "react-router-dom";
import { DashboardPages } from "../interfaces";
import { getToken } from "../helper";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const isUser = getToken();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="flex items-center"
          onClick={() => navigate(DashboardPages.Home)}
        >
          <img
            src="https://th.bing.com/th/id/OIP.sc6M4crapELc0sxi1nrN0wHaHa?w=202&h=202&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Quiz Application Logo"
            className="h-12 w-12"
          />
          <span className="ml-4 text-xl font-bold">Quiz App</span>
        </div>
        <div className="flex">
          {path !== DashboardPages.Home && (
            <Button
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => navigate(DashboardPages.Home)}
            >
              Home
            </Button>
          )}
          {(path === DashboardPages.Home || path === DashboardPages.SignUp) &&
            !isUser && (
              <Button
                className="bg-blue-500 w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => navigate(DashboardPages.SignIn)}
              >
                Sign In
              </Button>
            )}
          {(path === DashboardPages.Home || path === DashboardPages.SignIn) &&
            !isUser && (
              <Button
                className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(DashboardPages.SignUp)}
              >
                Sign Up
              </Button>
            )}
          {isUser && path === DashboardPages.Home && (
            <Button
              className="bg-red-500 w-auto hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate(DashboardPages.Dashboard)}
            >
              Dashboard
            </Button>
          )}
          {isUser && (
            <Button
              className="bg-yellow-500 w-auto hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate(DashboardPages.Quiz)}
            >
              Create Quiz
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
