import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [totalMarks, setTotalmarks] = useState('');
  const [page, setPage] = useState(1);
  const[pagearr,setPagearr]=useState([])
  console.log(pagearr);
  const [limit] = useState(5);
  const [totalStudents, setTotalStudents] = useState(0);
  console.log(totalStudents);

  useEffect(() => {
    fetchStudents();
  }, [name, roll, totalMarks, page]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students', {
        params: {
          name,
          roll,
          totalMarks,
          page,
          limit,
        },
      });
      setStudents(response.data.students);
      setTotalStudents(response.data.totalStudents);
      let pageid = [];
      for (let i = 1; i <= Math.round((response.data.totalStudents + 1) / limit); i++) {
        pageid.push(i);
      }
      setPagearr(pageid)
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); 
  };

  return (
    <div className="container">
      <h1>Student Details</h1>
      <form className="filters" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Roll" value={roll} onChange={(e) => setRoll(e.target.value)} />
        <input type="number" placeholder="Total Marks" value={totalMarks} onChange={(e) => setTotalmarks(e.target.value)} />
        <button type="submit">Filter</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.roll}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination" style={{ display: "flex", marginLeft: "280px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>&#60;</button>
       {pagearr.map((e,i)=>{
        return(
          <div
          className="roundgrey"
          href="#"
          key={i}
          style={{ marginLeft: "20px",backgroundColor:`${e==page?"lightgreen":""}` }}
          onClick={() => setPage(e)}

        >
          {e}
        </div>
      
        )
       })}
        <button style={{ marginLeft: "20px" }} disabled={(page * limit) >= totalStudents} onClick={() => setPage(page + 1)}>&#62;</button>
      </div>
      
    </div>
  );
};

export default App;
