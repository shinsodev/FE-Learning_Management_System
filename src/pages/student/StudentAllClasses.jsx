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
    setPage(event.selected);
  };

  if (isLoading) return <Loading />;
  if (classData.length === 0)
    return <p className="text-gray-500 text-center mt-4">No data available</p>;

  return (
    <div className="mt-8 font-sans p-6 w-full mx-auto bg-white shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        📚 <span className="text-gray-700">Class Information</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-lg font-bold text-white bg-blue-500 w-full p-4 rounded-t-lg">
              {item.subjectId} - {item.name}
            </h3>
            <div className="p-5">
              {/* <p className="text-gray-700">
                <strong className="text-gray-700">📌 Subject ID:</strong>{" "}
                {item.subjectId}
              </p> */}
              <p className="text-gray-700">
                <strong className="text-gray-700">📅 Semester:</strong>{" "}
                {item.semester}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-700">🕒 Start Time:</strong>{" "}
                {item.startTime}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-700">🕒 End Time:</strong>{" "}
                {item.endTime}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-700">👨‍🏫 Lecturers:</strong>{" "}
                {item.lecturersUsernameList?.length > 0 ? (
                  item.lecturersUsernameList.join(", ")
                ) : (
                  <span className="text-red-600">No lecturers assigned</span>
                )}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-700">📆 Days:</strong>{" "}
                {item.dayOfWeek?.length > 0 ? (
                  item.dayOfWeek.join(", ")
                ) : (
                  <span className="text-red-600">No schedule</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        forcePage={page}
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
      />
    </div>
  );
};

export default StudentAllClasses;
