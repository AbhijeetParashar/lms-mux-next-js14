"use client"

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";




interface ImageFormProps {
    initialData: Course,
    courseId: string
}
const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    })
});
const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated")
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
                Course Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && initialData?.imageUrl &&
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Image
                        </>
                    }
                    {!isEditing && !initialData?.imageUrl &&
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    }
                </Button>
            </div>
            {!isEditing && (
                !initialData?.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : <div className="relative aspect-video mt-2">
                    <Image
                        alt="upload"
                        fill
                        className="object-cover rounded-md"
                        src={initialData.imageUrl}
                    />
                </div>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                        endPoint="courseImage" />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageForm;