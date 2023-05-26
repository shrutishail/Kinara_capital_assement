const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const students = [
    { roll: 1, name: 'John', totalMarks: 85 },
    { roll: 2, name: 'Emily', totalMarks: 90 },
    { roll: 3, name: 'David', totalMarks: 78 },
    { roll: 4, name: 'Sarah', totalMarks: 92 },
    { roll: 5, name: 'Michael', totalMarks: 88 },
    { roll: 6, name: 'Jessica', totalMarks: 75 },
    { roll: 7, name: 'Andrew', totalMarks: 87 },
    { roll: 8, name: 'Olivia', totalMarks: 94 },
    { roll: 9, name: 'Daniel', totalMarks: 82 },
    { roll: 10, name: 'Sophia', totalMarks: 96 },
    { roll: 11, name: 'William', totalMarks: 79 },
    { roll: 12, name: 'Isabella', totalMarks: 91 },
    { roll: 13, name: 'James', totalMarks: 84 },
    { roll: 14, name: 'Ava', totalMarks: 89 },
    { roll: 15, name: 'Benjamin', totalMarks: 83 },
    { roll: 16, name: 'Mia', totalMarks: 93 },
    { roll: 17, name: 'Jacob', totalMarks: 77 },
    { roll: 18, name: 'Charlotte', totalMarks: 97 },
    { roll: 19, name: 'Ethan', totalMarks: 80 }
 
];


app.get('/students', (req, res) => {
  const { name, roll, totalMarks, page, limit } = req.query;
  console.log(name, roll, totalMarks, "g",page, limit);

  // Apply filters
  let filteredStudents = students;
  if (name) {
    filteredStudents = filteredStudents.filter(student => student.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (roll) {
    filteredStudents = filteredStudents.filter(student => student.roll ==roll);
  }
  if (totalMarks) {
    filteredStudents = filteredStudents.filter(student => student.totalMarks == totalMarks);
  }


  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  res.json({
    students: paginatedStudents,
    totalStudents: filteredStudents.length
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
