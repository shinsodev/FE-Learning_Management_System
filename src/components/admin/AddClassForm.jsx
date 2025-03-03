import { useState } from "react";

const AddClassForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    subjectId: "",
    semester: "",
    startTime: "",
    endTime: "",
    daysOfWeek: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      daysOfWeek: checked
        ? [...prev.daysOfWeek, value]
        : prev.daysOfWeek.filter((day) => day !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // setFormData({
    //   name: "",
    //   subjectId: "",
    //   semester: "",
    //   startTime: "",
    //   endTime: "",
    //   daysOfWeek: [],
    // });
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Nút Đóng Modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Add New Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Class Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Subject ID */}
          <div>
            <label className="block text-gray-700">Subject ID</label>
            <input
              type="text"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-gray-700">Semester</label>
            <input
              type="number"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-gray-700">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Days of the Week */}
          <div>
            <label className="block text-gray-700">Days of the Week</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].map(
                (day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={day}
                      checked={formData.daysOfWeek.includes(day)}
                      onChange={handleDaysChange}
                      className="rounded border-gray-300 focus:ring focus:ring-blue-300"
                    />
                    <span>{day}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;
