import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from "../service/firebase"

type User = {
    id: string
    name: string
    avatar: string
}

type AuthContextType = {
    user: User | undefined
    signWithGoogle: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviverProps = {
    children: ReactNode
}

export function AuthContextProviver({ children }: AuthContextProviverProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                const { displayName, photoURL, uid } = userAuth
                if (!displayName || !photoURL)
                    throw new Error("Missing information from Google acount")

                setUser({ id: uid, name: displayName, avatar: photoURL })
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    async function signWithGoogle() {
        const proviver = new firebase.auth.GoogleAuthProvider()

        await auth.signInWithPopup(proviver).then((result) => {
            if (result.user) {
                const { displayName, photoURL, uid } = result.user
                if (!displayName || !photoURL)
                    throw new Error("Missing information from Google acount")

                setUser({ id: uid, name: displayName, avatar: photoURL })
            }
        })
    }
    return (
        <AuthContext.Provider value={{ user, signWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}
