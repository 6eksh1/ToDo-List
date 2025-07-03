const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/todo_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(' MongoDB connection error:', err));


app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});


app.put('/complete/:id', (req, res) => {
  const { id } = req.params;

  TodoModel.findById(id)
    .then(todo => {
      todo.completed = !todo.completed;
      return todo.save();
    })
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
  console.log(" Backend server starting...");

});
