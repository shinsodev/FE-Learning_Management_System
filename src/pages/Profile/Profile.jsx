import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center text-gray-600">Loading user info...</p>;
  }

  const { studentDTO, userDTO } = user;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">
        📌{" "}
        {userDTO.role === "STUDENT"
          ? "Student"
          : userDTO.role === "LECTURER"
          ? "Lecturer"
          : "Admin"}{" "}
        Profile
      </h2>

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userDTO.name}`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <h3 className="text-xl font-semibold mt-3">{userDTO.name}</h3>
        <p className="text-gray-500">{userDTO.username}</p>
      </div>

      {/* Thông tin cá nhân */}
      <div className="mt-6 space-y-4">
        {userDTO.role === "STUDENT" && studentDTO && (
          <>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">📌 Student ID:</span>
              <span>{studentDTO.studentId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">🎓 Major:</span>
              <span>{studentDTO.major}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">📚 Enrolled Course:</span>
              <span>{studentDTO.enrolledCourse}</span>
            </div>
          </>
        )}

        {userDTO.role === "LECTURER" && (
          <>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">🏫 Faculty:</span>
              <span>{userDTO.faculty}</span>
            </div>
            {/* <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">📘 Courses Teaching:</span>
              <span>{userDTO.coursesTeaching || "N/A"}</span>
            </div> */}
          </>
        )}

        {userDTO.role === "ADMIN" && (
          <>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">🏢 Department:</span>
              <span>{userDTO.department || "Administration"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">🔗 System Access Level:</span>
              <span className="text-red-600 font-medium">Full Access</span>
            </div>
          </>
        )}

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">🔑 Role:</span>
          <span className="text-blue-600 font-medium">{userDTO.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
