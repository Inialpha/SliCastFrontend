//import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function Feedback({variant = 'default', title, message}: {variant?: string, title?: string, message: string}) {
  variant;
  return (
    <Alert>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}

