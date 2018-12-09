import UserModel from '../model/user';


const prompts = require('prompts');


let questions = [
  {
    type: 'text',
    name: 'email',
    message: 'Input email address',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Input password',
  },
  {
    type: 'text',
    name: 'roles',
    message: 'Input roles, separate by comma',
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Can you confirm?',
    initial: true,
  }
];

const cli = async () => {
  return await prompts(questions);
};

cli().then(function (response) {
  const db = require('./db');
  db.connect(async () => {
    try {
      await UserModel.register(
        {
          email: response.email,
          active: true,
          roles: response.roles.trim().split(',')
        },
        response.password,
      );
    } catch (e) {
      throw e;
    } finally {
      db.disconnect();
    }
  });

}).catch(function (err) {
  throw err;
});