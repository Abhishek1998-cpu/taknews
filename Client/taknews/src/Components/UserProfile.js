import {
  Checkbox,
  MenuItem,
  Radio,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});

  const logOutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        window.alert("User Logged Out Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("User Logout Failed");
    }
  };

  const callUserProfilePage = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
      setUserData(data);
      // console.log(data);
    } catch (err) {
      // console.log(err);
      navigate("/login");
    }
  };
  React.useEffect(() => {
    callUserProfilePage();
  }, []);

  console.log("New 1 = " + JSON.stringify(userData));
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>I am the User Profile Page</h2>
      <form className="formWrapper" method="GET">
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
            // label="Username"
            name="username"
            variant="outlined"
            value={userData.username}
            // disabled
            // onChange={(e) => updateFormData(e)}
            onChange={() => {}}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          <TextField
            id="outlined-basic"
            // label="Email"
            name="email"
            value={userData.email}
            variant="outlined"
            // onChange={(e) => updateFormData(e)}
            onChange={() => {}}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          />
          {/* <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            variant="outlined"
            // onChange={(e) => updateFormData(e)}
            onChange={() => {}}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          /> */}
          <TextField
            id="outlined-basic"
            // label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            value={userData.phoneNumber}
            // onChange={(e) => updateFormData(e)}
            onChange={() => {}}
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
                // checked={male}
                checked={userData.gender === "Male"}
                // onClick={(e) => {
                //   updateFormData(e);
                //   setMale(true);
                //   setFemale(false);
                // }}
                onClick={() => {}}
                value="Male"
                name="gender"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>Female</h3>
              <Radio
                // checked={female}
                checked={userData.gender === "Female"}
                // onClick={(e) => {
                //   updateFormData(e);
                //   setFemale(true);
                //   setMale(false);
                // }}
                onClick={() => {}}
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
                // checked={english}
                checked={userData.language === "English"}
                // onClick={(e) => {
                //   updateFormData(e);
                //   setEnglish(true);
                //   setHindi(false);
                // }}
                onClick={() => {}}
                value="English"
                name="language"
                inputProps={{ "aria-label": "A" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>Hindi</h3>
              <Radio
                // checked={hindi}
                checked={userData.language === "Hindi"}
                // onClick={(e) => {
                //   updateFormData(e);
                //   setHindi(true);
                //   setEnglish(false);
                // }}
                onClick={() => {}}
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
                // value={
                //   formData.maritalStatus !== ""
                //     ? formData.maritalStatus
                //     : "Select Marital Status"
                // }
                value={`${userData.maritalStatus}`}
                // onChange={(e) => updateFormData(e)}
                onChange={() => {}}
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
                  value={userData.dob}
                  // value={""}
                  name="dob"
                  // onChange={handleDateChange}
                  onChange={() => {}}
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
                  // label="Time picker"
                  value={userData.tob}
                  // value={""}
                  // onChange={handleTimeChange}
                  onChange={() => {}}
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
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Button variant="contained" color="primary" onClick={logOutUser}>
                Log Out
              </Button>
            </div>
          </div>
          {/* <div
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
              // checked={checked}
              checked={true}
              // onChange={handleChange}
              onChange={() => {}}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            <h3>I accept the Terms and Privacy Policy</h3>
          </div> */}
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              // disabled={!checked}
              disabled={false}
              // onClick={submitUserData}
              onClick={() => {}}
            >
              Submit
            </Button>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
