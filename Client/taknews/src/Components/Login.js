import React from "react";
import { TextField } from "@material-ui/core";
import "./Registration.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    fetch("/login");
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (res.status === 400 || !res) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Login Successfull");
      navigate("/");
    }
  };

  console.log(formData);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Login Form</h2>
      <h3 style={{ textAlign: "center" }}>
        Please fill all the details correctly
      </h3>
      <form className="formWrapper" method="POST">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "25%",
            margin: "5rem",
          }}
        >
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={loginUser}
              disabled={formData.email === "" || formData.password === ""}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div>
        <h3 style={{ textAlign: "center" }}>
          First Time? <Link to="/register">Register Your Account Here</Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;

// 7:14
