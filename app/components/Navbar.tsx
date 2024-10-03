"use client"

import React from 'react'
import { AppBar, Box, Button, Container, Divider, Toolbar, Typography } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Navbar = () => {

    // Checkinf if we're authenticated

    const { data } = useSession()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                color="transparent"
                elevation={0} // Remove shadow
                sx={{ backgroundColor: 'transparent' }} // Ensure the background is fully transparent
            >
                <Toolbar sx={{ minHeight: 24, padding: 0 }}> {/* Reduced padding for a slimmer toolbar */}
                    <Diversity3Icon sx={{ color: '#000' }} /> {/* Ensure icon is visible */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Roboto", ml: 1, color: '#000' }}>
                        Teamify
                    </Typography>
                    <Container sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button sx={{ color: '#6c757d', fontSize: 12 }}>Pricing</Button>
                        <Button sx={{ color: '#6c757d', fontSize: 12 }}>About us</Button>
                        <Button sx={{ color: '#6c757d', fontSize: 12 }}>Blog</Button>
                        <Button sx={{ color: '#6c757d', fontSize: 12 }}>Documentation</Button>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: '#6c757d' }} />
                        <Button sx={{ color: '#6c757d', fontSize: 12 }}><Link
                            href="/login">
                            Sign in
                        </Link></Button>
                        <Button sx={{ bgcolor: "#00BFFF", ml: 1, fontSize: 12 }} variant='contained'>
                            <Link
                                href="/register">
                                Start for free
                            </Link>
                        </Button>
                        {data ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,    // Circle diameter
                                    height: 40,   // Circle diameter
                                    borderRadius: '50%',  // Makes it a circle
                                    backgroundColor: '#00BFFF',  // Background color of the circle
                                    color: '#fff',  // Text color inside the circle
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    mx:2
                                }}
                            >

                                {data?.user?.name?.charAt(0).toUpperCase()} 
                            </Box>
                        ) : null}


                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
