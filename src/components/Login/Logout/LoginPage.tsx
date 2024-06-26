import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/login.css'
import { Error, Facebook, GitHub, Google } from '@mui/icons-material'
import { CSSTransition } from 'react-transition-group'
import '../../styles/SectionAnimations.css'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const auth = getAuth();

    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            navigate('/create/character-select');
        })
    };
    const emailChanged = (e: any) => {
        setEmail(e.target.value)
    };
    const passwordChanged = (e: any) => {
        setPassword(e.target.value)
    };
    const handleClickLogin = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setError(false)
            navigate('/create/character-select')
        })
        .catch((error) => {
            console.log(error.message)
            if (error.message === 'Firebase: Error (auth/invalid-email).') {
                alert('login failed')
                setError(true)
            }
        });
    }

    return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade"
        unmountOnExit={true}>
        <div className='login-screen-container'>
                <div className='login-content-container'>
                        <SignInText error={error}/>
                        <EmailInput emailChanged={emailChanged} email={email}/>
                        <PasswordInput password={password} passwordChanged={passwordChanged} />
                        <SignInButton handleClickLogin={handleClickLogin} />
                        <AlternateSignInMethods signInWithGoogle={signInWithGoogle}/>
                        <CreateAccount />
                </div>
        </div>
        </CSSTransition>
    )
}

function SignInText(props: any) {
    return (
        <div className='login-signIn-text-container'>
                <div className='login-text'>
                        Sign In
                </div>
                {props.error === true ? (
                    <div className='login-error-container'>
                        <div className='login-error-icon'>
                                <Error style={{ color: 'red', fontSize: '15px'}}/>
                        </div>
                        <div className='login-error-text'>
                                Invalid username or password
                        </div>
                    </div>
                ):(
                    <div></div>
                )}
        </div>
    )
}

function EmailInput(props: any) {
    return (
        <div className='login-input-container'>
                <input className='login-email-input'
                    type="text" 
                    placeholder='Jared@mungomash.com'
                    onChange={props.emailChanged}
                    value={props.email}/>
        </div>
    )
}

function PasswordInput(props: any) {
    return (
        <div className='login-input-container'>
                <input className='login-password-input'
                    type="password" 
                    placeholder='Password'
                    onChange={props.passwordChanged}
                    value={props.password}/>
        </div>
    )
}

function SignInButton(props: any) {
    return (
        <div className='login-sign-in-button-container'>
                <button className='login-sign-in-button'
                    onClick={props.handleClickLogin}>
                        Sign In
                </button>
                <div className='login-or-container'>
                    <div className='login-bar'></div>
                    <div>or</div>
                    <div className='login-bar'></div>
                </div>
        </div>
    )
}

function AlternateSignInMethods(props: any) {
    return (
        <div className='login-alternate-login-container'>
                <div className='login-alternate-login'>
                        <Facebook />
                </div>
                <div className='login-alternate-login'>
                        <Google onClick={props.signInWithGoogle} />
                </div>
                <div className='login-alternate-login'>
                        <GitHub />
                </div>
        </div>
    )
}

function CreateAccount() {
    return (
        <div className='login-create-account-container'>
                <div className='login-no-account-text'>
                        Don't have an account?
                </div>
                <div className='login-create-new-account-text'>
                        <Link to={'/signUp'} style={{color: 'white'}}>Create new one</Link>
                </div>
        </div>
    )
}

export default LoginPage