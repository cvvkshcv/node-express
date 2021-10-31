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
  author: [ authorSchema ]
}));

async function createDocument() {
  const course = new Course({
    name: 'Docker Kubernetes course',
    author: [
      new Author({ name: 'Vikash' }),
      new Author({ name: 'John' })
    ]
  });
  await course.save();
}
// createDocument();

async function updateDoc() {
  const course = await Course.findById('617e50cb0ce8d6bbc2f42143');
  // if (course) {
  //   course.author.push(new Author({ name: 'Doe' }))
  //   course.save()
  //   console.log('Added new author');
  // }
  const authorToDelete = course.author.id('617e512b85e740a0efc78d91');
  if (authorToDelete) {
    authorToDelete.remove();
    course.save();
    console.log('Removed new author');
  }
}

updateDoc();