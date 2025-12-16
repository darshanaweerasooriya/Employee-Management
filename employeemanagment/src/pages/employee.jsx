import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    return(
       <div className="container mt-4">

            {/* Add Teacher Button */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-primary btn-sm"
                    style={{
                        backgroundColor: "#2D88D4",
                        borderColor: "#2D88D4",
                        color: "white",
                        width: "120px"
                    }}
                >
                    Add Teachers
                </button>
            </div>

            {/* Search Box */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Search"
                    className="form-control w-75"
                />
            </div>

            {/* Teachers Table */}
            <div className="teachersList mt-4">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Class</th>
                            <th>Email</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>johnd</td>
                            <td>Grade 10</td>
                            <td>john@example.com</td>
                            <td>Male</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane Smith</td>
                            <td>janes</td>
                            <td>Grade 11</td>
                            <td>jane@example.com</td>
                            <td>Female</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AddEmployee;