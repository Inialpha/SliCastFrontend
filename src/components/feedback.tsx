import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"


interface AlertProps {
  message: string | undefined,
  status: string;
}

const Feedback: React.FC<AlertProps> = ({ message, status, className }: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={"w-full text-center bg-green-200" }>
            <div className={status}>
                    <p>{message}</p>
            </div>
        </div>
    )
};
export default Feedback;
