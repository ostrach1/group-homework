
import { AppBar, Toolbar, Typography, styled, Box, Container, IconButton, MenuItem, Menu, Button, useTheme } from '@mui/material';
import React, { useState } from 'react';
import logo from '../assets/logo.png'
import { useContext } from "react";

import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";


function NavBar() {

    const pages = [ 'ABOUT', 'CONTACT'];
    const theme = useTheme();
    const colorMode = useContext(ThemeContext);

 
  return (


        <Container>
            <Toolbar className='toolbar' sx={{justifyContent: 'space-between'}}>
            <Box>  <Link to="/">
    
    <img src={logo} alt='logo' style={{width: '6.5rem', marginLeft: '2rem'}} />   </Link></Box>
    
            
           
    
              <Box sx={{ display: {sm: 'flex' } }}>
              {console.log("CO",theme.palette.mode)}
              
                {pages.map((page) => (
                  <Button key={page} sx={{ my: 2, color: 'black', fontSize: '16px', fontWeight: '700' }}>
                     <NavLink to={`${page.toLowerCase()}`} style={{ textDecoration: 'none', color: "black"}}>{page}</NavLink>
            
                  </Button>
                ))}
                   <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{color:"black"}} />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
    
      </Box>
              </Box>
    
            </Toolbar>
    
        </Container>
   
    
  )
}

export default NavBar