"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean
}
const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState<boolean>(false);
    const confetti = useConfettiStore();

    const onDelete = async () => {
        try {
            setIsloading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("Course Deleted");
            router.push(`/teacher/courses`)
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsloading(false)
        }
    };

    const onPublish = async () => {
        try {
            setIsloading(true)
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published");
                confetti.onOpen()
            }

            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsloading(false)
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onPublish}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "publish"}
            </Button>
            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button
                    disabled={isLoading}
                    size="sm"
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>


        </div>
    );
}

export default Actions;