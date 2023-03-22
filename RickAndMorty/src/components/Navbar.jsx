
import { AppBar, Toolbar, Typography, styled, Box, Container, IconButton, MenuItem, Menu, Button } from '@mui/material';
import React, { useState } from 'react';
import logo from '../assets/logo.png'

import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NavBar() {

    const pages = [ 'ABOUT', 'CONTACT'];

 
  return (


        <Container>
            <Toolbar className='toolbar' sx={{justifyContent: 'space-between'}}>
            <Box>  <Link to="/">
    
    <img src={logo} alt='logo' style={{width: '6.5rem', marginLeft: '2rem'}} />   </Link></Box>
    
            
    
           
    
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {pages.map((page) => (
                  <Button key={page} sx={{ my: 2, color: 'black', fontSize: '16px', fontWeight: '700' }}>
                     <NavLink to={`${page.toLowerCase()}`} style={{ textDecoration: 'none', color: "black"}}>{page}</NavLink>
            
                  </Button>
                ))}
              </Box>
    
            </Toolbar>
    
        </Container>
   
    
  )
}

export default NavBar