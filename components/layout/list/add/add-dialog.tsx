import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { AddTask } from './add-task'

export function AddDialog({setDialog} : {setDialog: React.Dispatch<React.SetStateAction<boolean>>}){
    return (
        <DialogContent className="rounded-none p-8 w-screen border-y-primary">
            <DialogHeader>
                <DialogTitle className="flex justify-center">
                    Add Task
                </DialogTitle>
            </DialogHeader>

            <AddTask setDialog={setDialog}/>
        </DialogContent>
    )
}