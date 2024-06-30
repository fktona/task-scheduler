import express from 'express';  
import db from './models';
import route from './route/route';
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.use('/api/send' ,route );
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



