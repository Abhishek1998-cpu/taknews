import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { IconButton } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

function Home() {
  const [newsList, setNewsList] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();
  const getNewsData = async () => {
    try {
      const res = await fetch("/getNewsData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // const data = await res.json()
      // if(res !== null || resundefined){
      //   setNewsList(data)
      // }
      setNewsList(data);
    } catch (error) {
      console.log(error);
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
      } else {
        setUserData(data);
      }
    } catch (err) {
      navigate("/login");
    }
  };
  React.useEffect(() => {
    callUserProfilePage();
    getNewsData();
  }, []);

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        {/* Hello Welcome Section Starts */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            width: "90%",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  navigate("/userprofile");
                }}
              >
                <PersonOutlineIcon />
              </IconButton>
            </div>
            <div>Hello {userData.username}</div>
          </div>
          <div>Welcome</div>
        </div>
        {/* Hello Welcome Section Ends  */}
        {/* Search bar Section starts */}
        <div>
          <SearchBar
            style={{ backgroundColor: "skyblue" }}
            value={""}
            onChange={() => {}}
            onRequestSearch={() => {}}
          />
        </div>
        {/* Search bar Section ends  */}
        {/* Filter Section Starts */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            padding: "1rem",
          }}
        >
          <div>
            <Button variant="contained" color="primary" onClick={() => {}}>
              Sort
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={() => {}}>
              Filter
            </Button>
          </div>
        </div>
        {/* Filter Section Ends */}
        {/* News Block Section Starts  */}
        {newsList !== [] &&
          newsList.map((element, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "90%",
                  border: "1px solid grey",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    minWidth: "30%",
                  }}
                >
                  <img
                    src="https://source.unsplash.com/random/?tech,computer"
                    alt="Girl in a jacket"
                    // width="100"
                    width="75%"
                    // height="200"
                    height="150"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <h2>{element.niche}</h2>
                  <h3>"{element.content}"</h3>
                  <h4>by {element.author}</h4>
                </div>
              </div>
            );
          })}
        {/* News Block Section Ends   */}
        <div>
          <div></div>
          <div></div>
        </div>
        {/* Filter Section Ends */}
        <div
          style={{ maxWidth: "25%", marginTop: "5rem", marginBottom: "5rem" }}
        >
          <Button variant="contained" color="primary" onClick={logOutUser}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
