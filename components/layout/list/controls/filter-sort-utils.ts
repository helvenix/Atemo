import type { Task, Event } from "@/components/layout/list/type"
import type { 
    CompletionStatusFilter, 
    DueDateFilter, 
    SortDirection, 
    SortField 
} from '@/components/layout/list/controls/filter-sort-state' 

/* ---------- small date helpers ---------- */
const toDate = (v?: string | Date | null) => (v ? (v instanceof Date ? v : new Date(v)) : null);

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDueTodayDate(date: Date | null, now: Date) {
    if (!date) return false;
    return isSameDay(date, now);
}

function isOverdueDate(date: Date | null, now: Date) {
    if (!date) return false;
    return date.getTime() < now.getTime();
}

function isWithinNDays(date: Date | null, now: Date, n: number) {
    if (!date) return false;
    const diff = date.getTime() - now.getTime();
    return diff >= 0 && diff <= n * 24 * 60 * 60 * 1000;
}

/* ---------- Task filtering (typed) ---------- */
/*
 Rules:
 - completionStatus: multi-select ['completed'|'notCompleted']
 - dueDate multi-select:
   - overdue: deadline < now
   - dueToday: deadline is today
   - dueThisWeek: deadline within next 7 days (including today)
   - dueLater: deadline after 7 days AND (task already started OR start is undefined)
   - upcoming: start > now (task not started yet)
 - If a filter array is empty => we treat it as "no restriction" (show all for that category)
*/
export function filterTasks(
    items: Task[],
    completionStatus: CompletionStatusFilter[],
    dueDateFilters: DueDateFilter[],
    now = new Date()
){
    // if completionStatus empty => allow both
    const completionAll = !completionStatus || completionStatus.length === 0;
    const dueDateAll = !dueDateFilters || dueDateFilters.length === 0;

    return items.filter((t) => {
        const completed = Boolean(t.completedStatus);
        if (!completionAll && !completionStatus.includes(completed ? "completed" : "notCompleted")) {
            return false;
        }

        if (dueDateAll) return true;

        const start = toDate(t.start);
        const deadline = toDate(t.deadline);

        // a task matches if it matches ANY of the selected dueDateFilters
        const matchesAny = dueDateFilters.some((f) => {
            switch (f) {
                case "overdue":
                    return !completed && isOverdueDate(deadline, now);
                case "dueToday":
                    return isDueTodayDate(deadline, now);
                case "dueThisWeek":
                    return isWithinNDays(deadline, now, 7);
                case "dueLater": {
                    if (!deadline) return false;
                    const afterWeek = deadline.getTime() > now.getTime() + 7 * 24 * 60 * 60 * 1000;
                    const started = !start || start.getTime() <= now.getTime();
                    return afterWeek && started;
                }
                case "upcoming":
                    return !!start && start.getTime() > now.getTime();
                default:
                    return false;
            }
        });

        return matchesAny;
    });
}

/* ---------- Event filtering (typed) ----------
We map "completed" <-> dismissed for events:
- completed => dismissed === true
- notCompleted => dismissed === false
Due date checks are applied to event.start.
*/
export function filterEvents(
    items: Event[],
    completionStatus: CompletionStatusFilter[],
    dueDateFilters: DueDateFilter[],
    now = new Date()
){
    const completionAll = !completionStatus || completionStatus.length === 0;
    const dueDateAll = !dueDateFilters || dueDateFilters.length === 0;

    return items.filter((e) => {
        const dismissed = Boolean(e.dismissed);
        if (!completionAll) {
            const matchesCompletion = completionStatus.some((s) => (s === "completed" ? dismissed : !dismissed));
            if (!matchesCompletion) return false;
        }

        if (dueDateAll) return true;

        const start = toDate(e.start);

        const matchesAny = dueDateFilters.some((f) => {
            switch (f) {
                case "overdue":
                    return start ? start.getTime() < now.getTime() && !dismissed : false;
                case "dueToday":
                    return start ? isDueTodayDate(start, now) : false;
                case "dueThisWeek":
                    return start ? isWithinNDays(start, now, 7) : false;
                case "dueLater":
                    return start ? start.getTime() > now.getTime() + 7 * 24 * 60 * 60 * 1000 : false;
                case "upcoming":
                    return start ? start.getTime() > now.getTime() : false;
                default:
                    return false;
            }
        });

        return matchesAny;
    });
}

/* ---------- Sorting ---------- */
function compareStrings(a?: string, b?: string) {
    if (!a && !b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    return a.localeCompare(b);
}

export function sortTasks(items: Task[], field: SortField, dir: SortDirection, now = new Date()) {
    const factor = dir === "asc" ? 1 : -1;
    return [...items].sort((a, b) => {
        let cmp = 0;
        switch (field) {
        case "timeRemaining": {
            const da = toDate(a.deadline);
            const db = toDate(b.deadline);
            const ra = da ? da.getTime() - now.getTime() : Number.POSITIVE_INFINITY;
            const rb = db ? db.getTime() - now.getTime() : Number.POSITIVE_INFINITY;
            cmp = ra - rb;
            break;
        }
        case "alphabetical":
            cmp = compareStrings(a.title, b.title);
            break;
        case "createdAt":
            cmp = (toDate(a['createdAt'])?.getTime() ?? 0) - (toDate(b['createdAt'])?.getTime() ?? 0);
            break;
        case "updatedAt":
            cmp = (toDate(a['updatedAt'])?.getTime() ?? 0) - (toDate(b['updatedAt'])?.getTime() ?? 0);
            break;
        }
        if (cmp === 0) return a._id.localeCompare(b._id) * factor;
        return cmp * factor;
    });
}

export function sortEvents(items: Event[], field: SortField, dir: SortDirection, now = new Date()) {
    const factor = dir === "asc" ? 1 : -1;
    return [...items].sort((a, b) => {
        let cmp = 0;
        switch (field) {
        case "timeRemaining": {
            const sa = toDate(a.start);
            const sb = toDate(b.start);
            const ra = sa ? sa.getTime() - now.getTime() : Number.POSITIVE_INFINITY;
            const rb = sb ? sb.getTime() - now.getTime() : Number.POSITIVE_INFINITY;
            cmp = ra - rb;
            break;
        }
        case "alphabetical":
            cmp = compareStrings(a.title, b.title);
            break;
        case "createdAt":
            cmp = (toDate(a['createdAt'])?.getTime() ?? 0) - (toDate(b['createdAt'])?.getTime() ?? 0);
            break;
        case "updatedAt":
            cmp = (toDate(a['updatedAt'])?.getTime() ?? 0) - (toDate(b['updatedAt'])?.getTime() ?? 0);
            break;
        }
        if (cmp === 0) return a._id.localeCompare(b._id) * factor;
        return cmp * factor;
    });
}

/* ---------- Combined helpers ---------- */
export function applyTaskFiltersAndSort(
    tasks: Task[],
    state: {
        completionStatus: CompletionStatusFilter[];
        dueDate: DueDateFilter[];
        sortField: SortField;
        sortDirection: SortDirection;
    },
    now = new Date()
){
    const filtered = filterTasks(tasks, state.completionStatus, state.dueDate, now);
    return sortTasks(filtered, state.sortField, state.sortDirection, now);
}

export function applyEventFiltersAndSort(
    events: Event[],
    state: {
        completionStatus: CompletionStatusFilter[];
        dueDate: DueDateFilter[];
        sortField: SortField;
        sortDirection: SortDirection;
    },
    now = new Date()
){
    const filtered = filterEvents(events, state.completionStatus, state.dueDate, now);
    return sortEvents(filtered, state.sortField, state.sortDirection, now);
}