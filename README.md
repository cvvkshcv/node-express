## This repo has multiple projects
[ ] What is node
[ ] How to install node
[ ] First node program


[ ] Global object
[ ] Modules
[ ] Exporting & import module & Module wrapper function (1st line error will show)
[ ] Path module
[ ] OS
[ ] File system (fs)
[ ] Events
[ ] HTTP

[ ] NPM
[ ] package.json
[ ] ^ Minor, ~ patch, Exact version
[ ] Dev dependencies
[ ] Global install
[ ] `npm list --depth=0`
[ ] `npm view <package_name>`
[ ] `npm view <package_name> <dependencies | versions>`
[ ] `npm i @exact` version 
[ ] `npm uninstall package`
[ ] Create your npm package
  - Create a file (index.js) and add some function and export it
  - npm login
  - add username & pwd & email
  - `npm publish` (package name should be unique else you will get error)
  - To update the package need to update the version number in package.json (manually or from command using the following command)
  - `npm version minor` or `npm verion patch`


[ ] What is REST (Representational state transfer)
  - Client server communicates using http
  - CRUD operations
[ ] Express & install express
[ ] Create basic api/web server
[ ] Nodemon
[ ] Environment variable. Port can be dynamic in the server so we need enviornment variable (process.env.PORT || 3000)
  - $ export PORT=3000 (windows)
  - $ set PORT=3000 (non windows)
[ ] Router params (url/customer/:id - req.params.id)
[ ] Query string - req.query
[ ] Postman
[ ] POST - req.body
[ ] Header already sent error

[ ] Middleware function
[ ] Built in middlewares in express
  - app.use(express.json()); - parse json body and add it to req.body
  - app.use(express.urlencoded({ extended: true })); - to parse form-encoded data
  - app.use(express.static('public')); - to serve static file from particular folder.
    - Add file to public/file.txt
    - To access file from browser http://localhost/file.txt
[ ] third-party middleware ex: Helmet, Morgan
[ ] Environment - app.get('env') => 'development' of NODE_ENV is not set
[ ] To store config we can use - npm i config
  - config will help to create multiple env from multiple file (config/development.json, config/production.json, config/default.json)
  - config.get('name.env') // based on the NODE_ENV the config file will be picked
  - Don't use password in this config

[ ] `npm i debug` - const startLog = require('debug')('app:startup')
  - startLog('Db connected')
  - startLog('GET method')
[ ]  Express.Router to split the routes
[ ]  Use Joi to validate

Mongoose:
[ ] Schema types
  - String
  - Number
  - Date
  - Buffer
  - Boolean
  - Array
  - ObjectID

[ ] mongoose.connect('url').then().catch();
[ ] Creating a schema, `const Course = mongoose.model('Course', courseScheme);`
[ ] Create document
[ ] Find a document
```
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
    .count(); // Get count of result
```
[ ] Update document
[ ] Delete document
[ ] Relational document (ref to another collection)
[ ] Embedded document (Directly storing other doc in current collection)
[ ] Array of Subdocuments

[ ] Transactions (two step commit) (`npm i fawn`) 
[ ] `npm i joi-objectid` - to add vaildation to Joi for objectId
[ ] `npm i joi-password-complexity` - for password validation
[ ] `npm i bcrypt` - For password hash

[ ] Authentication - process is identifying the user claim who they are (by giving Username & password)
[ ] Authorization - determining the user has right permission to perform operation
[ ] `npm i jsonwebtoken`

[ ] create middleware for encode and verify
[ ] Logout - should be in client side

[ ] For deployment we need to preapre our application
  - `npm i helmet` (to avoid web vulnerabilities)
  - `npm i compression` (compress http response)
[ ] deploy in heroku (Download heroku cli and install)
  - Login to heroku using `heroku login`
  - once we deploy heroku will start app by `npm start` command
  - So we need to add `npm start` in package.json
  - Add "engine" property in package.json and give verions by checking `npm -v`
  - Need to add file to github before deploying