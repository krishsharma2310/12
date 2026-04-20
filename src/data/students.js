const studentsData = [
  {
    id: 1,
    name: "Chaitanya Purohit",
    email: "krishsharma23oct@gmail.com",
    password: "1234",
    subjects: [
      { name: "Mathematics", code: "MATH101", instructor: "Dr. Anshu", credits: 4 },
      { name: "DSA", code: "DSA301", instructor: "Prof. Nandan", credits: 3 },
      { name: "Python", code: "PYT201", instructor: "Ms. Manju", credits: 3 },
      { name: "Web Development", code: "WEBD401", instructor: "Prof. Gyan", credits: 4 }
    ],
    attendance: {
      "Mathematics": 85,
      "DSA": 90,
      "Python": 40,
      "Web Development": 70
    },
    marks: {
      "Mathematics": 34,
      "DSA": 83,
      "Python": 82,
      "Web Development": 80
    }
  },
  {
    id: 2,
    name: "Krish Sharma",
    email: "test@gmail.com",
    password: "abcd",
    subjects: [
      { name: "Mathematics", code: "MATH101", instructor: "Prof. Eve Brown", credits: 4 },
      { name: "DSA", code: "DSA301", instructor: "Dr. Frank Miller", credits: 3 },
      { name: "Python", code: "PYT201", instructor: "Mr. Shakib", credits: 3 },
      { name: "Web Development", code: "WEBD401", instructor: "Ms. Helen Garcia", credits: 4 }
    ],
    attendance: {
      "Mathematics": 78,
      "DSA": 82,
      "Python": 80,
      "Web Development": 70
    },
    marks: {
      "Mathematics": 75,
      "DSA": 78,
      "Python": 77,
      "Web Development": 85
    }
  }
];

export default studentsData;