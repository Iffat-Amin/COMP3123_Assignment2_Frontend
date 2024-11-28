import React, { useState } from 'react';
import API from '../api/api';

const AddEmployee = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', salary: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employees', form);
      alert('Employee added successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Add Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Salary</label>
                  <input
                    name="salary"
                    className="form-control"
                    placeholder="Salary"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
