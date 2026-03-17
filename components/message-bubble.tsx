import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  content: string
  isUser: boolean
  timestamp?: string
}

export function MessageBubble({ content, isUser, timestamp }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[80%] space-y-1")}>
        <div
          className={cn(
            "rounded-3xl px-6 py-4 text-sm",
            isUser
              ? "bg-gradient-to-br from-[#C7B8FF] to-[#7C5CFF] text-white rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md",
          )}
        >
          {content}
        </div>
        {timestamp && <p className={cn("text-xs text-muted-foreground px-2", isUser && "text-right")}>{timestamp}</p>}
      </div>
    </div>
  )
}
