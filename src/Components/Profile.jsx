import UserFeeds  from "./UserFeeds";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { Avatar, Typography, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthProvider";
import { firebaseDB } from "../config/firebase";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    maxWidth: 275,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: "1rem",
    position: "absolute",
    width: "100%",
    top: 50,
    display: "flex",
    justifyContent: "spaceEvenly",
    alignItems: "center",
  },
  avatar: {
    marginRight: 30,
    marginLeft: 20,
  },
  title: {
    width: "80%",
  },
}));

const Profile = () => {
  console.log("At profile");
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [userObj, setUserObj] = useState([]);
  const { userid } = useParams(); // Extract userid from the URL parameters

  // Use the extracted userid if available, otherwise use currentUser.uid
  const uid = userid != null ? userid : currentUser.uid;

  useEffect(() => {
    const loadUser = () => {
      firebaseDB
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          return doc.data();
        })
        .then((userObject) => {
          setUserObj(userObject);
        });
    };
    loadUser();
  }, [uid]);

  return (
    <div className="profile">
      <Header></Header>
      <Container className={classes.root}>
        <div>
          <a href={`mailto:${userObj?.email}`}>
            <Paper className={classes.paper}>
              <Avatar
                className={classes.avatar}
                src={userObj?.profileImageUrl}
              ></Avatar>
              <Typography className={classes.title} variant="h4">
                {userObj?.username}
              </Typography>
            </Paper>
          </a>
        </div>
        <Typography variant="body1" style={{ textAlign: "right" }}>
          Total Posts: {userObj?.postsCreated?.length}
        </Typography>
        <UserFeeds userId={uid} />
      </Container>
    </div>
  );
};

export default Profile;
