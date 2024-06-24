import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import todoStore from '../store/todoStore';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const TodoApp: React.FC = observer(() => {
    const [task, setTask] = useState('');
    const [editId, setEditId] = useState(0);
    const [editText, setEditText] = useState('');
    const [taskError, setTaskError] = useState(false);

    const handleAddTodo = () => {
        if (task) {
            todoStore.addTodo(task);
            setTask('')
            setTaskError(false)
        } else {
            setTaskError(true)
        }
    };

    const handleUpdateTodo = (id: number) => {
        if (editText) {
            todoStore.updateTodo(editId, editText);
            setEditId(0);
            setEditText('');
        }
    };

    const handleEditButtonClick = (id: number, text: string) => {
        setEditId(id);
        setEditText(text);
    };

    const handleCancelEdit = () => {
        setEditId(0);
        setEditText('');
    }

    return (
    <Container>
        <h1>To-do list</h1>
        <TextField
            label="Add new task"
            variant="outlined"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value) }
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        {taskError && <Typography color="error">Заполните поле</Typography>}

        <Button onClick={handleAddTodo}>Add task</Button>

        <List>
        {todoStore.todos.map((todo) => (
            <ListItem key={todo.id}>
                <Checkbox checked={todo.completed} onChange={() => todoStore.toggleTodo(todo.id)} />
                {editId === todo.id ? (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TextField
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdateTodo(todo.id)}
                        fullWidth
                    />
                    <Button onClick={() => handleUpdateTodo(todo.id)}>Save</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                    </div>
                ) : (
                    <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
                )}
                {editId !== todo.id && (
                    <IconButton edge="end" onClick={() => handleEditButtonClick(todo.id, todo.text)}>
                        <EditIcon />
                    </IconButton>
                )}
                <IconButton edge="end" onClick={() => todoStore.deleteTodo(todo.id)}>
                    <DeleteIcon />
                </IconButton>

            </ListItem>
        ))}
        </List>
    </Container>
    );
});

export default TodoApp;