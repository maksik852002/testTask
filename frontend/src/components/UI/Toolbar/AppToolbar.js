import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../store/actions/usersActions";
import {toggleDrawer} from "../../../store/actions/mainActions";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: '30px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  temporarily: {
    marginRight: '30px',
  },
  pageLink: {
    padding: '0 10px'
  },
  drawer: {
    [theme.breakpoints.down('md')]: {
      display: "none"
    },
  },
  navLink: {
    '&:hover': {
      color: 'inherit'
    },
  },
}));

const AppToolbar = () => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => dispatch(toggleDrawer())}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/adm" className={classes.mainLink}>Admin panel</NavLink>
          </Typography>
          {user ? (
            <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
          ) : (
            <AnonymousMenu/>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  );
};

export default AppToolbar;