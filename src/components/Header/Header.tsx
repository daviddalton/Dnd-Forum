import { useNavigate } from "react-router-dom"
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material"
import { getAuth, signOut } from "firebase/auth";
import {useState} from "react";
import '../styles/header.css'
import HeaderDrawer from "./HeaderDrawer";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from "../creation/Providers/userContext";
import { useWidth } from "../creation/Providers/WidthContext";
import { create, title, wiki } from "../../util/Constants";

function Header() {
   
    const [open, setOpen] = useState(false);
    const width = useWidth()
    const navigate = useNavigate();
    const theme = useTheme();
    const auth = getAuth()
    const user = useAuth()
    const currentURL = window.location.href
    
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
    const handleLoginClick = () => {
        navigate('/login')
    }


    return<>
        <AppBar className="heading-appbar"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
            style={{background: '#222831'}}>
                <div className="heading-appbar-item-container">
                    <ShowMenuIcon open={open} handleDrawerClose={handleDrawerClose} theme={theme} handleDrawerOpen={handleDrawerOpen}/>
                    <TitleAndButtons handleClickWiki={handleClickWiki} handleClickCreate={handleClickCreate} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} width={width.width!} navToHome={navToHome}/>
                    <LoggedInContainer user={user} width={width.width!} auth={auth} handleLoginClick={handleLoginClick} currentURL={currentURL}/>
                </div>
        </AppBar>
        <HeaderDrawer
            open={open}
            setOpen={setOpen}
            handleDrawerClose={handleDrawerClose}/>
    </>
}

function ShowMenuIcon(props: any) {
    return (
        <div className="heading-appbar-menu-icon-container">
        {props.open ? (
            <IconButton onClick={props.handleDrawerClose}>
                {props.theme.direction === 'ltr' ? <ChevronLeftIcon style={{color: 'white', marginTop: '10px', marginLeft: '10px'}}/> : <ChevronRightIcon />}
            </IconButton>
        ) : (
            <Toolbar  sx={{ paddingRight: '0px' }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}>
                <MenuIcon/>
            </IconButton>
        </Toolbar>
        )}
    </div>
    )
}

function TitleAndButtons(props: any) {
    return (
        <div className="header-center-screen-container">
        <div className="header-center-screen-title"
            style={{ cursor: 'pointer' }}
            onClick={props.navToHome}>
                {title}
        </div>
        {props.width > 400 ? (
        <>
        <div className="header-center-screen-wiki"
            >
            <button
                data-testId="wiki-button" 
                className='wiki-button'
                onClick={props.handleClickWiki}
                onMouseEnter={props.handleMouseEnter}
                onMouseLeave={props.handleMouseLeave}
            >
                {wiki}
            </button>
        </div>
            <div className="header-center-screen-create">
                <button
                    data-testId="create-button" 
                    className='create-button'
                    onClick={props.handleClickCreate}
                    onMouseEnter={props.handleMouseEnter}
                    onMouseLeave={props.handleMouseLeave}
                >
                    {create}
                </button>
            </div>
        </>
        ): (
            <div/>
        )}

    </div>
    )
} 

function LoggedInContainer(props: any) {
    
    return (
        <div className="heading-login-container">
        {props.user.user ? (
            <LogoutDisplayName width={props.width} user={props.user} />
        ):(
            <LoginDisplayName handleLoginClick={props.handleLoginClick} currentURL={props.currentURL}/>
        )}
    </div>
    )
}

function LogoutDisplayName(props: any) {
    const auth = getAuth()
    return (
        <div 
        style={{ paddingRight: '10px'}}>
            {props.width > 920 ? (
                <div
                    style={{
                        display: 'flex'
                    }}>
                    <div className="header-display-name-text">
                        {props.user.user.displayName}
                    </div>
                    <div
                        
                        className="header-display-logout-text"
                        onClick={() => signOut(auth)}>
                        Logout
                    </div>
                </div>  
            ):(
                <div 
                    className="header-display-logout-text"
                    onClick={() => signOut(auth)}>
                    Logout
                </div>
            )}
    </div>
    )
}

function LoginDisplayName(props: any) {
    return (
        <>
        {props.currentURL !== 'http://localhost:3000/login' ? (
        <div
        data-testId="login"
            style={{
                marginRight: '15px',
                padding: '5px',
                borderRadius: '10px',
                cursor: 'pointer',
                background: '#761e21',
                opacity: '.6'
            }}
            onClick={props.handleLoginClick}>
        Login
    </div>
        ):(
            <div></div>
        )}
        </>
    )
}
export default Header