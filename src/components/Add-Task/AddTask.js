import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemTotask } from "../../store/tasks.slice";
import useForm from "../../shared/useForm";
import validate from "../../shared/AddTaskFormValidationRules";

function AddTask() {
  const dispatch = useDispatch();

  function addTask() {
    // console.log(errors);
    dispatch(
      addItemTotask({
        ...values,
        isComplete: false,
        id: Math.random().toString(16).slice(2)
      })
    );
    handleChange({ target: { value: "", name: "description" } });
    handleChange({ target: { value: "", name: "time" } });
  }

  const { values, errors, handleChange, handleSubmit } = useForm(
    addTask,
    validate
  );

  return (
    <div className="card add-task-container">
      <div className="card-body">
        <div>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  required
                  type="text"
                  className={` form-control ${
                    errors.description && "in-valid"
                  }`}
                  name="description"
                  placeholder="Description"
                  value={values.description}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  {errors.description && (
                    <p className="help is-danger">{errors.description}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="description">Duration</label>
                <input
                  id="time"
                  required
                  type="number"
                  className={` form-control ${errors.time && "in-valid"}`}
                  name="time"
                  placeholder="Duration"
                  value={values.time}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  {errors.time && (
                    <p className="help is-danger">{errors.time}</p>
                  )}
                </div>
              </div>
              <div className="col-md-2 mb-3 mg">
                <button type="submit" className="btn btn-primary add-button">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
