import React, { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, makeStyles, Button, Typography, Menu, MenuItem } from "@material-ui/core";
import { AuthContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
import { firebaseDB } from "../config/firebase";
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const Header = () => {
    const { signOut, currentUser } = useContext(AuthContext);
    const [profilePic, setProfilePic] = useState(null);
    const [anchorElGender, setAnchorElGender] = useState(null);
    const [anchorElClothing, setAnchorElClothing] = useState(null);
    const [filterTags, setFilterTags] = useState({
        gender: 'all',
        clothingType: 'all'
    });

    const classes = useStyles();

    const handleLogout = async () => {
        try {
            await signOut();
            // Redirect to login page
        } catch (err) {
            console.error(err);
        }
    };

    const handleFilter = (category, value) => {
        setFilterTags({ ...filterTags, [category]: value });
        handleClose(category);
        // Perform filtering logic here based on selected tags
        // Update your video display accordingly
        // For example:
        // fetchVideosByTags(value);
    };

    useEffect(() => {
        const loadUser = () => {
            firebaseDB.collection("users").doc(currentUser.uid).get()
                .then((doc) => {
                    let user = doc.data();
                    setProfilePic(user.profileImageUrl);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setProfilePic(null);
                });
        };
        loadUser();
    }, [currentUser.uid]);

    const handleClose = (category) => {
        if (category === 'gender') {
            setAnchorElGender(null);
        } else if (category === 'clothingType') {
            setAnchorElClothing(null);
        }
    };

    const handleMenuClick = (event, category) => {
        if (category === 'gender') {
            setAnchorElGender(event.currentTarget);
        } else if (category === 'clothingType') {
            setAnchorElClothing(event.currentTarget);
        }
    };

    return (
        <AppBar id="header" position="sticky" style={{ background: '#FA4616', marginBottom: "1rem" }}>
            <Toolbar>
                <Typography variant="body">SMART GATOR</Typography>
                <div className={classes.grow} />
                <div>
                    <Button
                        aria-controls="gender-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, 'gender')}
                        color="inherit"
                        className={classes.menuButton}
                    >
                        Gender
                    </Button>
                    <Menu
                        id="gender-menu"
                        anchorEl={anchorElGender}
                        keepMounted
                        open={Boolean(anchorElGender)}
                        onClose={() => handleClose('gender')}
                    >
                        <MenuItem onClick={() => handleFilter('gender', 'men')}>Men</MenuItem>
                        <MenuItem onClick={() => handleFilter('gender', 'women')}>Women</MenuItem>
                    </Menu>
                    <Button
                        aria-controls="clothing-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, 'clothingType')}
                        color="inherit"
                        className={classes.menuButton}
                    >
                        Clothing Type
                    </Button>
                    <Menu
                        id="clothing-menu"
                        anchorEl={anchorElClothing}
                        keepMounted
                        open={Boolean(anchorElClothing)}
                        onClose={() => handleClose('clothingType')}
                    >
                        <MenuItem onClick={() => handleFilter('clothingType', 'top')}>Top</MenuItem>
                        <MenuItem onClick={() => handleFilter('clothingType', 'bottom')}>Bottom</MenuItem>
                        <MenuItem onClick={() => handleFilter('clothingType', 'shoe')}>Shoe</MenuItem>
                        <MenuItem onClick={() => handleFilter('clothingType', 'all')}>All</MenuItem>
                    </Menu>
                </div>
                <NavLink to="/" style={{ marginRight: "1rem" }} exact>
                    <HomeIcon style={{ fontSize: 33, color: "black", marginTop: "5px" }} />
                </NavLink>
                <NavLink to="/profile" exact>
                    {profilePic ?
                        <Avatar src={profilePic} style={{ marginRight: "1rem" }} className={classes.small} /> :
                        <Avatar src="/broken-image.jpg" style={{ marginRight: "1rem" }} className={classes.small} />
                    }
                </NavLink>
                <Button onClick={handleLogout} color="primary" variant="contained">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
