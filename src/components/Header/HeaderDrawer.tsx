import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import TopicMenu from '../TopicMenu/TopicMenu';
import { useNavigate } from 'react-router-dom';
import { ImportContacts, Person } from '@mui/icons-material';
import { useAuth } from '../userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { create, login, logout } from '../../util/Constants';

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

}))

function HeaderDrawer(props: any) {
  
  const user = useAuth()
  const navigation = useNavigate()

  const handleNav = (text: string) => {
    if (text === 'Create') {
      navigation('/create')
    } else {
      navigation('/login')
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            sx={{
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
              {!user.user ? (
              <div
              style={{
                margin: '5px',
                display: 'flex',
                color: 'white',
                justifyContent: 'center',
                opacity: '.6'
              }}>
                <div
                  style={{
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNav('login')}>
                <div
                  style={{
                    margin: '5px'
                  }}>
                    {login}
                </div>
                <div
                  style={{
                    margin: '5px'
                  }}>
                    <Person  />
                </div>
                </div>
            </div>
              ):(
                <div
                style={{
                  margin: '5px',
                  display: 'flex',
                  color: 'white',
                  justifyContent: 'center',
                  opacity: '.6'
                }}>
                  <div
                    style={{
                      display: 'flex',
                      cursor: 'pointer'
                    }}
                    onClick={() => signOut(auth)}>
                  <div
                    style={{
                      margin: '5px'
                    }}>
                      {logout}
                  </div>
                  <div
                    style={{
                      margin: '5px'
                    }}>
                      <Person  />
                  </div>
                  </div>
              </div>
              )}
              <div
              style={{
                margin: '5px',
                display: 'flex',
                color: 'white',
                justifyContent: 'center',
                opacity: '.6'
              }}>
                <div
                  style={{
                    display: 'flex',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNav('Create')}>
                <div
                  style={{
                    margin: '5px'
                  }}>
                    {create}
                </div>
                <div
                  style={{
                    margin: '5px'
                  }}>
                    <ImportContacts  />
                </div>
                </div>
            </div>
            {user.user ? (
            <div
            style={{
              margin: '5px',
              display: 'flex',
              color: 'white',
              justifyContent: 'center',
              opacity: '.6'
            }}>
              <div
                style={{
                  display: 'flex',
                }}>
              <div
                style={{
                  margin: '5px'
                }}>
                  Current User: 
              </div>
              <div
                style={{
                  margin: '5px'
                }}>
                  {user.user?.displayName}
              </div>
              </div>
          </div>
            ):(
              <div></div>
            )}

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


export default HeaderDrawer


