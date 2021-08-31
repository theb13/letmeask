import illustration from "../assets/images/illustration.svg"

export default function AuthAside() {
    return (
        <aside
            className="flex-1 bg-purple-600 text-white flex-col justify-center
        py-24 px-16 "
        >
            <img
                className="max-w-xs"
                src={illustration}
                alt="Inlustracao simbolizando perguntas e respostas"
            />
            <strong className="font-pop font-bold mt-1 text-2xl	 leading-10">
                Crie salas de Q&amp;A ao-vivo
            </strong>
            <p className="text-lg mt-1 text-gray-200	">
                tire as duvidas da sua audiência em tempo-real
            </p>
        </aside>
    )
}
