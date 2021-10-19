import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({ description: "", time: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log("submitted");
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    console.log(values);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
