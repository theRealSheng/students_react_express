const mongoose = require('mongoose');
const Students = require('../models/student');

const dbName = 'students';
mongoose.connect(`mongodb://localhost/${dbName}`);

const studentList = [{
    email: 'juan@gmail.com',
    firstName: 'Juan',
    lastName: 'Sanz',
    hobbies: ['chess', 'reading', 'walking'],
    age: 19,
    photo: 'https://wpp.azureedge.net/sites/default/files/styles/gallery_main_image/public/archive/2018/stories/SPS/14391/d9opfxscni5stpvnmxro.jpg?itok=TK_w33Ny',
    major: 'economics'
  },
  {
    email: 'maria@yahoo.com',
    firstName: 'Maria',
    lastName: 'Hill',
    hobbies: ['buying', 'eating', 'taking pictures'],
    age: 21,
    photo: 'https://akns-images.eonline.com/eol_images/Entire_Site/201763/rs_1024x759-170703041343-1024.maria-menounos-3.63017.jpg?fit=inside|900:auto&output-quality=90',
    major: 'mathematics'
  },
  {
    email: 'GeorgeMaster@gmail.com',
    firstName: 'George',
    lastName: 'Means',
    hobbies: ['cooking', 'cars', 'drinking beer'],
    age: 25,
    photo: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/BFB3/production/_102457094_pa-clooney.jpg',
    major: 'industrial engineering'
  }
];

Students.create(studentList, (err) => {
  if (err) { throw (err); }
  console.log(`Created ${studentList.length} students`);
});