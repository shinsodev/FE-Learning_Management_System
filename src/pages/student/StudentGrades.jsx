import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import ReactPaginate from "react-paginate";
import { CiSearch } from "react-icons/ci";
import {
  studentGetGPASemester,
  studentGetStudiesBySemester,
} from "../../services/StudentServices";

const StudentGrades = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gpa, setGpa] = useState(null);
  const [semester, setSemester] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageClick = (event) => {
    setPage(event.selected);
    fetchGrades(semester, page);
  };

  const fetchGPA = async () => {
    setIsLoading(true);
    try {
      const res = await studentGetGPASemester(parseInt(semester));
      if (res.status === 200) {
        setGpa(res.data.gpa);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGrades = async () => {
    setIsLoading(true);
    try {
      // const response = {
      //   statusCode: 200,
      //   message: "Study record for semester found successfully",
      //   listStudyDTO: [
      //     {
      //       id: 46,
      //       studentId: 2213110,
      //       subjectId: "CO3001",
      //       classId: 5,
      //       score: 6.3,
      //       gradeList: [
      //         { id: 16, score: 5.0, weight: 20.0, studyId: 46 },
      //         { id: 17, score: 6.0, weight: 30.0, studyId: 46 },
      //         { id: 18, score: 7.0, weight: 50.0, studyId: 46 },
      //       ],
      //     },
      //   ],
      //   totalCredits: 3,
      //   totalPages: 1,
      //   totalElements: 1,
      //   currentPage: 0,
      // };

      const res = await studentGetStudiesBySemester(parseInt(semester), page);

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

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 w-full mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">📚 Student Grades</h2>
      <div className="w-1/4 flex items-center justify-center space-x-2 mb-4">
        <input
          type="number"
          className="border p-2 rounded-md"
          placeholder="Enter semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            fetchGrades();
            fetchGPA();
          }}
        >
          <CiSearch size={20} />
        </button>
      </div>

      {gpa !== null && (
        <p className="mb-4 text-lg font-semibold text-red-600">
          GPA of this semester: {gpa}
        </p>
      )}

      {data && (
        <div className="grid grid-cols-4 gap-4">
          {data.map((study) => (
            <div key={study.id} className="border p-4 rounded-lg shadow-md">
              <p className="font-semibold text-lg">📘 {study.subjectId}</p>
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

export default StudentGrades;
