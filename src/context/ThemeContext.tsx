import { createContext, ReactNode, useEffect, useState } from "react"

const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedPrefs = window.localStorage.getItem("current-theme")
        if (typeof storedPrefs === "string") {
            return storedPrefs
        }
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark"
        }
    }
    return "light"
}

type PropsContext = {
    theme: string
    setTheme: (theme: string) => void
}

export const ThemeContext = createContext({} as PropsContext)

interface Props {
    children: ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
    const initialTheme = getInitialTheme()
    const [theme, setTheme] = useState(getInitialTheme)
    const checkTheme = (existing: string) => {
        const root = window.document.documentElement
        const isDark = existing === "dark"

        root.classList.remove(isDark ? "light" : "dark")
        root.classList.add(existing)

        localStorage.setItem("current-theme", existing)
    }

    if (initialTheme) {
        checkTheme(initialTheme)
    }

    useEffect(() => {
        checkTheme(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
