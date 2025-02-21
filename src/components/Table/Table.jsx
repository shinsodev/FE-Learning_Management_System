import React from "react";

const Table = ({ data }) => {
  return (
    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 text-left">Name</th>
          <th className="py-2 px-4 text-left">Department</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{item.name}</td>
            <td className="py-2 px-4 border-b">{item.department}</td>
            <td className="py-2 px-4 border-b">{item.status}</td>
            <td className="py-2 px-4 border-b">{item.lastUpdated}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
