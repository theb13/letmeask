import copyImg from "../assets/images/copy.svg"

type RoomCodeProps = {
    code: string
}

export function RoomCode({ code }: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button
            type="button"
            className="flex h-8 border border-purple-600 rounded-lg overflow-hidden bg-white
            cursor-pointer "
            onClick={copyRoomCodeToClipboard}
        >
            <div className="bg-purple-600 px-3 flex justify-center items-center h-full">
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span className="block self-center flex-1 pl-4 pr-3 font-medium text-xs">
                sala #{code}
            </span>
        </button>
    )
}
