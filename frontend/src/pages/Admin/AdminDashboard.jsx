import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import AdminTable from "../../components/admin/AdminTable";

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAllContents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/users`);
        setAdmins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllContents();
  }, []);

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/users/${id}`,
        updatedData
      );
      const updatedAdmins = admins.map((admin) =>
        admin._id === id ? res.data : admin
      );
      setAdmins(updatedAdmins);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/users/${id}`);
      const updatedAdmins = admins.filter((admin) => admin._id !== id);
      setAdmins(updatedAdmins);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
        <AdminTable
          admins={admins}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
