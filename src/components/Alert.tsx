//import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function Feedback({variant = '', title, message}: {variant?: string, title?: string, message: string}) {
  const classes = {
    success: "w-full text-center bg-green-200",
    error: "w-full text-center bg-red-200",
    warning: "w-full text-center bg-yellow-200",
  }
  const className = variant.length > 0 ? classes[variant] : classes["success"]
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;

  return (
    <Alert className={className}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}

