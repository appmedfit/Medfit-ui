import React from "react";
import Task from "../Task/Task";

import { useSelector } from "react-redux";

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  return (
    <div className="card  ">
      <div className="card-body task-list-container">
        {tasks.map((task, index) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
