import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

// API
import { studentGetAllClasses } from "../../services/ClassServices";

// Components
import Loading from "../../components/Loading/Loading";

const StudentAllClasses = () => {
  const [classData, setClassData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchClassData();
  }, [page]);

  const fetchClassData = async () => {
    setIsLoading(true);
    try {
      const res = await studentGetAllClasses(page);
      if (res.status === 200) {
        setClassData(res.data.listClassDTO);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (event) => {
    console.log(event.selected);
    setPage(event.selected);
  };

  if (isLoading) return <Loading />;
  if (classData.length === 0)
    return <p className="text-gray-500 text-center mt-4">No data available</p>;

  return (
    <div className="mt-8 font-sans">
      {/* <h2 className="font-bold text-2xl text-gray-800 mb-4">
        Class Information
      </h2> */}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-slate-500 text-white text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Subject ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Semester</th>
              <th className="py-3 px-4">Start Time</th>
              <th className="py-3 px-4">End Time</th>
              <th className="py-3 px-4">Lecturers</th>
              <th className="py-3 px-4">Days</th>
              {/* <th className="py-3 px-4">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {classData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-all`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.subjectId}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.semester}</td>
                <td className="py-3 px-4">{item.startTime}</td>
                <td className="py-3 px-4">{item.endTime}</td>
                <td className="py-3 px-4">
                  {item.lecturersUsernameList?.length > 0
                    ? item.lecturersUsernameList.join(", ")
                    : "No lecturers assigned"}
                </td>
                <td className="py-3 px-4">
                  {item.dayOfWeek?.length > 0
                    ? item.dayOfWeek.join(", ")
                    : "No schedule"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        breakLabel="..."
        forcePage={page} //important to make sure the page is correct
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white" // Active page style
        previousClassName="page-item"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextClassName="page-item"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
        containerClassName="pagination"
      />
    </div>
  );
};

export default StudentAllClasses;
