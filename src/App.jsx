import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [completed, setCompleted] = useState(false);
  const [color, setColor] = useState("red");
  const [filter, setFilter] = useState("All");
  const [editingIndex, setEditingIndex] = useState(null);

  function namefunc(e) {
    setName(e.target.value);
  }

  function descrifunc(e) {
    setDescription(e.target.value);
  }

  function addtask() {
    setTodos([...todos, { name: name, description: description, status: status, completed: completed }]);
    setName('');
    setDescription('');
  }

  function select(e, index) {
    const updatedTodos = [...todos];
    updatedTodos[index].status = e.target.value;
    setTodos(updatedTodos);
    setColor(e.target.value === "Not Completed" ? "red" : "green");
  }

  function deletefunc(index) {
    setTodos(todos.filter((item, i) => i !== index));
  }

  function edit(index) {
    const todoToEdit = todos[index];
    setName(todoToEdit.name);
    setDescription(todoToEdit.description);
    setStatus(todoToEdit.status);
    setEditingIndex(index);
  }

  function saveEdit() {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = { name: name, description: description, status: status, completed: completed };
    setTodos(updatedTodos);
    setEditingIndex(null);
  }

  function filterfunc(e) {
    setFilter(e.target.value);
  }

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const filteredTodos = filter === "All" ? todos :
                       filter === "Completed" ? todos.filter(item => item.status === "Completed") :
                       todos.filter(item => item.status === "Not Completed");

  return (
    <>
      <h1 className='text-center'>TO DO APP</h1>
     
      <div className='row mx-0 my-4'>
        <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12'>
          <input type="text" value={name} onChange={namefunc} className='form-control mx-2' placeholder='ToDo Name' />
        </div>
        <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12'>
          <input type="text" value={description} onChange={descrifunc} className='form-control mx-2' placeholder='ToDo Description' />
        </div>
        <div className='col-xl-2 col-lg-2 col-md-2 col-sm-12'>
          {editingIndex !== null ? (
            <button onClick={saveEdit} className='btn btn-primary'>Save</button>
          ) : (
            <button onClick={addtask} className='btn btn-success'>Add Task</button>
          )}
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-between mx-2 my-5'>
        <div> <h5>My To Do</h5></div>
        <div className='d-flex aign-items-center justify-content-end me-5'>
        <div>
         <h5 className='mx-2'>Filter</h5>
        </div>
        <select className='filter' onChange={filterfunc} value={filter}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      </div>
      <div className='row mx-0'>
        {filteredTodos.map((item, index) => (
          <div key={index} className='col-xl-4 xol-lg-4 col-md-2 col-sm-12 col-12'>
            <div className='card'>
              <div className='d-flex align-items-center my-2'>
                <h5>Name :</h5>
                <h5>{item.name}</h5>
              </div>
              <div className='d-flex align-items-center my-2'>
                <h5>Description :</h5>
                <h5>{item.description}</h5>
              </div>
              <div className='d-flex align-items-center my-2'>
                <h5>Status :</h5>
                <div>
                  <select style={{ background: item.status === "Not Completed" ? "red" : "green" }} name="status" id="status" onChange={(e) => select(e, index)} value={item.status}>
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-around my-2'>
                <button onClick={() => edit(index)} className='btn btn-primary button'>Edit</button>
                <button onClick={() => deletefunc(index)} className='btn btn-danger button'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
