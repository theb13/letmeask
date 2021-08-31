import { BrowserRouter } from "react-router-dom"
import Routes from "./config/Routes"
import { AuthContextProviver } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AuthContextProviver>
                    <Routes />
                </AuthContextProviver>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
