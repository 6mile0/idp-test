import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { app } from "../../../client/firebase/auth";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


export default function GoogleLogin(){
    const auth = getAuth(app);
    return <button onClick={() => {signInWithRedirect(auth, provider)}}>Google Login</button>
}
