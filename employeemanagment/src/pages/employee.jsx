import React, { useEffect, useState } from "react";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa"; // Edit/Delete icons
import 'bootstrap/dist/css/bootstrap.min.css';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({
    employeeId: null,
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    age: "",
    salary: "",
    departmentId: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load employees
  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load departments for dropdown
  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Add or update employee
  const addEmployee = async () => {
    try {
      const empData = { ...employee, age: calculateAge(employee.dateOfBirth) };
      if (isEditing) {
        await API.put("/employees", empData);
        setIsEditing(false);
      } else {
        await API.post("/employees", empData);
      }
      setEmployee({
        employeeId: null,
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        age: "",
        salary: "",
        departmentId: ""
      });
      loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit employee
  const editEmployee = (emp) => {
    setEmployee(emp);
    setIsEditing(true);
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await API.delete(`/employees/${id}`);
        loadEmployees();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm rounded p-4 mb-5">
        <h2 className="mb-4 text-center" style={{ color: "#2D88D4" }}>
          {isEditing ? "Edit Employee" : "Add Employee"}
        </h2>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={employee.firstName}
              onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={employee.lastName}
              onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={employee.email}
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={employee.dateOfBirth}
              onChange={(e) => setEmployee({ 
                ...employee, 
                dateOfBirth: e.target.value, 
                age: calculateAge(e.target.value)
              })}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={employee.age}
              readOnly
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Salary"
              value={employee.salary}
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              value={employee.departmentId}
              onChange={(e) => setEmployee({ ...employee, departmentId: e.target.value })}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.departmentId} value={d.departmentId}>
                  {d.departmentName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className={`btn ${isEditing ? "btn-warning" : "btn-success"} px-5`} onClick={addEmployee}>
            {isEditing ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </div>

      <div className="card shadow-sm rounded p-4">
        <h2 className="mb-4 text-center" style={{ color: "#2D88D4" }}>Employees</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.employeeId}>
                  <td>{e.employeeId}</td>
                  <td>{e.firstName} {e.lastName}</td>
                  <td>{e.email}</td>
                  <td>{new Date(e.dateOfBirth).toLocaleDateString()}</td>
                  <td>{e.age}</td>
                  <td>${e.salary}</td>
                  <td>{departments.find(d => d.departmentId === parseInt(e.departmentId))?.departmentName || ""}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => editEmployee(e)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(e.employeeId)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;
