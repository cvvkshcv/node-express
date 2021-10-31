const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connect to MongoDB...'))
  .catch((e) => console.log(e));
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createDocument() {
  const course = new Course({
    name: 'Docker Kubernetes course',
    author: new Author({
      name: 'Vikash',
      bio: 'Online teacher and freelancer and rich',
      website: 'uigems.com'
    })
  });
  await course.save();
}
// createDocument();

async function updateDoc() {
  const course = await Course.findById('617e4db2d72499c97627ebe8');
  if (course) {
    course.set({
      name: 'Nodejs course',
      'author.name': 'Vikash CV'
    });
    console.log(course);
    course.save()
  }
}

updateDoc();