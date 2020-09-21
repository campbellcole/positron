// TOKEN:
// 7774~sTvVFoEkjCPobx7S5Na4hElw9BS5fzOxHj4v16HZ50wi1dTlI4697BXn5OT5zAGI

const fetch = require('node-fetch');

const TOKEN = '7774~sTvVFoEkjCPobx7S5Na4hElw9BS5fzOxHj4v16HZ50wi1dTlI4697BXn5OT5zAGI';

const URL = (endpoint) => `https://4cd.instructure.com/api/v1/${endpoint}?access_token=${TOKEN}`;

fetch(URL('courses')).then(res => res.json()).then((data) => {
  data.forEach(course => {
    console.log(course.calendar.ics)
  });
})