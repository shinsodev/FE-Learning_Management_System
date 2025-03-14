import axios from "./CustomizeAxios";
import { toast } from "react-toastify";
export async function lecturerGetStudyByClassId(classId, page) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/study/result", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { classId, page },
    });
    console.log(res);
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
