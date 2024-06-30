import express from 'express';
import mongoose from 'mongoose';
import auth from './routes/AUTH'; 
import cors from 'cors'; 
import db from './models';
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 1000;

app.use('/api/auth' , auth);
db.mongoose
  .connect('mongodb+srv://adetonafk:FaithTask@taskscheduler.wryp8pz.mongodb.net/?retryWrites=true&w=majority&appName=TaskScheduler')
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    const server = app.listen(PORT , () => {
        console.log(`Server running on port ${PORT}`);
    });
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  export default app; 


