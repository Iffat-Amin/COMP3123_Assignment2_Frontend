import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await API.get(`/employees/${id}`);
        setForm(data);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/employees/${id}`, form);
      alert('Employee updated successfully');
      navigate('/employees'); // Redirecting back to the employee list
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update employee');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-white text-center">
              <h4>Update Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100">Update Employee</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
