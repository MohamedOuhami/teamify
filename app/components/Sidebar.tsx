"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const { status, data } = useSession()

    const DrawerList = (


        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

            <Divider />

            <List>

                <ListItem key={'teams'} disablePadding>
                    <ListItemButton sx={{ width: '100%' }}>
                        <ListItemText primary={data?.user?.name} />
                    </ListItemButton>
                </ListItem>

                <ListItem key={'teams'} disablePadding>
                    <Link href="/teams" style={{ width: '100%', display: 'block' }}>
                        <ListItemButton sx={{ width: '100%' }}>
                            <ListItemText primary={'Teams'} />
                        </ListItemButton>
                    </Link>
                </ListItem>

                {/* For the tasks */}
                <ListItem key={'tasks'} disablePadding>
                    <Link href="/tasks" style={{ width: '100%', display: 'block' }}>
                        <ListItemButton sx={{ width: '100%' }}>
                            <ListItemText primary={'Tasks'} />
                        </ListItemButton>
                    </Link>
                </ListItem>

                {/* For the messages */}
                <ListItem key={'messages'} disablePadding>
                    <Link href="/messages" style={{ width: '100%', display: 'block' }}>
                        <ListItemButton sx={{ width: '100%' }}>
                            <ListItemText primary={'Messages'} />
                        </ListItemButton>
                    </Link>
                </ListItem>


                {/* For the messages */}
                <ListItem key={'settings'} disablePadding>
                    <Link href="/settings" style={{ width: '100%', display: 'block' }}>
                        <ListItemButton sx={{ width: '100%' }}>
                            <ListItemText primary={'Settings'} />
                        </ListItemButton>
                    </Link>
                </ListItem>


            </List>
        </Box>
    );

    return (
        <div>
            {status === "authenticated" ? (
                <div>
                    <Button onClick={toggleDrawer(true)}>Open drawer</Button>
                    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </div>
            ) : null}
        </div>
    );
}
