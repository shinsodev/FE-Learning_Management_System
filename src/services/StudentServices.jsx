import axios from "./CustomizeAxios";
import { toast } from "react-toastify";

export async function studentGetGPASemester(semester) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/students/gpa/${semester}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function studentGetStudiesBySemester(semester, page) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/study/result/${semester}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page },
    });
    console.log(res);
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
