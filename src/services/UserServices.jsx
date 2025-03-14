import axios from "./CustomizeAxios";
import { toast } from "react-toastify";

// Admin
export async function adminCreateAdmin(username, password, name) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "/users/create-admin",
      {
        username,
        password,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function adminCreateLecturer(username, password, name) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "/users/create-lecturers",
      {
        username,
        password,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
