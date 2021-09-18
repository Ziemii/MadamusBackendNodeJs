require('dotenv/config');
//Import Modules
// const inquirer = require('inquirer');
// //Password hashing
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const server = require('./server');


//Db Models
// const Admin = require('./models/Admin');

// let admin = new Admin({
//   login: '',
//   passwordHash: '',
// })

// let credentials = [
//   {
//     type: 'input',
//     name: 'login',
//     message: "Provide admin login"
//   },
//   {
//     type: 'input',
//     name: 'password',
//     message: "Provide admin password"
//   }
// ]



// inquirer.prompt(credentials).then(answers => {
//   admin.login = answers['login'];
//   let password = answers['password'];
  
//   console.log(`Your admin credentials are:\nLogin: ${admin.login}\nPassword: ${password}`);
  
//     bcrypt.hash(password, saltRounds,async function(err, hash) {
//               admin.passwordHash = hash;
//               try {
//                     const savedAdmin = await admin.save()
//                     if(savedAdmin){
//                       console.log('Admin saved!');
//                     }
//                   } catch (err) {
//                     console.log({ errorMsg: err });
//                   }
//      });
  
  
 
// })




