import { FormEvent, useContext, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"
import { Button } from "../components/Button"
import AuthAside from "../components/AuthAside"

import { AuthContext } from "../context/AuthContext"
import { database } from "../service/firebase"

const Separator = styled.div`
    ::before {
        content: "";
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-right: 1rem;
    }
    ::after {
        content: "";
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-left: 1rem;
    }
`

export function Home() {
    const history = useHistory()
    const { user, signWithGoogle } = useContext(AuthContext)

    const [roomCode, setRoomCode] = useState("")
    async function handleCreateRoom() {
        if (!user) {
            await signWithGoogle()
        }
        history.push("/rooms/new")
    }
    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()
        if (roomCode.trim() === "") return
        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        if (!roomRef.exists()) {
            alert("room does not exists!")
            return
        }
        if (roomRef.val().endedAt) {
            alert("room is alredy closed.")
            return
        }

        history.push(`/rooms/${roomCode}`)
    }
    return (
        <div className="flex items-stretch h-screen">
            <AuthAside />
            <main className="flex-auto flex justify-center items-center px-9 ">
                <div className="flex flex-col w-full max-w-xs items-stretch">
                    <img
                        className="self-center mb-12 "
                        src={logoImg}
                        alt="Letmeask"
                    />
                    <button
                        type="button"
                        onClick={handleCreateRoom}
                        className="mt-16 rounded bg-red-600 text-white flex
                        items-center justify-center cursor-pointer border-0 p-2 filter hover:brightness-90"
                    >
                        <img
                            className="mr-2"
                            src={googleIconImg}
                            alt="Logo do google "
                        />
                        Crie sua sala com o google
                    </button>
                    <Separator className="flex items-center text-gray-400 my-3 ">
                        ou entre em uma sala
                    </Separator>
                    <form
                        onSubmit={handleJoinRoom}
                        className="flex flex-col items-stretch"
                    >
                        <input
                            className="h-10 my-3 px-1 bg-white rounded border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-purple-400"
                            type="text"
                            placeholder="digite o codigo da sala"
                            value={roomCode}
                            onChange={(event) =>
                                setRoomCode(event.target.value)
                            }
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
