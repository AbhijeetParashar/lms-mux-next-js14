"use client"

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Chapter, MuxData } from "@prisma/client";
import axios from "axios";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react"




interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null },
    courseId: string;
    chapterId: string
}
const formSchema = z.object({
    videoUrl: z.string().min(1)
});
const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated")
            toggleEdit();
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        }
    };

    const toggleEdit = () => {
        setIsEditing((current) => !current)
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && initialData?.videoUrl &&
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    }
                    {!isEditing && !initialData?.videoUrl &&
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a video
                        </>
                    }
                </Button>
            </div>
            {!isEditing && (
                !initialData?.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : <div className="relative aspect-video mt-2">
                    <MuxPlayer
                        playbackId={initialData.muxData?.playbackId || ""}
                    />
                </div>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url })
                            }
                        }}
                        endPoint="chapterVideo" />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapter&apos;s video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Video can take a few minutes to process.Refreh this page if video does not appear
                </div>
            )}
        </div>
    );
}

export default ChapterVideoForm;