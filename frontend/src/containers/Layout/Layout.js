import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeDrawer} from "../../store/actions/mainActions";
import DrawerLayout from "../../components/UI/DrawerLayout/DrawerLayout";
import Routes from "../../routes/Routes"; 
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {links} from "../../constants";

const Layout = () => {
  const dispatch = useDispatch();
  const drawerContent = (
    <MenuList>
      {links.map(el => (
        <MenuItem key={el.name} onClick={() => dispatch(closeDrawer())} activeClassName="Mui-selected" component={NavLink} to={el.path}>{el.name}</MenuItem>
      ))}
    </MenuList>
  );
  return (
    <>
      <DrawerLayout drawerContent={drawerContent}>
        <Routes/>
      </DrawerLayout>
    </>
  );
};

export default Layout;


