import axios from "./CustomizeAxios";
import { toast } from "react-toastify";

export async function getStudentCourses(page) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/classes/all-student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page },
    });

    return res;
  } catch (error) {
    toast.error(error);
  }
}
