/* eslint-disable react/require-default-props */
import { ReactNode } from "react"
import cx from "classnames"

type QuestionsProps = {
    // id: string
    author: { name: string; avatar: string }
    content: string
    isAnswered?: boolean
    isHighLighted?: boolean
    children: ReactNode
}

export function Questions({
    author,
    content,
    children,
    isAnswered = false,
    isHighLighted = false,
}: QuestionsProps) {
    return (
        <div
            className={cx("bg-white rounded-lg shadow p-6", {
                "bg-gray-100 border border-purple-600":
                    isHighLighted && !isAnswered,
                "bg-gray-200": isAnswered,
            })}
        >
            <p className="text-gray-700">{content}</p>
            <footer>
                <div className="flex items-center  justify-between mt-6">
                    <div className="flex items-center">
                        <img
                            className="w-7 rounded-full"
                            src={author.avatar}
                            alt={author.name}
                        />
                        <span
                            className={cx("ml-3 text-gray-400 text-xs  ", {
                                "text-gray-700": isHighLighted,
                            })}
                        >
                            {author.name}
                        </span>
                    </div>
                    <div className="flex gap-2">{children}</div>
                </div>
            </footer>
        </div>
    )
}
