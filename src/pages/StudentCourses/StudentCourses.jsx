import { useState, useEffect } from "react";

// API
import { getStudentCourses } from "../../services/ClassServices";

// Components
import Loading from "../../components/Loading/Loading";

const StudentCourses = () => {
  const [listClass, setListClass] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      setIsLoading(true);
      try {
        const res = await getStudentCourses(page);
        console.log(res);
        if (res.status === 200) {
          setListClass(res.data.listClassDTO);
        }

        console.log(res.data.listClassDTO);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentCourses();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mt-8 font-sans">
        <h2 className="font-bold text-xl text-gray-800">User Data</h2>
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Subject ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Semester</th>
            </tr>
          </thead>
          <tbody>
            {listClass.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{item.subjectId}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">242 - test</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentCourses;
