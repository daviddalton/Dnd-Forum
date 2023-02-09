import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import '../components/styles/signUp.css'
import { Error, Facebook, GitHub, Google } from '@mui/icons-material'



function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypePassoword, setRetypePassword] = useState('')
    const [error, setError] = useState(false)
    const auth = getAuth()
    const navigate = useNavigate()

    const createNewUser = async () => {
        if (password === retypePassoword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                signInWithEmailAndPassword(auth, email, password)
                navigate('/create')
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            setError(true)
        }
    }

    const signUpWithGoogle = async () => {

        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid);
            navigate('/create');
        })
        .catch(error => {
            console.log(error)
        })
    }
    const emailChanged = (e: any) => {
        setEmail(e.target.value)
    };
    const passwordChanged = (e: any) => {
        setPassword(e.target.value)
    }
    const retypePasswordChanged = (e: any) => {
        setRetypePassword(e.target.value)
    };
    return(
        <div className="sign-up-screen">
                <div className="sign-up-content-container">
                        <SignUp error={error}/>
                        <EmailSignUp emailChanged={emailChanged} email={email}/>
                        <PasswordSignUp passwordChanged={passwordChanged} password={password}/>
                        <ReTypePasswordSignUp retypePasswordChanged={retypePasswordChanged} retypePassoword={retypePassoword} />
                        <SignUpButton createNewUser={createNewUser}/>
                        <AlternateSignInMethods signUpWithGoogle={signUpWithGoogle}/>
                        <AlreadyHaveAccount />
                </div>
        </div>
    )
}

function SignUp(props: any) {
    return (
        <div className="sign-up-title-container">
                <div className="sign-up-title-text">
                        Sign Up
                </div>
                {props.error === true ? (
                    <div className='sign-up-error-container'>
                        <div className="sign-up-error-icon-container">
                                <Error style={{color: 'red', fontSize: '15px'}}/>
                        </div>
                        <div className="sign-up-error-text">
                                Passwords do not match
                        </div>
                    </div>
                ):(
                    <div></div>
                )}
        </div>
    )
}
function EmailSignUp(props: any) {
    return (
        <div className="sign-up-input-container">
                <input
                    className="sign-up-input"
                    type="text"
                    placeholder="Jared@mungomash.com"
                    onChange={props.emailChanged}
                    value={props.email}
                />
        </div>
    )
}
function PasswordSignUp(props: any) {
    return (
        <div className="sign-up-input-container">
                <input
                    className="sign-up-input"
                    type="password"
                    placeholder="password"
                    onChange={props.passwordChanged}
                    value={props.password}
                />
        </div>
    )
}
function ReTypePasswordSignUp(props: any) {
    return (
        <div className="sign-up-input-container">
            <input
                className="sign-up-input"
                type="password"
                placeholder="retype password"
                onChange={props.retypePasswordChanged}
                value={props.retypePassoword}
            />
    </div>
    )
}
function SignUpButton(props: any) {
    return (
        <div className="sign-up-button-container">
                <button 
                    className="sign-up-button"
                    onClick={props.createNewUser}>
                    Sign Up
                </button>
                <div className='sign-up-or-container'>
                    <div className='sign-up-bar'></div>
                    <div>or</div>
                    <div className='sign-up-bar'></div>
                </div>
        </div>
    )
}
function AlternateSignInMethods(props: any) {
    return (
        <div className='sign-up-alternate-login-container'>
                <div className='sign-up-alternate-login'>
                        <Facebook />
                </div>
                <div className='sign-up-alternate-login'>
                        <Google onClick={props.signUpWithGoogle} />
                </div>
                <div className='sign-up-alternate-login'>
                        <GitHub />
                </div>
        </div>
    )
}
function AlreadyHaveAccount() {
    return (
        <div className="sign-up-have-account-container">
                <div className="sign-up-have-account-text">
                        Already have and account?
                </div>
                <div className="sign-up-sign-in-here-text">
                        <Link to={'/login'} style={{color: "white"}}>Sign in here</Link>
                </div>
        </div>
    )
}
export default SignUpPage