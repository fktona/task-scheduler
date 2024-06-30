import mongoose from 'mongoose';
import user from './user';
import email from './email';

mongoose.Promise = global.Promise;

 const db = {
  mongoose,
  user,
  email
};

export default db;