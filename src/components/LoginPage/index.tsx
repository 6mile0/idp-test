import { getAuth, getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { app } from "../../client/firebase/auth";
import Loading from "../../components/Loading";
import { LoginMethod } from "types/providers";
import EmailLogin from "../../components/Providers/Email";
import GoogleLogin from "../../components/Providers/Google";
import styles from "./style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const providerLst: LoginMethod[] = ["email", "google"];

function loginContainer(loginMethod: LoginMethod) {
    switch (loginMethod) {
        case "email":
            return <EmailLogin />
        case "google":
            return <GoogleLogin />
        default:
            return <></>
    }
}

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [loginMethodSelected, setLoginMethodSelected] = useState<LoginMethod | null>(null);

    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        getRedirectResult(auth).then((result) => {
            if (result?.user) {
                navigate('/result');
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
    },[]);

    if (loading) return <Loading />;

    return (
        <>
            <h1>Identity Platform PlayGround</h1>
            <div>
                <label>テナントID: </label>
                <input type="text" onChange={(e) => {
                    auth.tenantId = e.target.value;
                    console.log(auth.tenantId)
                }} />
            </div>
            <div>
                <label>ログイン方法: </label>
                <select onChange={(e) => {
                    const LoginProvider = providerLst.find(val => val === e.target.value);
                    if (LoginProvider) {
                        setLoginMethodSelected(LoginProvider);
                    }
                }
                }>
                    <option>選択してください</option>
                    {
                        providerLst.map((provider, key) => {
                            return <option key={key} value={provider}>{provider}</option>
                        })
                    }
                </select>
            </div>
            <div className={styles.login_container}>
                {
                    loginMethodSelected && loginContainer(loginMethodSelected)
                }
            </div>

            <ToastContainer />
        </>
    )

}
