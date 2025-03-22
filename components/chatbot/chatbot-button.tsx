"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import RasaChatbot from "@/components/rasa-chatbot/rasa-chatbot"
import { useChatbot } from "@/context/chatbot-context"

const ChatbotButton = () => {
  const { isChatbotOpen, openChatbot, closeChatbot } = useChatbot()

  return (
    <>
      <Button
        className="fixed bottom-20 right-6 md:bottom-6 rounded-full h-14 w-14 shadow-lg bg-teal-600 hover:bg-teal-700"
        onClick={openChatbot}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open MedSymBot</span>
      </Button>

      {isChatbotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <RasaChatbot onClose={closeChatbot} />
        </div>
      )}
    </>
  )
}

export default ChatbotButton

