"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Mock product database for search functionality
const productDatabase = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 150,
    category: "Pain Relief",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    price: 200,
    category: "Pain Relief",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: 3, name: "Cetirizine 10mg", price: 180, category: "Allergy", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Loratadine 10mg", price: 250, category: "Allergy", image: "/placeholder.svg?height=200&width=200" },
  {
    id: 5,
    name: "Amoxicillin 500mg",
    price: 350,
    category: "Antibiotics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Digital Thermometer",
    price: 1200,
    category: "Devices",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Blood Pressure Monitor",
    price: 4500,
    category: "Devices",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: 8, name: "First Aid Kit", price: 1500, category: "First Aid", image: "/placeholder.svg?height=200&width=200" },
  { id: 9, name: "Vitamin C 1000mg", price: 600, category: "Vitamins", image: "/placeholder.svg?height=200&width=200" },
  {
    id: 10,
    name: "Multivitamin Complex",
    price: 800,
    category: "Vitamins",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 11,
    name: "Hand Sanitizer",
    price: 250,
    category: "Personal Care",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 12,
    name: "Face Masks (50 pack)",
    price: 750,
    category: "Personal Care",
    image: "/placeholder.svg?height=200&width=200",
  },
]

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  products?: typeof productDatabase
  isAccountCreation?: boolean
}

interface SuggestedPrompt {
  id: string
  text: string
  category: "symptoms" | "medications" | "services" | "general" | "shopping"
}

interface RasaChatbotProps {
  onClose: () => void
}

export default function RasaChatbot({ onClose }: RasaChatbotProps) {
  const { addToCart } = useCart()
  const { user, register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      text: "Hello! I'm MedSymBot, your medical assistant. I can help you find medications, answer health questions, or even shop for you. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    email: "",
    password: "",
    step: 0,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Suggested prompts that users can click on
  const suggestedPrompts: SuggestedPrompt[] = [
    { id: "headache", text: "I have a headache, what can I take?", category: "symptoms" },
    { id: "fever", text: "What's good for fever?", category: "symptoms" },
    { id: "allergies", text: "Recommend allergy medication", category: "medications" },
    { id: "delivery", text: "How does delivery work?", category: "services" },
    { id: "prescription", text: "How do I upload a prescription?", category: "services" },
    { id: "payment", text: "What payment methods do you accept?", category: "services" },
    { id: "shop-for-me", text: "Shop for me", category: "shopping" },
    { id: "find-product", text: "Find a product", category: "shopping" },
  ]

  // Dynamically suggest prompts based on conversation context
  const [contextualPrompts, setContextualPrompts] = useState<SuggestedPrompt[]>([])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    // Update contextual prompts based on the last bot message
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]

      if (lastMessage.sender === "bot") {
        // Set contextual prompts based on the content of the last bot message
        if (lastMessage.text.toLowerCase().includes("headache") || lastMessage.text.toLowerCase().includes("pain")) {
          setContextualPrompts([
            { id: "pain-duration", text: "How long should I take pain medication?", category: "medications" },
            { id: "paracetamol", text: "Tell me more about Paracetamol", category: "medications" },
            {
              id: "ibuprofen",
              text: "What's the difference between Paracetamol and Ibuprofen?",
              category: "medications",
            },
            { id: "buy-paracetamol", text: "Add Paracetamol to my cart", category: "shopping" },
          ])
        } else if (lastMessage.text.toLowerCase().includes("fever")) {
          setContextualPrompts([
            { id: "fever-children", text: "Fever medication for children", category: "medications" },
            { id: "fever-duration", text: "When should I see a doctor for fever?", category: "general" },
            { id: "buy-fever-med", text: "Add fever medication to my cart", category: "shopping" },
          ])
        } else if (lastMessage.text.toLowerCase().includes("allerg")) {
          setContextualPrompts([
            { id: "allergy-types", text: "Different types of allergy medications", category: "medications" },
            { id: "allergy-side-effects", text: "Side effects of antihistamines", category: "medications" },
            { id: "buy-allergy-med", text: "Add allergy medication to my cart", category: "shopping" },
          ])
        } else if (lastMessage.text.toLowerCase().includes("prescription")) {
          setContextualPrompts([
            { id: "prescription-time", text: "How long does prescription processing take?", category: "services" },
            { id: "prescription-refill", text: "Can I get a prescription refill?", category: "services" },
            { id: "upload-now", text: "I want to upload a prescription now", category: "services" },
          ])
        } else if (
          lastMessage.text.toLowerCase().includes("delivery") ||
          lastMessage.text.toLowerCase().includes("shipping")
        ) {
          setContextualPrompts([
            { id: "delivery-time", text: "How long does delivery take?", category: "services" },
            { id: "delivery-cost", text: "Is there a delivery fee?", category: "services" },
            { id: "delivery-areas", text: "Which areas do you deliver to?", category: "services" },
          ])
        } else if (lastMessage.products && lastMessage.products.length > 0) {
          // If the last message contains product search results
          setContextualPrompts([
            { id: "more-details", text: "Tell me more about these products", category: "shopping" },
            { id: "cheaper-options", text: "Are there cheaper alternatives?", category: "shopping" },
            { id: "add-to-cart", text: "Add the first item to my cart", category: "shopping" },
          ])
        } else if (messages.length === 1) {
          // Initial suggested prompts
          setContextualPrompts(suggestedPrompts.slice(0, 4))
        } else {
          // Default prompts if no specific context is detected
          setContextualPrompts([
            { id: "find-product", text: "Find a product for me", category: "shopping" },
            { id: "shop-for-me", text: "Shop for me", category: "shopping" },
            { id: "health-advice", text: "I need health advice", category: "general" },
            { id: "account-help", text: "Help with my account", category: "services" },
          ])
        }
      }
    }
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // If we're in account creation mode, handle that flow
    if (isCreatingAccount) {
      handleAccountCreationFlow(text)
      return
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Handle product search requests
      if (
        text.toLowerCase().includes("find") ||
        text.toLowerCase().includes("search") ||
        text.toLowerCase().includes("looking for") ||
        text.toLowerCase().includes("where can i get")
      ) {
        await handleProductSearch(text)
      }
      // Handle shopping requests
      else if (
        text.toLowerCase().includes("shop for me") ||
        text.toLowerCase().includes("add to cart") ||
        text.toLowerCase().includes("buy") ||
        text.toLowerCase().includes("purchase")
      ) {
        await handleShoppingRequest(text)
      }
      // Handle account-related requests
      else if (
        text.toLowerCase().includes("account") ||
        text.toLowerCase().includes("sign up") ||
        text.toLowerCase().includes("register") ||
        text.toLowerCase().includes("login")
      ) {
        await handleAccountRequest(text)
      }
      // Otherwise, simulate a regular Rasa response
      else {
        await simulateRasaResponse(text)
      }
    } catch (error) {
      console.error("Error sending message to Rasa:", error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccountCreationFlow = (text: string) => {
    const step = accountDetails.step

    if (step === 0) {
      // Name step
      setAccountDetails({
        ...accountDetails,
        name: text,
        step: 1,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          text: text,
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: `bot-${Date.now()}`,
          text: "Great! Now, please enter your email address:",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } else if (step === 1) {
      // Email step
      if (!text.includes("@") || !text.includes(".")) {
        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            text: text,
            sender: "user",
            timestamp: new Date(),
          },
          {
            id: `bot-${Date.now()}`,
            text: "That doesn't look like a valid email address. Please enter a valid email:",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        return
      }

      setAccountDetails({
        ...accountDetails,
        email: text,
        step: 2,
      })

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          text: text,
          sender: "user",
          timestamp: new Date(),
        },
        {
          id: `bot-${Date.now()}`,
          text: "Almost done! Please create a password (at least 6 characters):",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } else if (step === 2) {
      // Password step
      if (text.length < 6) {
        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            text: "********", // Don't show actual password
            sender: "user",
            timestamp: new Date(),
          },
          {
            id: `bot-${Date.now()}`,
            text: "Your password needs to be at least 6 characters long. Please try again:",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
        return
      }

      setAccountDetails({
        ...accountDetails,
        password: text,
        step: 3,
      })

      // Create the account
      register(accountDetails.name, accountDetails.email, text).then((success) => {
        if (success) {
          setMessages((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              text: "********", // Don't show actual password
              sender: "user",
              timestamp: new Date(),
            },
            {
              id: `bot-${Date.now()}`,
              text: `Great! Your account has been created successfully. You're now logged in as ${accountDetails.name}. How else can I help you today?`,
              sender: "bot",
              timestamp: new Date(),
            },
          ])

          toast({
            title: "Account Created",
            description: "Your account has been created and you're now logged in.",
          })
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `user-${Date.now()}`,
              text: "********", // Don't show actual password
              sender: "user",
              timestamp: new Date(),
            },
            {
              id: `bot-${Date.now()}`,
              text: "I'm sorry, there was an issue creating your account. Please try again later or contact customer support.",
              sender: "bot",
              timestamp: new Date(),
            },
          ])
        }

        setIsCreatingAccount(false)
      })
    }
  }

  const handleProductSearch = async (query: string) => {
    setIsSearching(true)

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Extract search terms from the query
    const searchTerms = query
      .toLowerCase()
      .replace(/find|search|looking for|where can i get|do you have/g, "")
      .trim()

    // Search the product database
    const searchResults = productDatabase.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerms) || product.category.toLowerCase().includes(searchTerms),
    )

    let botResponse = ""

    if (searchResults.length > 0) {
      botResponse = `I found ${searchResults.length} products matching "${searchTerms}". Here are the results:`

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
          products: searchResults,
        },
      ])
    } else {
      botResponse = `I'm sorry, I couldn't find any products matching "${searchTerms}". Would you like to try a different search term?`

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }

    setIsSearching(false)
  }

  const handleShoppingRequest = async (text: string) => {
    // Check if it's a general shopping request or specific product
    if (text.toLowerCase().includes("shop for me")) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: "I'd be happy to shop for you! What items are you looking for today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
    // Handle adding specific products to cart
    else if (text.toLowerCase().includes("add") && text.toLowerCase().includes("cart")) {
      const productTerms = text
        .toLowerCase()
        .replace(/add|to my cart|to cart|buy|purchase/g, "")
        .trim()

      // Find matching products
      const matchingProducts = productDatabase.filter(
        (product) =>
          product.name.toLowerCase().includes(productTerms) || product.category.toLowerCase().includes(productTerms),
      )

      if (matchingProducts.length > 0) {
        // Add the first matching product to cart
        const productToAdd = matchingProducts[0]
        addToCart(productToAdd)

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: `I've added ${productToAdd.name} (Ksh ${productToAdd.price}) to your cart. Would you like to add anything else or proceed to checkout?`,
            sender: "bot",
            timestamp: new Date(),
          },
        ])

        toast({
          title: "Product Added",
          description: `${productToAdd.name} has been added to your cart.`,
        })
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: `I couldn't find a product matching "${productTerms}". Would you like me to search for something else?`,
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }
    }
    // Handle "add first item" from search results
    else if (text.toLowerCase().includes("add the first item") && messages.length > 0) {
      // Find the last message with products
      const lastProductMessage = [...messages].reverse().find((msg) => msg.products && msg.products.length > 0)

      if (lastProductMessage && lastProductMessage.products && lastProductMessage.products.length > 0) {
        const productToAdd = lastProductMessage.products[0]
        addToCart(productToAdd)

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: `I've added ${productToAdd.name} (Ksh ${productToAdd.price}) to your cart. Would you like to add anything else or proceed to checkout?`,
            sender: "bot",
            timestamp: new Date(),
          },
        ])

        toast({
          title: "Product Added",
          description: `${productToAdd.name} has been added to your cart.`,
        })
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: "I don't see any recent product search results. Would you like me to help you find a specific product?",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }
    }
    // Handle checkout request
    else if (text.toLowerCase().includes("checkout") || text.toLowerCase().includes("proceed to checkout")) {
      if (!user) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: "To proceed with checkout, you'll need to have an account. Would you like me to help you create an account now?",
            sender: "bot",
            timestamp: new Date(),
            isAccountCreation: true,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            text: "Great! I'll take you to the checkout page now.",
            sender: "bot",
            timestamp: new Date(),
          },
        ])

        // Redirect to checkout after a short delay
        setTimeout(() => {
          router.push("/checkout")
          onClose()
        }, 1000)
      }
    }
  }

  const handleAccountRequest = async (text: string) => {
    if (user) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: `You're already logged in as ${user.name}. Is there something specific about your account that you need help with?`,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } else if (
      text.toLowerCase().includes("create") ||
      text.toLowerCase().includes("register") ||
      text.toLowerCase().includes("sign up")
    ) {
      startAccountCreation()
    } else if (text.toLowerCase().includes("login") || text.toLowerCase().includes("sign in")) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: "To log in, I'll need to redirect you to our login page. Would you like to go there now?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])

      setContextualPrompts([
        { id: "go-to-login", text: "Yes, take me to login", category: "services" },
        { id: "create-account", text: "I need to create an account", category: "services" },
        { id: "cancel", text: "No, I'll continue browsing", category: "general" },
      ])
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text: "I can help you with account-related questions. Would you like to create a new account, log in to an existing account, or learn about account features?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])

      setContextualPrompts([
        { id: "create-account", text: "Create a new account", category: "services" },
        { id: "login", text: "Log in to my account", category: "services" },
        { id: "account-features", text: "Tell me about account features", category: "services" },
      ])
    }
  }

  const startAccountCreation = () => {
    setIsCreatingAccount(true)
    setAccountDetails({
      name: "",
      email: "",
      password: "",
      step: 0,
    })

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        text: "I'll help you create an account. First, please tell me your full name:",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const handlePromptClick = (promptText: string) => {
    // Handle special prompt actions
    if (promptText === "Yes, take me to login") {
      router.push("/login")
      onClose()
      return
    } else if (promptText === "Yes, take me to login") {
      router.push("/login")
      onClose()
      return
    } else if (promptText === "Create a new account" || promptText === "I need to create an account") {
      startAccountCreation()
      return
    }

    handleSendMessage(promptText)
  }

  // Simulate a response from Rasa
  const simulateRasaResponse = async (userInput: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let botResponse = ""

    // Simple keyword-based responses for demonstration
    const input = userInput.toLowerCase()

    if (input.includes("headache") || input.includes("pain")) {
      botResponse =
        "For headaches or general pain, I would recommend Paracetamol or Ibuprofen. Both are available over-the-counter at our pharmacy. Paracetamol 500mg costs Ksh 150 per pack, while Ibuprofen 400mg is Ksh 200. Would you like me to add either to your cart?"
    } else if (input.includes("fever") || input.includes("temperature")) {
      botResponse =
        "For fever, Paracetamol is often recommended. It helps reduce temperature and relieve discomfort. We have Paracetamol 500mg available for Ksh 150 per pack. Make sure to stay hydrated as well. Would you like me to tell you more about fever management?"
    } else if (input.includes("cough") || input.includes("cold")) {
      botResponse =
        "For coughs and colds, we have several options including cough syrups starting from Ksh 300, lozenges from Ksh 150, and decongestants from Ksh 250. The best treatment depends on your specific symptoms. Could you tell me more about your symptoms?"
    } else if (input.includes("allergy") || input.includes("allergic")) {
      botResponse =
        "For allergies, antihistamines like Cetirizine (Ksh 180) or Loratadine (Ksh 250) can help relieve symptoms. These are available over-the-counter at our pharmacy. Would you like more information about allergy medications?"
    } else if (input.includes("prescription") || input.includes("upload")) {
      botResponse =
        "You can upload your prescription through our website. Go to the 'Prescriptions' section in your account, and you'll find an option to upload a photo or scan of your prescription. Our pharmacists will review it and process your order within 24 hours."
    } else if (input.includes("delivery") || input.includes("shipping")) {
      botResponse =
        "We offer same-day delivery in Nairobi and next-day delivery to most other locations in Kenya. Delivery is free for orders over Ksh 5,000. Standard delivery fee is Ksh 250 within Nairobi and Ksh 500 for other regions. Would you like to know more about our delivery options?"
    } else if (input.includes("payment")) {
      botResponse =
        "We accept multiple payment methods including M-Pesa, credit/debit cards, and PayPal. You can choose your preferred payment method during checkout. M-Pesa is our most popular payment option in Kenya."
    } else if (input.includes("thank")) {
      botResponse = "You're welcome! Is there anything else I can help you with today?"
    } else if (input.includes("hello") || input.includes("hi")) {
      botResponse = "Hello! How can I assist you with your health needs today?"
    } else if (input.includes("account features") || input.includes("account benefits")) {
      botResponse =
        "With a MedExpress account, you can track your orders, save your prescription information, set up medication reminders, access your order history, and enjoy faster checkout. Your personal information is kept secure and confidential."
    } else {
      botResponse =
        "I'm not sure I understand. Could you provide more details about your symptoms or what medication you're looking for? Or would you like me to help you find a specific product?"
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  // Render product search results
  const renderProductResults = (products: typeof productDatabase) => {
    return (
      <div className="grid grid-cols-1 gap-2 mt-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center p-2 bg-white rounded border">
            <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
            <div className="text-sm font-semibold">Ksh {product.price}</div>
            <Button
              size="sm"
              variant="ghost"
              className="ml-2"
              onClick={() => {
                addToCart(product)
                toast({
                  title: "Product Added",
                  description: `${product.name} has been added to your cart.`,
                })
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    )
  }

  // Render account creation prompt
  const renderAccountCreationPrompt = () => {
    return (
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-sm text-gray-600">Would you like to:</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={() => startAccountCreation()}
          >
            <User className="h-4 w-4 mr-2" />
            Create Account
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={()={() => {
              router.push('/login')
              onClose()
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center mr-2">
            <span className="text-teal-600 font-semibold">M</span>
          </div>
          <div>
            <h3 className="font-semibold">MedSymBot</h3>
            <p className="text-xs text-muted-foreground">Medical Symptoms Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.text}
              {message.products && message.products.length > 0 && renderProductResults(message.products)}
              {message.isAccountCreation && renderAccountCreationPrompt()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
              {isSearching ? (
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-2 animate-pulse" />
                  <span>Searching products...</span>
                </div>
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Suggested prompts section */}
      {contextualPrompts.length > 0 && !isLoading && !isCreatingAccount && (
        <div className="px-4 py-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {contextualPrompts.map((prompt) => (
              <Button
                key={prompt.id}
                variant="outline"
                size="sm"
                className="text-xs py-1 h-auto bg-gray-50 hover:bg-gray-100 text-gray-700"
                onClick={() => handlePromptClick(prompt.text)}
              >
                {prompt.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
          <Input
            placeholder={isCreatingAccount ? "Type your response..." : "Type your symptoms or question..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
            type={isCreatingAccount && accountDetails.step === 2 ? "password" : "text"}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

