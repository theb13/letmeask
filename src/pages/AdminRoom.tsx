import { useHistory, useParams } from "react-router-dom"
import { Button } from "../components/Button"
import logo from "../assets/images/logo.svg"
import { RoomCode } from "../components/RoomCode"
// import useAuth from "../hooks/useAuth"
import { Questions } from "../components/Questions"
import { useRoom } from "../hooks/useRoom"
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"
import { database } from "../service/firebase"

type RoomParams = { id: string }

export function AdminRoom() {
    const { id } = useParams<RoomParams>()
    // const { user } = useAuth()
    const { questions, title } = useRoom(id)
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${id}`).update({
            endedAt: new Date(),
        })
        history.push("/")
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza?")) {
            await database.ref(`rooms/${id}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAnswered(questionId: string) {
        await database
            .ref(`rooms/${id}/questions/${questionId}`)
            .update({ isAnswered: true })
    }
    async function handleHigthlightQuestion(questionId: string) {
        await database
            .ref(`rooms/${id}/questions/${questionId}`)
            .update({ isHighLighted: true })
    }

    return (
        <div>
            <header className="p-8 border-b border-gray-200">
                <div className="max-w-screen-xl flex mx-auto justify-between items-center">
                    <img className="max-h-11" src={logo} alt="leatmeask" />
                    <div className="flex gap-4">
                        <RoomCode code={id} />
                        <Button
                            onClick={() => {
                                handleEndRoom()
                            }}
                            isOutlined
                            style={{ padding: "0.4rem 2rem" }}
                        >
                            Encerrar Sala
                        </Button>
                    </div>
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
                <div className="flex mt-8 flex-col gap-y-4">
                    {questions.map((question) => {
                        return (
                            <Questions
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCheckQuestionAnswered(
                                                    question.id
                                                )
                                            }
                                        >
                                            <img
                                                src={checkImg}
                                                alt="Marcar pergunta como respondida"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleHigthlightQuestion(
                                                    question.id
                                                )
                                            }
                                        >
                                            <img
                                                src={answerImg}
                                                alt="Destacar pergunta"
                                            />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteQuestion(question.id)
                                    }
                                >
                                    <img
                                        src={deleteImg}
                                        alt="Remover pergunta"
                                    />
                                </button>
                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
