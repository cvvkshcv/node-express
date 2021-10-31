const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connect to MongoDB...'))
  .catch((e) => console.log(e));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name, bio, website
  }); 
  const result = await author.save();
  console.log(result);
}
// createAuthor('Vikash', 'I am a billanior', 'http://uigems.com')

async function createCourse(courseName, authorId) {
  const course = new Course({
    name: courseName,
    author: authorId
  });
  await course.save();
}

// createCourse('Digital web dev expert', '617d05eb7ed448327a8300e1')

async function getCourse(courseId) {
  const course = await Course
    .find({ _id: courseId })
    .populate('author', 'name bio -_id');
  console.log(course);
}

getCourse('617e412f3730eb2400e27d9a');