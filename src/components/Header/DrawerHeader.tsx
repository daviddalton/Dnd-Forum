import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TopicMenu from '../TopicMenu/TopicMenu';
import { useNavigate } from 'react-router-dom';
import { StepIcon, SvgIcon } from '@mui/material';
import { ImportContacts, Person } from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflowX: 'hidden',
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Drawer = styled ((props: DrawerProps) => (
  <MuiDrawer {...props}/>
))(({ theme }) => ({
  // width: '250px'
}))




function DrawerHeader(props: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNav = (text: string) => {
    if (text === 'Create') {
      navigation('/create')
      
    } else {
      navigation('/login')
    }
    props.handleDrawerClose()
  }

  return (
    <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            sx={{
              // width: drawerWidth,
              
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { 
                
                boxSizing: 'border-box',
                background: 'none'
              },
              
            }}
            variant="persistent"
            anchor='left'
            open={props.open}
          >
            <Toolbar />
            <Box sx={{ 
              overflow: 'auto',
              background: '#393E46',
              height: '100vh',
              width: drawerWidth
               }}>
              <List>
                <TopicMenu handleDrawerClose={props.handleDrawerClose} />
              </List>
              <Divider />
              <List>
                {['Create', 'Login'].map((text, index) => (
                  <ListItem 
                    key={text} 
                    disablePadding
                    onClick={() => handleNav(text)}>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <ImportContacts style={{ opacity: '.6', color: 'white'}}/> : <Person style={{ opacity: '.6', color: 'white'}}/>}
                      </ListItemIcon>
                      <ListItemText primary={text} style={{ color: 'white', opacity: '.6'}} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        <Main 
            sx={{
            padding: '0px'
            }}
            open={props.open}>
        </Main>

        </Box>
      );
}

export default DrawerHeader


