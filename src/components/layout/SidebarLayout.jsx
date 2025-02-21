import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row p-4 bg-[#CAE1EC] min-h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-[#034F75] text-white rounded-2xl shadow-2xl">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 font-primary">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg">
          <Header />
        </div>

        {/* Dynamic Content */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
