import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered employees
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await API.get('/employees');
        setEmployees(data);
        setFilteredEmployees(data); // Initializing filtered list
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((emp) =>
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );

    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id)); // Update employee list
      setFilteredEmployees(filteredEmployees.filter((emp) => emp._id !== id)); // Update filtered list
      alert('Employee deleted successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`); // Navigating to the update page
  };

  const handleAddEmployee = () => {
    navigate('/add-employee'); // Navigating to the add employee page
  };

  return (
    <div className="container mt-5">
      {/* Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Employee List</h2>
        <button className="btn btn-success" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by first name, last name, or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Employee Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>${emp.salary}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleUpdate(emp._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
