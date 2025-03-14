import { useState } from "react";
import { toast } from "react-toastify";
import {
  adminCreateAdmin,
  adminCreateLecturer,
} from "../../services/UserServices";

import Loading from "../../components/Loading/Loading";

const AdminCreateAdminLecturer = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "ADMIN",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (formData.role === "ADMIN") {
        response = await adminCreateAdmin(
          formData.username,
          formData.password,
          formData.name
        );
      } else {
        response = await adminCreateLecturer(
          formData.username,
          formData.password,
          formData.name
        );
      }

      if (response?.status === 200) {
        toast.success(response.data.message);
        setFormData({ username: "", password: "", name: "", role: "ADMIN" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Loading></Loading>
      </>
    );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Admin / Lecturer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="ADMIN">Admin</option>
            <option value="LECTURER">Lecturer</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateAdminLecturer;
