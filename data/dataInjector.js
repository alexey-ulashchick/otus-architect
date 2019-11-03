const LineByLineReader = require('line-by-line');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const pad = require('string-padding');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '4406',
  user: 'root',
  password: 'dockerinternal',
  database: 'otus_dev'
});

connection.connect();

const interests = [
  'Travelling',
  'Running',
  'Reading',
  'Programming',
  'Hiking',
];

let line = 0;
const TOTAL = 1000000;
const password = bcrypt.hashSync('test', bcrypt.genSaltSync(10));
let buffer = [];

const insertData = () => {
  return new Promise((resolve, reject) => {
    const insertUser = `insert into users (email, password) values ${buffer.map(item => `('${item.email}', '${password}')`).join(',')};`;
    const insertPage = `insert into pages (email, firstName, lastName, city, gender, age)
        values
      ${buffer.map(item => `("${item.email}", "${item.firstName}", "${item.lastName}", "${item.city}", "${item.gender}", "${item.age}")`).join(',')};`;

    const insertInterests = `insert into users_areasOfInterest (email, areaOfInterest) values
      ${buffer.map(item => item.userInterests.map(ui => `("${item.email}", "${ui}")`).join(',')).map(line => line.trim()).filter(line => line).join(',')};`;

    connection.query(insertUser, error => {
      if (error) return reject(error);

      connection.query(insertPage, error => {
        if (error) return reject(error);

        connection.query(insertInterests, error => {
          if (error) return reject(error);

          return resolve();
        });
      });
    });
  });
};
console.log('Cleaning up database.');

connection.query('DELETE FROM users;', (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Previous users deleted');
  const lr = new LineByLineReader('data.csv');

  lr.on('line', data => {
    if (data === '') return;

    const [lastName, firstName, city] = data.split(',');
    const id = pad(line+'', 6, '0');
    const email = `user.${id}@test.com`;
    const age = 18 + Math.round(Math.random() * (75 - 18));
    const gender = Math.round(Math.random()) === 0 ? 'MALE' : 'FEMALE';

    const interestsCount = Math.round(Math.random()*interests.length);
    const userInterests = [...interests];
    for (let i = 0; i < interestsCount; i++) {
      userInterests.splice(Math.floor(Math.random()*userInterests.length));
    }

    buffer.push({ email, firstName, lastName, city, age, gender, userInterests });
    line++;

    if (buffer.length === 1000) {
      lr.pause();

      insertData().then(() => {
        console.log(`Inserted ${line} from ${TOTAL}`);
        buffer = [];
        lr.resume();
      }).catch(err =>  {
        console.error(err);
        process.exit(1);
      });
    }
  });

  lr.on('end', () => {
    insertData().then(() => {
      console.log(`Total lines: ${line}`);
      process.exit(0);
    });
  });

});
