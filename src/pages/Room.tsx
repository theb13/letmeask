import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../components/Button"
import logo from "../assets/images/logo.svg"
import { RoomCode } from "../components/RoomCode"
import useAuth from "../hooks/useAuth"
import { database } from "../service/firebase"
import { Questions } from "../components/Questions"
import { useRoom } from "../hooks/useRoom"

type RoomParams = { id: string }

const StyledButton = styled.button`
    transition: filter 0.2;

    &.like-button {
        display: flex;
        align-items: flex-end;
        gap: 0.25rem;
        color: #737380;
        &.liked {
            color: #835afd;
            svg path {
                stroke: #835afd;
            }
        }
    }
    :hover {
        filter: brightness(0.7);
    }
`

export function Room() {
    const { id } = useParams<RoomParams>()
    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = useState("")
    const { questions, title } = useRoom(id)

    async function handleLikeQuestion(
        questionId: string,
        likeId: string | undefined
    ) {
        if (likeId) {
            await database
                .ref(`rooms/${id}/questions/${questionId}/likes/${likeId}`)
                .remove()
        } else {
            await database
                .ref(`rooms/${id}/questions/${questionId}/likes`)
                .push({
                    authorId: user?.id,
                })
        }
    }

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === "") return

        if (!user) {
            throw new Error("You must be logged in")
        }
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted: false,
            isAnswered: false,
        }

        await database.ref(`rooms/${id}/questions`).push(question)
        setNewQuestion("")
    }

    return (
        <div>
            <header className="p-8 border-b border-gray-200">
                <div className="max-w-screen-xl flex mx-auto justify-between items-center">
                    <img className="max-h-11" src={logo} alt="leatmeask" />
                    <RoomCode code={id} />
                </div>
            </header>
            <main className="max-w-3xl mx-auto">
                <div className="mt-8 mb-5 mx-6 flex items-center">
                    <h1 className="font-pop text-3xl text-gray-800 font-bold">
                        Sala#{title}
                    </h1>
                    {questions.length > 0 && (
                        <span
                            className="ml-4 bg-pink-500 rounded-full py-1 px-4 text-white
                        font-medium text-xs"
                        >
                            {questions.length} pergunta(s)
                        </span>
                    )}
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea
                        className="w-full rounded-lg bg-white-200 min-h-1 resize-y
                                    p-3  shadow"
                        placeholder="O que voçe quer perguntar"
                        value={newQuestion}
                        onChange={(event) => setNewQuestion(event.target.value)}
                    />
                    <div className="flex justify-between items-center mt-4">
                        {user ? (
                            <div className="flex items-center ">
                                <img
                                    className="w-10 rounded-full"
                                    src={user.avatar}
                                    alt={user.name}
                                />
                                <span className="ml-3 text-gray-700 font-medium text-sm">
                                    {user.name}
                                </span>
                            </div>
                        ) : (
                            <span className="font-medium text-gray-600 text-xs">
                                Para fazer uma pergunta{" "}
                                <button
                                    className="text-purple-600 text-xs"
                                    type="button"
                                >
                                    faça o login
                                </button>
                                .
                            </span>
                        )}
                        <Button disabled={!user} type="submit">
                            Enviar Pergunta
                        </Button>
                    </div>
                </form>
                <div className="flex mt-8 flex-col gap-y-4">
                    {questions.map((question) => {
                        return (
                            <Questions
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <StyledButton
                                    type="button"
                                    className={`like-button ${
                                        question.likeId && "liked"
                                    }`}
                                    onClick={() =>
                                        handleLikeQuestion(
                                            question.id,
                                            question.likeId
                                        )
                                    }
                                >
                                    {question.likeCount > 0 && (
                                        <span>{question.likeCount}</span>
                                    )}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                                            stroke="#737380"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </StyledButton>
                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
