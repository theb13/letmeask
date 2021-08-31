import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    // eslint-disable-next-line react/require-default-props
    isOutlined?: boolean
}

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    const outline = isOutlined
        ? "bg-white border border-purple-600 text-purple-600 h-8  rounded-lg"
        : "bg-purple-600 text-white border-0  rounded"
    return (
        <button
            type="button"
            className={` flex
            items-center justify-center cursor-pointer  p-2
            transition duration-300 filter hover:brightness-90
            disabled:opacity-60 disabled:cursor-not-allowed ${outline}`}
            {...props}
        />
    )
}
