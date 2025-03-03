"use client"

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean
}
const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState<boolean>(false);


    const onDelete = async () => {
        try {
            setIsloading(true)
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter Deleted");
            router.push(`/teacher/courses/${courseId}`)
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
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("Chapter Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success("Chapter published");
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

export default ChapterActions;