const fetch = require('node-fetch');
require('dotenv').config();

const TOKEN = process.env.ACCESS_TOKEN;
console.log(TOKEN);

const URL = (endpoint) => `https://4cd.instructure.com/api/v1/${endpoint}?access_token=${TOKEN}`;

const canv = (endpoint) => fetch(URL(endpoint)).then(res => res.json());

var potentialTasks = {};
console.log('fetching courses')
fetch(URL('courses')).then(res => res.json()).then((courses) => {
  var count = 0;
  courses.forEach(course => {
    potentialTasks[course.id] = [];
    console.log('fetching assignments for course ' + course.id);
    canv(`courses/${course.id}/assignments`).then((assignments) => {
      pushAll(potentialTasks[course.id], assignments);
      canv(`courses/${course.id}/modules`).then((modules) => {
        var mcount = 0;
        modules.forEach(module => {
          canv(`courses/${course.id}/modules/${module.id}/items`).then(items => {
            mcount++;
            pushAll(potentialTasks[course.id], items);
            if (mcount === modules.length) {
              count++;
              console.log(`fetched course ${course.id}`);
            }
            if (count === courses.length) done();
          });
        });
      });
    });
  });
});

function pushAll(arr, items) {
  arr.push.apply(arr, items);
}

function done() {
  console.log(potentialTasks['57557'].length);
}