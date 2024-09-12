const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static'))); // Serve static files


let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});


app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, done: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedText = req.body.text;
  const todo = todos.find(t => t.id === todoId);
  
  if (todo) {
    todo.text = updatedText;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== todoId);
  res.json({ message: 'Todo deleted' });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
