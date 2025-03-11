import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
// Icons
import { IoMdAddCircle } from "react-icons/io";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";

// API
import {
  adminGetAllClasses,
  adminAddClass,
  adminDeleteClass,
  adminUpdateClass,
  adminGetClassById,
} from "../../services/ClassServices";

// Components
import Loading from "../../components/Loading/Loading";
import AddClassForm from "../../components/admin/AddClassForm";
import UpdateClassForm from "../../components/admin/UpdateClassForm";

const AdminAllClasses = () => {
  const [classData, setClassData] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  useEffect(() => {
    fetchClassData();
  }, [page]);

  const fetchClassData = async () => {
    setIsLoading(true);
    try {
      const res = await adminGetAllClasses(page);
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

  const handleAddClass = async (newClass) => {
    setIsLoading(true);
    try {
      const response = await adminAddClass(
        newClass.name,
        newClass.subjectId,
        newClass.semester,
        newClass.startTime,
        newClass.endTime,
        newClass.daysOfWeek
      );

      if (response?.data?.statusCode === 200) {
        toast.success(response.data.message);
        fetchClassData();
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetClassData = async (id) => {
    try {
      const response = await adminGetClassById(id);
      if (response?.data?.statusCode === 200) {
        console.log(response);
        setSelectedClass(response.data.classDTO);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClass = async (curClass) => {
    setIsLoading(true);
    try {
      const response = await adminUpdateClass(
        curClass.id,
        curClass.name,
        curClass.subjectId,
        curClass.semester,
        curClass.startTime,
        curClass.endTime,
        curClass.daysOfWeek,
        // curClass.lecturersUsernameList
        []
      );

      if (response?.data?.statusCode === 200) {
        toast.success(response.data.message);
        fetchClassData();
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClass = async (id) => {
    setIsLoading(true);
    try {
      const response = await adminDeleteClass(id);
      if (response?.data?.statusCode === 200) {
        toast.success(response.data.message);
        fetchClassData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (classData.length === 0)
    return <p className="text-gray-500 text-center mt-4">No data available</p>;

  return (
    <div className="mt-8 font-sans">
      {/* <h2 className="font-bold text-2xl text-gray-800 mb-4">
        Class Information
      </h2> */}

      {/* Button open add class form */}
      <button
        onClick={() => setIsModalAddOpen(true)}
        className="mt-4 mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center space-x-2"
      >
        <IoMdAddCircle size={20} /> <div className="font-medium">Add Class</div>
      </button>

      {/* Show add class form */}
      <AddClassForm
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onSubmit={handleAddClass}
      />
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
              <th className="py-3 px-4">Actions</th>
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
                <td className="py-3 px-4 flex items-center justify-center space-x-2">
                  <HiMiniPencilSquare
                    size={20}
                    className="text-yellow-500 hover:text-yellow-700 hover:cursor-pointer"
                    onClick={() => {
                      handleGetClassData(item.id), setIsModalUpdateOpen(true);
                    }}
                  />
                  <MdDelete
                    size={22}
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                    onClick={() => handleDeleteClass(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show update class form */}
      <UpdateClassForm
        isOpen={isModalUpdateOpen}
        onClose={() => setIsModalUpdateOpen(false)}
        onSubmit={handleUpdateClass}
        selectedClass={selectedClass}
      />

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

export default AdminAllClasses;
