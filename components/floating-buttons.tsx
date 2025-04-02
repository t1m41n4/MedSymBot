"use client"

import { Bot, MessageSquare, GitCompare } from "lucide-react"
import ShopForMeButton from "./shop-for-me/shop-for-me-button"
import { ComparisonFloatingButtonWrapper } from "./comparison/floating-button-wrapper"
import ChatbotButton from "./chatbot/chatbot-button"

export function FloatingButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-4 items-end">
      <ShopForMeButton />
      <ChatbotButton />
      <ComparisonFloatingButtonWrapper />
    </div>
  )
}
