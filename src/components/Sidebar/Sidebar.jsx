import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { IoSettingsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoLibraryOutline } from "react-icons/io5";

const Sidebar = () => {
  const getNavLinkClass = (isActive) =>
    `py-2 hover:bg-white hover:text-[#034F75] rounded-full transition-all w-full flex flex-row space-x-2 items-center justify-center
    ${isActive ? "bg-white text-[#034F75]" : ""}`;
  return (
    <div className="p-4 w-full">
      {/* Logo HCMUT */}
      <div className="flex flex-row items-center my-2">
        <div className="rounded-full bg-white p-1 w-16 h-16">
          <img
            src={Logo}
            alt="Logo HCMUT"
            className="h-full w-full rounded-full object-cover
            "
          />
        </div>
        <div className="text-[25px] font-secondary font-semibold mx-4">
          HCMUT
        </div>
      </div>

      {/* Path Link */}
      <div className="my-10 flex flex-col items-center justify-center gap-4 font-secondary font-medium text-[17px]">
        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
          <GoHome size={22} />
          <div>Dashboard</div>
        </NavLink>

        {/* role STUDENT  */}
        <NavLink
          to="/student/my-courses"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <IoLibraryOutline size={20} />
          <div>My courses</div>
        </NavLink>

        <NavLink
          to="/student/grade"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          Grade
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          Notifications
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <IoSettingsOutline size={22} />
          <div>Settings</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
