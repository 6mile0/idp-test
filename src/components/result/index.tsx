import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { app } from "../../client/firebase/auth";
import { useNavigate } from "react-router";

export default function Result() {
    const [loginedUser, setLoginedUser] = useState<FirebaseUser | null>(null);
    const [token, setToken] = useState<string>("");
    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                const token = await user.getIdToken();
                setLoginedUser(user);
                setToken(token);
            } else {
                setLoginedUser(null);
                navigate('/');
            }
        })
    });

    return (
        <>
            <h1>Successful!</h1>
            {loginedUser?.tenantId && <p>テナントID: {loginedUser?.tenantId}</p>}
            {loginedUser?.uid && <p>ユーザーID: {loginedUser?.uid}</p>}
            {token && <p>JWTトークン: {token}</p>}

            <h2>ログイン情報</h2>
            {loginedUser?.displayName && <p>ユーザー名: {loginedUser?.displayName}</p>}
            {loginedUser?.email && <p>メールアドレス: {loginedUser?.email}</p>}
            {loginedUser?.phoneNumber && <p>電話番号: {loginedUser?.phoneNumber}</p>}
            {loginedUser?.photoURL && <p>プロフィール画像: <img src={loginedUser?.photoURL}/></p>}
            {loginedUser?.providerId && <p>プロバイダーID: {loginedUser?.providerId}</p>}
            {loginedUser?.metadata.creationTime && <p>作成日時: {loginedUser?.metadata.creationTime}</p>}


            <button onClick={() => { auth.signOut() }}>Logout</button>
        </>
    )
}
