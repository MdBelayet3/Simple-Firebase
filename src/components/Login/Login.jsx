import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
const Login = () => {

    // auth and provider
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    // hooks
    const [user, setUser] = useState(null);

    //event handler function
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }
    const handleSignUpBtn = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleGitHubSignIn = () =>{
        signInWithPopup(auth,gitHubProvider)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error =>{
            console.log('error', error.message);
        })
    }

    return (
        <div>
            { user ?
            <button onClick={handleSignUpBtn}>Sign Out</button> :
            <div>
                <button onClick={handleGoogleSignIn}>Google SignIn</button>
                <button onClick={handleGitHubSignIn}>GitHub SignIn</button>
            </div>
            }
            {user &&
                <div>
                    <h3>User : {user.displayName}</h3>
                    <p>Email : {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>}
        </div>
    );
};

export default Login;