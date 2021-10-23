import React from "react";
import TaskList from "./components/Tasklist/TaskList";
import AddTask from "./components/Add-Task/AddTask";
import "./styles.css";
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-7">
            <div className="card1">
              <div className="card-body1">

                <h3>WELCOME To Medfit APP</h3>


                <AddTask />
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
