"use client"

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";




interface TitleFormProps {
    initialData: {
        title: string
    },
    courseId: string;
    chapterId: String
}
const formSchema = z.object({
    title: z.string().min(1)
});
const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId
}: TitleFormProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const { isSubmitting, isValid } = form.formState;

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
                Chapter Title
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) :
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit title
                        </>
                    }
                </Button>
            </div>
            {!isEditing && (
                <p className="mt-2 text-sm">{initialData.title}</p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Introduction to the course"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            > Save</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default ChapterTitleForm;