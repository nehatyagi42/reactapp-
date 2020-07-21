import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./newemp.css";
import { Button } from "react-bootstrap";

function AddEmployee({ emp }) {
  const isAddMode = emp.id === "" ? true : false;

  const initval = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    gender: "",
  };

  const validate = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .min(4, "Password Must be four characters long!")
      .max(20, "Too Long!")
      .required("Password is Required"),

    address: Yup.string().required("address is required"),
    gender: Yup.string().required("gender is required"),
  });

  function onSubmit(fields, setSubmitting) {
    // alert(fields, null, 2);
    upsertEmployee(fields, setSubmitting);

    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  function upsertEmployee(fields, setSubmitting) {
    console.log("i cam here...");
    const apiUrl = "http://localhost:8080/employee";
    const options = {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (!isAddMode) {
      options.method = "PUT";
    }

    fetch(apiUrl, options)
      .then((res) => res.json(fields))

      .then(
        (result) => {
          //  props.history.push("/employee");
        },

        (error) => {
          setSubmitting(false);
          // props.history.push("/employee");
          console.log(error);
        }
      );
    //we are using this command when we are click on submit button and  we want to display our data in list
    window.location.reload();
  }

  return (
    <div>
      <Formik
        initialValues={!isAddMode ? emp : initval}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={validate}
      >
        {({
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          isSubmitting,
          setFieldValue,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h3 style={{ marginLeft: "30%", marginTop: "3%" }}>
                {" "}
                {!isAddMode ? "Edit" : "Add"} Employee
              </h3>
              <label htmlFor="firstName" style={{ display: "block" }}>
                First Name
              </label>
              <input
                id="firstName"
                placeholder="Enter your firtname"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.firstName && touched.firstName
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.firstName && touched.firstName && (
                <div className="input-feedback">{errors.firstName}</div>
              )}
              <label htmlFor="lastName" style={{ display: "block" }}>
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Enter your lastname"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.lastName && touched.lastName
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.lastName && touched.lastName && (
                <div className="input-feedback">{errors.lastName}</div>
              )}
              <label htmlFor="email" style={{ display: "block" }}>
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              <label htmlFor="password" style={{ display: "block" }}>
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
              <label htmlFor="address" style={{ display: "block" }}>
                Address
              </label>
              <input
                id="address"
                placeholder="Enter your address"
                type="text"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.address && touched.address
                    ? "text-input error"
                    : "text-input"
                }
              />
              {errors.address && touched.address && (
                <div className="input-feedback">{errors.address}</div>
              )}
              <label htmlFor="gender" style={{ display: "block" }}>
                Gender
              </label>
              <select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.gender && touched.gender
                    ? "text-select error"
                    : "text-select"
                }
              >
                <option defaultValue="gender">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && touched.gender && (
                <div className="select-feedback">{errors.gender}</div>
              )}

              <div className="col-sm-2" style={{ marginTop: "5%" }}>
                <input type="hidden" name="id" value={values.id} />
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
              <div className="col-sm-4" style={{ marginTop: "5%" }}>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  href="employee"
                >
                  Cancel
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddEmployee;
