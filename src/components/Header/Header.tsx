
import { Link, useNavigate } from "react-router-dom"
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material"
import { getAuth, signOut } from "firebase/auth";
import {useState} from "react";
import '../styles/header.css'
import HeaderDrawer from "./DrawerHeader";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";
import { useAuth } from "../userContext";



function Header() {
    const [width, setWidth] = useState(window.innerWidth)
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const theme = useTheme();
    const auth = getAuth()
    const user = useAuth()

    const handleClickWiki = () => {
        navigate('/wiki')
        setOpen(true)
    }
    const handleClickCreate = () => {
        navigate('/create/character-select')
    }
    const handleMouseEnter = (e: any) => {
        e.target.style.opacity = ".9"
        e.target.style.boxShadow = "box-shadow: 0px 10px 10px 0px black"
    }
    const handleMouseLeave = (e: any) => {
        e.target.style.opacity = ".7"
        e.target.style.boxShadow = "box-shadow: 0px 4px 10px 0px black;"
    }
    const navToHome = () => {
        navigate('/')
    }
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    function handleResize() {
        handleDrawerClose()
        setWidth(window.innerWidth)
    } 

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    })

    return<>
        <AppBar className="heading-appbar"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
            style={{background: '#222831'}}>
                <div className="heading-appbar-item-container">
                    <div className="heading-appbar-menu-icon-container">
                        {open ? (
                            <IconButton onClick={handleDrawerClose}>
                                      {theme.direction === 'ltr' ? <ChevronLeftIcon style={{color: 'white', marginTop: '10px', marginLeft: '10px'}}/> : <ChevronRightIcon />}
                                    </IconButton>
                        ) : (
                            <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2 }}>
                                <MenuIcon />
                            </IconButton>
                        </Toolbar>
                        )}
                    </div>
                    <div className="header-center-screen-container">
                        <div className="header-center-screen-title"
                            onClick={navToHome}>
                                DND FORUM
                        </div>
                        {width > 400 ? (
                        <>
                        <div className="header-center-screen-wiki">
                            <button className='wiki-button'
                                onClick={handleClickWiki}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                Wiki
                            </button>
                        </div>
                            <div className="header-center-screen-create">
                                <button className='create-button'
                                    onClick={handleClickCreate}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Create
                                </button>
                            </div>
                        </>
                        ): (
                            <div></div>
                        )}

                        </div>
                        <div className="heading-login-container">
                            {user.user ? (
                                <div 
                                    onClick={() => signOut(auth)}
                                    style={{ paddingRight: '10px'}}>
                                        {width > 920 ? (
                                            <div
                                                style={{
                                                    display: 'flex'
                                                }}>
                                                <div
                                                style={{
                                                    background: '#761e21',
                                                    padding: '5px',
                                                    borderRadius: '10px',
                                                    opacity: '.6'
                                                }}>
                                                    {user.user.email}
                                                </div>
                                                <div
                                                    style={{
                                                        padding: '5px',
                                                        marginLeft: '10px',
                                                        border: '1px white solid',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer'
                                                    }}>
                                                    Logout
                                                </div>
                                            </div>
                                            
                                        ):(
                                            <div
                                            style={{
                                                padding: '5px',
                                                marginLeft: '10px',
                                                border: '1px white solid',
                                                borderRadius: '10px',
                                                cursor: 'pointer'
                                            }}>
                                                Logout
                                            </div>
                                        )}
                                    
                                </div>
                            ):(
                                <>
                                <div className="heading-login-text-container">
                                    Login
                                </div>
                                <Link to={"/login"}>
                                    <div className="heading-login-square">
                                    </div>
                                </Link>
                                </>
                            )}
                        </div>
                </div>
        </AppBar>
        <HeaderDrawer 
            open={open}
            setOpen={setOpen}
            handleDrawerClose={handleDrawerClose}/>
    </>
}

export default Header