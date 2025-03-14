import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-secondary font-bold text-gray-800 flex">
          {user?.userDTO.name}{" "}
          <div className="pl-2">
            {user?.userDTO.role === "STUDENT"
              ? `- ${user?.studentDTO.studentId}`
              : ""}
          </div>
        </h1>
        <span className="text-sm text-gray-500 font-primary">
          {user?.userDTO.role}
        </span>
      </div>
      <div className="flex items-center">
        {/* <span className="text-gray-600 mr-4">User Name</span> */}
        <button
          onClick={logOut}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded flex items-center space-x-2 font-primary"
        >
          <IoLogOutOutline size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
