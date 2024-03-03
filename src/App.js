import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('sno');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3000/api/customers?page=${page}&sort=${sort}&search=${search}`);
      setData(result.data);
    };

    fetchData();
  }, [page, sort, search]);

  return (
    <div>
      <h1 className="title">Customer Data</h1>
      <div className="controls">
        <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="sno">Sno</option>
          <option value="created_date">Date</option>
          <option value="created_time">Time</option>
         
          
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(row => (
            <tr key={row.sno}>
              <td>{row.sno}</td>
              <td>{row.customername}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
              <td>{row.created_date}</td>
              <td>{row.created_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
