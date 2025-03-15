import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import {
  adminGetListLecturers,
  adminGetListStudents,
} from "../../services/UserServices";

const AdminListUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("lecturers");

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res =
        userType === "lecturers"
          ? await adminGetListLecturers()
          : await adminGetListStudents();
      console.log(res);
      if (res.status === 200) {
        setData(res.data.lecturers || []);
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
      <h2 className="text-2xl font-bold text-center mb-4">🎓 User List</h2>
      <div className="w-full flex items-center justify-between mb-4">
        <select
          className="border p-2 rounded-md"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="lecturers">Lecturers</option>
          <option value="students">Students</option>
        </select>
      </div>
      {data.length === 0 ? (
        <div className="text-gray-600">No records found</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Faculty</th>
              {userType === "students" && <th className="border p-2">Major</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id} className="border">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.faculty}</td>
                {userType === "students" && (
                  <td className="border p-2">{user.studentDTO?.major}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminListUsers;
