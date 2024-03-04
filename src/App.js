import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [getid,setGetId] = useState('');
  const [deleteid,setDeleteId] = useState('');
  const [updateid,setUpdateId] = useState('');
  const [updateTododes, setUpdateTododes] = useState('');
  // useEffect(() => {
  //   fetchTodos();
  // }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/gettodos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
 //eeee
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/posttodos', {
        description: newTodo,
        status: 'doing' // Assuming a default status of 'pending'
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const getTodo =async ()=>{
    try{
      const response = await axios.get(`http://localhost:5000/gettodos/${getid}`);
      setTodos(response.data);
    }
    catch(error){
      console.error('Error fetching data',error);
    }
  }
  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/deletetodos/${deleteid}`);
      setTodos(todos.filter(todo => todo.todoid !== deleteid));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
  const updateTodo = async()=>{
    try{
      console.log(updateid);
      await axios.put(`http://localhost:5000/updatetodos/${updateid}`,{
        description: updateTododes });
    }catch(error)
    {
      console.error("Error updating todo:",error)
    }
  }
  ;
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo description"
      />
      <button onClick={addTodo}>Post</button>
        <div>
      <input
        type="text"
        value={getid}
        onChange={(e) => setGetId(e.target.value)}
        placeholder="Enter ID"
      />
      <button onClick={getTodo}>Get Todo</button>
       
       <div>
      <input 
        type='text'
        value={deleteid}
        onChange={(e)=>setDeleteId(e.target.value)}
        placeholder='Enter id'
        />
        <button onClick={deleteTodo}>Delete Todo</button>
         <br></br>
      <>
      
      <input 
      type='text'
      value={updateid}
      placeholder='enter update id'
      onChange={(e)=>setUpdateId(e.target.value)}/>
      <input
        type="text"
        value={updateTododes}
        onChange={(e) => setUpdateTododes(e.target.value)}
        placeholder="Enter updating todo description"
      />
      <button onClick={updateTodo}>Update todo</button>

      </>
       <br></br>
        <>
       <button onClick={fetchTodos}>Get All todos</button>
       </>
      <div>
        <h2>Todos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.Todo_id}</td>
                <td>{todo.description}</td>
                <td>{todo.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
    </div>
  );
}

export default TodoApp;
