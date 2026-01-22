import { ReactNode } from "react"

interface Column {
    header: string
    accessor?: string
    align?: "left" | "center" | "right"
    render?: (row: any) => ReactNode
}

interface TableProps {
    columns: Column[]
    data: any[]
    isLoading?: boolean
    emptyMessage?: string
    loadingMessage?: string
}

export default function Table({
    columns,
    data,
    isLoading = false,
    emptyMessage = "No data found.",
    loadingMessage = "Loading..."
}: TableProps) {
    const colSpan = columns.length

    return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase font-medium">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`px-6 py-4 ${column.align === "right" ? "text-right" :
                                        column.align === "center" ? "text-center" :
                                            "text-left"
                                    }`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {isLoading ? (
                        <tr>
                            <td colSpan={colSpan} className="px-6 py-8 text-center text-zinc-500">
                                {loadingMessage}
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={colSpan} className="px-6 py-8 text-center text-zinc-500">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`px-6 py-4 ${column.align === "right" ? "text-right" :
                                                column.align === "center" ? "text-center" :
                                                    "text-left"
                                            }`}
                                    >
                                        {column.render
                                            ? column.render(row)
                                            : column.accessor
                                                ? row[column.accessor]
                                                : null
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
