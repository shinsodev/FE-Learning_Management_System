import axios from "./CustomizeAxios";
import { toast } from "react-toastify";
export async function lecturerGetStudyByClassId(classId, page) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/study", {
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

export async function lecturerAddGradesByExcel(formData) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/grades/add_excel", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
