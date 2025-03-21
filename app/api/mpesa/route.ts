import { NextResponse } from "next/server"

// This would be your actual M-Pesa API integration
// For now, we're just simulating the response

export async function POST(req: Request) {
  try {
    const { phoneNumber, amount } = await req.json()

    // Validate phone number (simple validation for demo)
    if (!phoneNumber.match(/^(?:\+254|0)[17]\d{8}$/)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Format the phone number (remove leading 0, add country code if needed)
    // 2. Make a request to the M-Pesa API to initiate an STK push
    // 3. Return the response from M-Pesa

    // For demo purposes, we'll simulate a successful request
    return NextResponse.json({
      success: true,
      checkoutRequestID: "ws_CO_" + Date.now(),
      responseDescription: "Success. Request accepted for processing",
      customerMessage: "Please enter your M-Pesa PIN to complete the transaction",
    })
  } catch (error) {
    console.error("M-Pesa API error:", error)
    return NextResponse.json({ error: "Failed to process M-Pesa payment request" }, { status: 500 })
  }
}

