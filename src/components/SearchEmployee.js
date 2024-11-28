import React, { useState } from 'react';
import API from '../api/api';

const SearchEmployee = () => {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await API.get(`/employees/search?email=${email}`);
      setResults(data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to search employee');
    }
  };

  return (
    <div>
      <h2>Search Employee</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((emp) => (
          <li key={emp._id}>
            {emp.firstName} {emp.lastName} - {emp.email} - ${emp.salary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchEmployee;
