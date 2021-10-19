import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItemInTask, removeItemFromtask } from "../../store/tasks.slice";
function Task({ task }) {
  const [time, setTime] = useState(task.time);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        if (time > 0) {
          setTime((time) => time - 1);
        } else {
          setIsComplete(true);
          dispatch(updateItemInTask({ ...task, isComplete, time }));
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isComplete, time, dispatch, task]);

  const removeHandler = () => {
    dispatch(removeItemFromtask(task.id));
  };

  const checkboxHandeler = () => {
    setIsComplete(true);
    setTime(0);
    dispatch(updateItemInTask({ ...task, isComplete, time }));
  };

  return (
    <div>
      <div
        className={`alert ${isComplete ? "alert-success" : "alert-warning"} `}
      >
        <div className="container">
          <div className="row">
            <div className="col-1  mb-2">
              <label className="checkbox-container" onClick={checkboxHandeler}>
                <input
                  type="checkbox"
                  onChange={checkboxHandeler}
                  checked={isComplete}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="col-10 mb-2">
              <span className="">{task.description}</span>
            </div>
            <div className="col-1">
              <button type="button" className="close" onClick={removeHandler}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        {!isComplete && (
          <div>
            <hr />
            <p className="mb-0"> Time Remaining : {time}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
