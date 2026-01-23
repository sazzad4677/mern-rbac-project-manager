import { ReactNode, useState, useMemo } from "react"
import { Button } from "./button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Select } from "./select"

interface Column {
    header: string
    accessor?: string
    align?: "left" | "center" | "right"
    render?: (row: any) => ReactNode
}

interface PaginationConfig {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalItems?: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

interface FilterConfig {
    placeholder?: string
    options?: { label: string; value: string }[]
}

interface TableProps {
    columns: Column[]
    data: any[]
    isLoading?: boolean
    emptyMessage?: string
    loadingMessage?: string
    pagination?: PaginationConfig
    searchable?: boolean
    searchPlaceholder?: string
    filterable?: FilterConfig
}

export default function Table({
    columns,
    data,
    isLoading = false,
    emptyMessage = "No data found.",
    loadingMessage = "Loading...",
    pagination,
    searchable = false,
    searchPlaceholder = "Search...",
    filterable
}: TableProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterValue, setFilterValue] = useState("")

    const colSpan = columns.length

    // Client-side filtering
    const filteredData = useMemo(() => {
        let result = data

        // Apply search filter
        if (searchable && searchQuery) {
            result = result.filter(row =>
                Object.values(row).some(value =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        }

        // Apply dropdown filter
        if (filterable && filterValue) {
            result = result.filter(row => {
                // Assuming filter is on 'status' field - make this configurable if needed
                return row.status === filterValue
            })
        }

        return result
    }, [data, searchQuery, filterValue, searchable, filterable])

    return (
        <div className="space-y-4">
            {/* Search & Filter Bar */}
            {(searchable || filterable) && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {searchable && (
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    )}
                    {filterable && (
                        <div className="w-full sm:w-48">
                            <Select
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                options={[
                                    { label: filterable.placeholder || "All", value: "" },
                                    ...(filterable.options || []).map(opt => ({ label: opt.label, value: opt.value }))
                                ]}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Table Container */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                {/* Scrollable Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase font-medium">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`px-6 py-4 whitespace-nowrap ${column.align === "right" ? "text-right" :
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
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={colSpan} className="px-6 py-8 text-center text-zinc-500">
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className={`px-6 py-4 whitespace-nowrap ${column.align === "right" ? "text-right" :
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

                {/* Pagination Footer */}
                {pagination && !isLoading && data.length > 0 && (
                    <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 px-6 py-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left">
                                {pagination.totalItems ? (
                                    <span>
                                        Showing {((pagination.currentPage - 1) * 10) + 1} to{" "}
                                        {Math.min(pagination.currentPage * 10, pagination.totalItems)} of{" "}
                                        {pagination.totalItems} results
                                    </span>
                                ) : (
                                    <span>
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                                    disabled={!pagination.hasPrevPage}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>

                                {/* Page Numbers - Hidden on mobile */}
                                <div className="hidden sm:flex items-center gap-1">
                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                                        .filter(pageNum => {
                                            // Show first page, last page, current page, and pages around current
                                            if (pageNum === 1 || pageNum === pagination.totalPages) return true
                                            if (Math.abs(pageNum - pagination.currentPage) <= 1) return true
                                            return false
                                        })
                                        .map((pageNum, index, array) => {
                                            // Add ellipsis if there's a gap
                                            const showEllipsisBefore = index > 0 && pageNum - array[index - 1] > 1

                                            return (
                                                <div key={pageNum} className="flex items-center gap-1">
                                                    {showEllipsisBefore && (
                                                        <span className="px-2 text-zinc-500">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => pagination.onPageChange(pageNum)}
                                                        className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${pageNum === pagination.currentPage
                                                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                                                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                </div>

                                {/* Mobile Page Indicator */}
                                <span className="text-sm font-medium sm:hidden">
                                    {pagination.currentPage} / {pagination.totalPages}
                                </span>

                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                                    disabled={!pagination.hasNextPage}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
