// import faker from 'faker';
import { faker } from '@faker-js/faker';
import Joi from 'joi';
import { helpers } from '../../app/utils';

const {
  stringCheck,
  passwordCheck,
  emailCheck,
  numberCheck,
  phoneNumberCheck,
  enumCheck,
  dateCheck
} = helpers.ValidationHelper;
export const originText = 'hir35676';
export const wrongText = '894jdkf';
export const payload = 'payload';
export const total = 8;
export const limit = 2;
export const genericErrorObj = {
  status: 500,
  name: 'ApiError',
  message: 'Oops, something broke on the server!!!'
};
export const genericNotFound = {
  status: 404,
  message: 'Oops, You have reached a dead end'
};
export const genericUnAuthorized = {
  status: 403,
  message: 'Permission denied. Invalid credentials provided'
};
export const genericInValidLogin = {
  status: 401,
  message: 'Incorrect login details'
};
export const genericAuthRequired = {
  status: 401,
  message: 'Access denied, a valid access token is required'
};

export const testSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck(),
  name: stringCheck('name'),
  number: numberCheck('number'),
  phoneNumber: phoneNumberCheck(),
  valid: enumCheck([false, true], 'valid'),
  date: dateCheck('Date')
});

export const testObj = {
  email: faker.internet.email(),
  password: faker.internet.email(),
  name: faker.internet.userName(),
  number: faker.datatype.number(),
  phoneNumber: '1290989978',
  valid: faker.datatype.boolean(),
  date: faker.date.future()
};

export const createUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  emailAddress: faker.internet.email(),
  phoneNumber: '1290989978',
  password: 'Ghana@100'
};
export const errorcreateUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  emailAddress: 'george.com',
  phoneNumber: '12909899',
  password: 'Ghana@100'
};

export const createAdmin = {
  fullName: faker.name.fullName(),
  email: faker.internet.email(),
  phoneNumber: '0123456789',
  country: faker.address.country(),
  address: faker.address.city(),
  password: faker.random.alphaNumeric(8)
};

export const signInUser = {
  emailAddress: createUser.emailAddress,
  password: createUser.password
};
export const signInAdmin = {
  email: createAdmin.email,
  password: createAdmin.password
};

export const assessmentObj = [
  {
    question: faker.random.words(8),
    options: {
      a: faker.random.word(),
      b: faker.random.word(),
      c: faker.random.word(),
      d: faker.random.word()
    },
    correctAnswer: faker.random.alpha(),
    selectedAnswer: null
  }
];

export const batchObj = {
  file: faker.system.commonFileName(),
  link: faker.internet.url(),
  closureDate: faker.date.future(),
  batchId: faker.random.numeric(),
  instructions: faker.random.words(20)
};

export const userApplication = {
  firstName: createUser.firstName,
  lastName: createUser.lastName,
  emailAddress: createUser.emailAddress,
  dateOfBirth: '01/01/1997',
  address: faker.address.city(),
  university: faker.company.bs(),
  course: faker.random.word(),
  cgpa: faker.random.numeric(1),
  cv: faker.system.commonFileName(),
  img: faker.system.commonFileName()
};

export const updateObj = {
  score: faker.random.numeric(2)
};
export const testError = {
  error: {
    message: faker.lorem.sentence()
  },
  status: faker.lorem.word()
};
