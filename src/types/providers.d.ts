import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";

type LoginMethod = "email" | "google" | "github" | "twitter" | "facebook" | "microsoft";

type LoginProvider = GoogleAuthProvider | OAuthProvider;

type ProviderLst = {
    name: string,
    provider: LoginProvider,
    scopes: string[]
}[];
