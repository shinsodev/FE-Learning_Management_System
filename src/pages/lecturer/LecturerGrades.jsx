import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import ReactPaginate from "react-paginate";
import { CiSearch } from "react-icons/ci";
import {
  lecturerGetStudyByClassId,
  lecturerAddGradesByExcel,
  lecturerUpdateGradesByExcel,
} from "../../services/StudyServices";
import { RiFileExcel2Fill } from "react-icons/ri";

const LecturerGrades = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [classId, setClassId] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const fileInputRef = useRef(null);

  const handlePageClick = (event) => {
    setPage(event.selected);
    fetchGrades(classId, event.selected);
  };

  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      const res = await lecturerGetStudyByClassId(classId, page);
      if (res.status === 200) {
        setData(res.data.listStudyDTO);
        setTotalPages(res.data.totalPages);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExcel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateExcel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await lecturerAddGradesByExcel(formData);
      if (res.status === 200) {
        fetchGrades();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpdateChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await lecturerUpdateGradesByExcel(formData);
      if (res.status === 200) {
        fetchGrades();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">🎓 Lecture Grades</h2>
      <div className="w-full flex items-center space-x-2 mb-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center justify-center space-x-2">
            <input
              type="number"
              className="border p-2 rounded-md"
              placeholder="Enter class ID"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              onClick={fetchGrades}
            >
              <CiSearch size={20} />
            </button>
          </div>

          <div className="flex space-x-4">
            {/* Add grades by excel */}
            <button
              className="bg-green-600 text-white font-medium text-[17px] p-2 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
              onClick={handleAddExcel}
            >
              <RiFileExcel2Fill size={20} />
              <div>Add grades</div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />

            {/* Update grades by excel */}
            <button
              className="bg-yellow-600 text-white font-medium text-[17px] p-2 rounded-lg hover:bg-yellow-700 transition-all flex items-center justify-center space-x-2"
              onClick={handleUpdateExcel}
            >
              <RiFileExcel2Fill size={20} />
              <div>Update grades</div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".xlsx, .xls"
              onChange={handleFileUpdateChange}
            />
          </div>
        </div>
      </div>
      {data?.length === 0 && (
        <div className="text-gray-600">This class has no record</div>
      )}
      {data && (
        <div className="grid grid-cols-3 gap-4">
          {data.map((study) => (
            <div key={study.id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold text-lg">📘 {study.subjectId}</p>
              <p className="text-gray-600">Student ID: {study.studentId}</p>
              <p className="text-gray-600">Class: {study.classId}</p>
              <p className="text-gray-600">Score: {study.score}</p>

              <div className="mt-3">
                <h3 className="font-semibold mb-2">Grades</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Score</th>
                      <th className="border p-2">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.gradeList.map((grade) => (
                      <tr key={grade.id} className="text-center">
                        <td className="border p-2">
                          {grade.weight === 20
                            ? "Exam"
                            : grade.weight === 30
                            ? "Midterm"
                            : "Final"}
                        </td>
                        <td className="border p-2 font-semibold">
                          {grade.score}
                        </td>
                        <td className="border p-2">{grade.weight}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default LecturerGrades;
