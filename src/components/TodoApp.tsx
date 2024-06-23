import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/todoStore';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const TodoApp: React.FC = observer(() => {
    const [task, setTask] = useState('');
    const [editId, setEditId] = useState(0);
    const [editText, setEditText] = useState('');

    const handleAddTodo = () => {
        if (task) {
            todoStore.addTodo(task);
            setTask('')
        }
    };

    const handleUpdateTodo = () => {
        if (editText) {
            todoStore.updateTodo(editId, editText);
            setEditId(0);
            setEditText('');
        }
    };
    
  return (
    <Container>
        <h1>To-do list</h1>
        <TextField
            label="Add new task"
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add task</Button>

        <List>
            {todoStore.todos.map((todo) => (
                <ListItem key={todo.id}>
                    <Checkbox checked={todo.completed} onChange={() => todoStore.toggleTodo(todo.id)}/>
                    {editId === todo.id ? (
                        <TextField
                            label="Edit task"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateTodo()}
                        />
                    ) : (
                        <ListItemText primary={todo.text} onClick={() => setEditId(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}/>
                    )}
                    <IconButton edge="end" onClick={() => todoStore.deleteTodo(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    </Container>
  )
})

export default TodoApp
