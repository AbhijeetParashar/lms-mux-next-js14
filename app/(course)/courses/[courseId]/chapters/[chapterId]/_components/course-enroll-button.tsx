"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}
export const CourseEnrollButton = ({
    price,
    courseId
}: CourseEnrollButtonProps) => {
    const [isLoading, setIsloading] = useState(false);


    const onClick = async () => {
        try {
            setIsloading(true)
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            window.location.assign(response.data.url)
        } catch {
            toast.error("Something went erong")
        } finally {
            setIsloading(false)
        }
    }
    return (
        <Button
            className="w-full md:w-auto"
            size="sm"
            onClick={onClick}
            disabled={isLoading}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}