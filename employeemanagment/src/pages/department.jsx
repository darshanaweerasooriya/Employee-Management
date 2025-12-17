import React, { useEffect, useState } from "react";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa"; // Edit/Delete icons
import 'bootstrap/dist/css/bootstrap.min.css';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    departmentId: null,
    departmentCode: "",
    departmentName: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrUpdateDepartment = async () => {
    try {
      if (isEditing) {
        await API.put("/departments", department);
        setIsEditing(false);
      } else {
        await API.post("/departments", department);
      }
      setDepartment({ departmentId: null, departmentCode: "", departmentName: "" });
      loadDepartments();
    } catch (err) {
      console.error(err);
    }
  };

  const editDepartment = (dept) => {
    setDepartment(dept);
    setIsEditing(true);
  };

  const deleteDepartment = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await API.delete(`/departments/${id}`);
        loadDepartments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm rounded p-4 mb-5">
        <h2 className="mb-4 text-center" style={{ color: "#2D88D4" }}>
          {isEditing ? "Edit Department" : "Add Department"}
        </h2>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Department Code"
              value={department.departmentCode}
              onChange={(e) => setDepartment({ ...department, departmentCode: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Department Name"
              value={department.departmentName}
              onChange={(e) => setDepartment({ ...department, departmentName: e.target.value })}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className={`btn ${isEditing ? "btn-warning" : "btn-primary"} px-5`}
            onClick={addOrUpdateDepartment}
          >
            {isEditing ? "Update Department" : "Add Department"}
          </button>
        </div>
      </div>

      <div className="card shadow-sm rounded p-4">
        <h2 className="mb-4 text-center" style={{ color: "#2D88D4" }}>Departments</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.departmentId}>
                  <td>{d.departmentId}</td>
                  <td>{d.departmentCode}</td>
                  <td>{d.departmentName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => editDepartment(d)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteDepartment(d.departmentId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No departments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Department;
