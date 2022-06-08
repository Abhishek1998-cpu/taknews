import { Checkbox, TextField } from "@material-ui/core";
import React from "react";
import "./Registration.css";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [checked, setChecked] = React.useState(false);
  const [male, setMale] = React.useState(false);
  const [female, setFemale] = React.useState(false);
  const [english, setEnglish] = React.useState(false);
  const [hindi, setHindi] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: 0,
    gender: "",
    language: "",
    maritalStatus: "",
    dob: new Date("2000-01-01T21:11:54"),
    tob: new Date("2000-01-01T21:11:54"),
  });

  const navigate = useNavigate();

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleTimeChange = (date) => {
    setFormData({
      ...formData,
      tob: date,
    });
  };

  const submitUserData = async (event) => {
    event.preventDefault();
    const {
      username,
      email,
      password,
      phoneNumber,
      gender,
      language,
      maritalStatus,
      dob,
      tob,
    } = formData;
    let res = fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        phoneNumber,
        gender,
        language,
        maritalStatus,
        dob,
        tob,
      }),
    });
    if (res.status === 422 || !res) {
      window.alert("Registration Failed");
      console.log("Registration Failed");
    } else {
      window.alert("Registration Successfull");
      console.log("Registration Successfull");
      navigate("/login");
    }
  };

  // console.log(formData);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Registration Form</h2>
      <h3 style={{ textAlign: "center" }}>
        Please fill all the details correctly
      </h3>
      <form className="formWrapper" method="POST">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "25%",
            margin: "3rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            name="username"
            variant="outlined"
            onChange={(e) => updateFormData(e)}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            onChange={(e) => updateFormData(e)}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            variant="outlined"
            onChange={(e) => updateFormData(e)}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            onChange={(e) => updateFormData(e)}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              minWidth: "20rem",
            }}
          >
            <div>
              <h3>Gender:</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>Male</h3>
              <Radio
                checked={male}
                onClick={(e) => {
                  updateFormData(e);
                  setMale(true);
                  setFemale(false);
                }}
                value="Male"
                name="gender"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>Female</h3>
              <Radio
                checked={female}
                onClick={(e) => {
                  updateFormData(e);
                  setFemale(true);
                  setMale(false);
                }}
                value="Female"
                name="gender"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              minWidth: "20rem",
            }}
          >
            <div>
              <h3>Language:</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>English</h3>
              <Radio
                checked={english}
                onClick={(e) => {
                  updateFormData(e);
                  setEnglish(true);
                  setHindi(false);
                }}
                value="English"
                name="language"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>Hindi</h3>
              <Radio
                checked={hindi}
                onClick={(e) => {
                  updateFormData(e);
                  setHindi(true);
                  setEnglish(false);
                }}
                value="Hindi"
                name="language"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
          </div>
          <div>
            <h3 style={{ textAlign: "left" }}>Marital Status</h3>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={
                  formData.maritalStatus !== ""
                    ? formData.maritalStatus
                    : "Select Marital Status"
                }
                onChange={(e) => updateFormData(e)}
                name="maritalStatus"
                style={{ minWidth: "15rem" }}
                variant="outlined"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </div>
          </div>
          <div>
            <h3 style={{ textAlign: "left" }}>Date of Birth</h3>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={formData.dob}
                  name="dob"
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  variant="outlined"
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div>
            <h3 style={{ textAlign: "left" }}>Time of Birth</h3>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={formData.tob}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "0.2rem",
              minWidth: "25rem",
              marginLeft: "-0.7rem",
            }}
          >
            <Checkbox
              color="primary"
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <h3>I accept the Terms and Privacy Policy</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!checked}
              onClick={submitUserData}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div>
        <h3 style={{ textAlign: "center" }}>
          Already Registered? <Link to="/login">Login Here</Link>
        </h3>
      </div>
    </div>
  );
}

export default Registration;
