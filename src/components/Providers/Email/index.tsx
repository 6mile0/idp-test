import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../../../client/firebase/auth";
import { toast } from 'react-toastify';

export default function EmailLogin() {
    const navigate = useNavigate();
    const auth = getAuth(app);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function signIn(email: string, password: string) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential) {
                    navigate('/result');
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }

    return (
        <>
            <form>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </form>
            <button onClick={() => signIn(email, password)}>Login</button>
        </>
    )

}
