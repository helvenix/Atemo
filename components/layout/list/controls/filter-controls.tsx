import { useFilterSort } from "./filter-sort-state";

export function FilterControl(){
    const {
        completionStatus,
        dueDate,
        sortDirection,
        sortField,
        toggleCompletionStatus,
        toggleDueDate,
        setSortDirection,
        setSortField,
        resetFilters,
        resetSorting,
    } = useFilterSort();

    return (
    <div>
        {/* Completion Filter */}
        <button onClick={() => toggleCompletionStatus("completed")}>
            Completed {completionStatus.includes("completed") ? "✅" : ""}
        </button>
        <button onClick={() => toggleCompletionStatus("notCompleted")}>
            Not Completed {completionStatus.includes("notCompleted") ? "✅" : ""}
        </button>

        {/* Due Date Filter */}
        <button onClick={() => toggleDueDate("dueToday")}>
            Due Today {dueDate.includes("dueToday") ? "✅" : ""}
        </button>
        {/* Add others the same way */}

        {/* Sorting */}
        <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as any)}
        >
            <option value="timeRemaining">Time Remaining</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
        </select>

        <button onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}>
            {sortDirection === "asc" ? "⬆ Asc" : "⬇ Desc"}
        </button>
    </div>
    )
}