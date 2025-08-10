import { create } from 'zustand';

export type CompletionStatusFilter = 'completed' | 'notCompleted'
export type DueDateFilter = 'overdue' | 'dueToday' | 'dueThisWeek' | 'dueLater' | 'upcoming'

export type SortDirection = 'asc' | 'desc'
export type SortField = 'timeRemaining' | 'alphabetical' | 'createdAt' | 'updatedAt'

interface FilterSortState {
    completionStatus: CompletionStatusFilter[];
    dueDate: DueDateFilter[];
    sortDirection: SortDirection;
    sortField: SortField;
    toggleCompletionStatus: (status: CompletionStatusFilter) => void;
    toggleDueDate: (filter: DueDateFilter) => void;
    setSortDirection: (direction: SortDirection) => void;
    setSortField: (field: SortField) => void;
    resetFilters: () => void;
    resetSorting: () => void;
}

export const DEFAULT_COMPLETION_STATUS: CompletionStatusFilter[] = ['notCompleted']
export const DEFAULT_DUE_DATE: DueDateFilter[] = ['dueToday', 'dueThisWeek', 'dueLater']
export const DEFAULT_SORT_DIRECTION: SortDirection = 'asc'
export const DEFAULT_SORT_FIELD: SortField = 'timeRemaining'

export const useFilterSort = create<FilterSortState>((set) => ({
    completionStatus: DEFAULT_COMPLETION_STATUS,
    dueDate: DEFAULT_DUE_DATE,
    sortDirection: DEFAULT_SORT_DIRECTION,
    sortField: DEFAULT_SORT_FIELD,

    toggleCompletionStatus: (status) => 
        set((state) => ({
            completionStatus: state.completionStatus.includes(status) 
                ? state.completionStatus.filter((s) => s !== status)
                : [...state.completionStatus, status],
        })),
    toggleDueDate: (filter) =>
        set((state) => ({
            dueDate: state.dueDate.includes(filter)
                ? state.dueDate.filter((f) => f !== filter)
                : [...state.dueDate, filter],
        })),
    setSortDirection: (direction) => set({ sortDirection: direction }),
    setSortField: (field) => set({ sortField: field }),
    resetFilters: () =>
        set({
            completionStatus: ['notCompleted'],
            dueDate: ['dueToday', 'dueThisWeek', 'dueLater'],
        }),
    resetSorting: () =>
        set({
            sortDirection: 'asc',
            sortField: 'timeRemaining',
        }),
})) 