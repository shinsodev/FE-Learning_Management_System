import axios from "./CustomizeAxios";
import { toast } from "react-toastify";

// ADMIN
export async function adminGetAllClasses(page) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/classes/all-admin", {
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

export async function adminAddClass(
  name,
  subjectId,
  semester,
  startTime,
  endTime,
  daysOfWeek
) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "/classes/add",
      {
        name,
        subjectId,
        semester,
        startTime,
        endTime,
        daysOfWeek,
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

export async function adminDeleteClass(id) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`/classes/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

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
    toast.error(error?.response?.data?.message);
  }
}
