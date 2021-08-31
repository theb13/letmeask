import { FormEvent, useState } from "react"

import { Link, useHistory } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import AuthAside from "../components/AuthAside"
import { Button } from "../components/Button"
import { database } from "../service/firebase"
import useAuth from "../hooks/useAuth"

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState("")

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        if (newRoom.trim() === "") return

        const roomRef = database.ref("rooms")

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }
    return (
        <div className="flex items-stretch h-screen">
            <AuthAside />
            <main className="flex-auto flex justify-center items-center px-9 ">
                <div className="flex flex-col w-full max-w-xs items-stretch">
                    <img
                        className="self-center mb-12"
                        src={logoImg}
                        alt="Letmeask"
                    />
                    <h2 className="font-bold text-center text-xl font-pop">
                        Criar uma nova sala
                    </h2>
                    <form
                        onSubmit={handleCreateRoom}
                        className="flex flex-col items-stretch"
                    >
                        <input
                            className="h-10 my-3 px-1 bg-white border border-gray-300 w-full"
                            type="text"
                            placeholder="digite o nome da sala"
                            value={newRoom}
                            onChange={(event) => setNewRoom(event.target.value)}
                        />
                        <Button type="submit">Criar Sala</Button>
                    </form>
                    <p className="text-center text-sm text-grey-400 mt-4">
                        Quer entrar em uma sala existente?{" "}
                        <Link className="text-purple-600 underline " to="/">
                            Clique aqui
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
