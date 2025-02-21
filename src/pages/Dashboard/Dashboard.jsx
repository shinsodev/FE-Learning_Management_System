const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
        <div className="bg-white shadow-lg rounded-lg p-2 md:p-4 m-2 flex flex-row md:flex-col justify-center items-center border-l-4 border-blue-600 space-x-4 md:space-x-0 md:space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-red-500 font-sans">
            3.5
          </h2>
          <div className="md:flex md:flex-col md:items-center md:justify-center">
            <span className="text-sm md:text-lg text-gray-600 font-primary">
              GPA
            </span>
            <p className="text-xs md:text-sm text-gray-500 font-primary">
              {"Cumulative GPA for the major (4.0 scale)"}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-2 md:p-4 m-2 flex flex-row md:flex-col justify-center items-center border-l-4 border-blue-600 space-x-4 md:space-x-0 md:space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-red-500 font-sans">
            3.5
          </h2>
          <div className="md:flex md:flex-col md:items-center md:justify-center">
            <span className="text-sm md:text-lg text-gray-600 font-primary">
              GPA
            </span>
            <p className="text-xs md:text-sm text-gray-500 font-primary">
              {"Cumulative GPA for the major (4.0 scale)"}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-2 md:p-4 m-2 flex flex-row md:flex-col justify-center items-center border-l-4 border-blue-600 space-x-4 md:space-x-0 md:space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-red-500 font-sans">
            128
          </h2>
          <div className="md:flex md:flex-col md:items-center md:justify-center">
            <span className="text-sm md:text-lg text-gray-600 font-primary">
              Credits
            </span>
            <p className="text-xs md:text-sm text-gray-500 font-primary">
              Credits completed for the major
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
