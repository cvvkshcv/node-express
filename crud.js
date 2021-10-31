const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connect to MongoDB...'))
  .catch((e) => console.log(e));

const courseScheme = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  author: String,
  tags: {
    type: [ String ],
    enum: ['node', 'db', 'web', 'js'],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'Course should have atlease one tag'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseScheme);
// Create/save
async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    author: 'Vikash',
    tags: ['Angular', 'db', 'js'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}
// createCourse();

// Get all data
async function getAllData() {
  const courses = await Course.find();
  console.log(courses);
};
// getAllData();


// Get data based on field(s)
async function getData(name, isPublished = true) {
  // Comparision query operators:
  // eq, ne, gt, gte, lt, lte, in, nin
  // These comparision query operators are useful when we don't have exact match in find
  // Ex: .find({ price: { $gte: 10, $lte: 20 } })

  // Logical query operators (or, and):
  // .find().or([ {name: 'vikash'}, {tags: { $in: ['node'] }}, {..} ]) - array of conditions
  // .find().and([ {..}, {..} ]) - array of conditions

  // Regular expressions:
  // find({ author: /^Vi$/ }) // starts with Vi
  // find({ author: /Sh$/i }) // ends with with sh case insensitive
  // find({ author: /.*vikash.*/i }) // constains vikash in it

  // Pagination
  // .skip(pageNumber - 1 * pageSize).limit(pageSize) - pageNumber - 2 & pageSize - 20

  const courses = await Course
          .find({ name, isPublished }) // This returns DocumentQuery object so we can chain few methods
          // .find({ tags: { $in: ['node'] }})
          .limit(10) // limit number of record
          .sort({ name : 1 }) // sort name by asc order 1, desc order -1
          .select({ name: 1, tags: 1 }) // select only few fields
          .count() // Get count of result
        ;
  console.log(courses);
};
// getData('Angular course');

// Update data
async function updateCourse(id) {
  // Query first approach
  /*
  const course = await Course.findById(id);
  if (course) {
    course.isPublished = true;
    course.author = 'Another author';
    // else another approach for multiple key update use .set
    course.set({
      isPublished: true,
      author: 'Another author'
    });
    course.save()
  }
  */

  // Update first approach
  // updateOne will only return status
  // findOneAndUpdate will update and return old document
  // findOneAndUpdate({condition}, {update filed}, {new: true}) will update and return new document

  // const course1 = await Course.updateOne({ _id: id }, {
  const course1 = await Course.findOneAndUpdate({ _id: id }, {
    $set: {
      author: 'Vikash'
    }
  }, { new: true });
  console.log(course1);
}

// updateCourse('617c6c27f26bdf8a9069007f');

// Delete document
async function removeCourse(id) {
  // .deleteOne({ conditions }) - delete first doc with condition - won't return deleted doc, just status will return
  // .deleteMany({ conditions }) - delete many docs with condition - won't return deleted doc, just status will return
  // .findByIdAndRemove(id) - delete and returns doc
  await Course.findByIdAndRemove(id);
}