import Link from "next/link";

export interface ListItemProps {
    goto: string,
    text: string
}

const ListItem = ({ goto, text }: ListItemProps) => {
    return (
        <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <Link href={goto}>{text}</Link>
        </li>
    )
}

export { ListItem }
