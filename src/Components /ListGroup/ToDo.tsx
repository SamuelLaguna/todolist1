import { useState } from "react";
import styles from './ToDo.module.css';

//Using iterface to assign out 
interface ToDoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
}

const ToDo = () => {
  //We use the useStates to manage the state of out componenet
  const [input, setInput] = useState("");
  const [list, setList] = useState<ToDoItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addToDo = (newItem: string) => {

    //After the user enters in the task and clicks add this function takes the text from the input and makes a new todo item with it. It also adds it to the exisiting items. 
    setList((prevList) => {
      const newToDo: ToDoItem = {
        id: Date.now(),
        todo: newItem,
        isCompleted: false,
      };
      //This clears the input field after it has beed added
      setInput("");
      return [...prevList, newToDo];
    });
  };

  //This helper function is for when a item is clicked it will be crossed out 
  const toggleCompletion = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        //using a call back function to make a copy of the array and makes a new one and displyes it with a crossed out 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  //This helper function is letting the computer know witch item is being edited 
  const startEditing = (id: number, todo: string) => {
    setEditingId(id);
    setInput(todo);
  };

  //This helper function is letting the computer know that a specific item has been updated
  const updateToDo = (newTodo: string) => {
    setList((prevList) =>
      prevList.map((item) =>
          
        item.id === editingId ? { ...item, todo: newTodo } : item
      )
    );
    setEditingId(null);
    setInput("");
  };
     //This helper function will tell the list to deltete a item
  const deleteItem = (id: number) => {
    //filter is used to take a item out of the array
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="myContianer">
        <div className="row">
          <br></br>
          <h1>ToDo List</h1>
       
          <h2>Enter In Items for a ToDo List.</h2>
          <input
          className="inputPosition"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button
            className="addButton addBtnPostition buttonColors"
            //Telling the button whitch state to go into and what to do depending on the state of the edidtingId
            onClick={() => (editingId !== null ? updateToDo(input) : addToDo(input))}
          >
            {/* This tells the button next to the input to weather say Add or Update depending on the editingId state */}
            {editingId !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul className="listBod">
          {list.map((item) => (
            <li
            className="listItemColor"
              key={item.id}
            // This is inline styling telling it when clicked to put a line threw the item
              style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}
              onClick={() => toggleCompletion(item.id)}
            >
              {item.todo}{" "}
              <button className="editDeletePostition" onClick={() => startEditing(item.id, item.todo)}>Edit</button>
              <button className="editDeletePostition" onClick={() => deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo;