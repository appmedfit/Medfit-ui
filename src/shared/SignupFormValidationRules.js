export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be more than 6 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  }

  if (
    values.confirmPassword &&
    values.password &&
    values.confirmPassword !== values.password
  ) {
    errors.confirmPassword = "Both passwords are different";
  }
  if (!values.role) {
    errors.role = "Role is required";
  }
  if (values.role == "doctor") {
    if (!values.registrationNumber) {
      errors.registrationNumber = "Registration Number is required";
    }
    if (!values.consultancyFee) {
      errors.consultancyFee = "Consultancy Fee  is required";
    }
    if (!values.experience) {
      errors.experience = "Experience  is required";
    }
    if (!values.degree) {
      errors.degree = "Degree is required";
    }
    if (!values.location) {
      errors.location = "location  is required";
    }
    if (!values.specialty) {
      errors.specialty = "specialty is required";
    }
  }

  return errors;
}
