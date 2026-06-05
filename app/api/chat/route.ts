import { NextResponse } from "next/server";
import {
  type ChatTurn,
  getGeminiAssistantReply,
  getLocalAssistantResponse,
} from "@/lib/greenworking-assistant";

export const runtime = "nodejs";

type ChatRequestBody = {
  message?: string;
  history?: ChatTurn[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = body.message?.trim();
    const history = Array.isArray(body.history) ? body.history.slice(-12) : [];

    if (!message || message.length > 2000) {
      return NextResponse.json(
        { error: "Mensaje inválido o demasiado largo." },
        { status: 400 }
      );
    }

    const aiReply = await getGeminiAssistantReply(history, message);
    const reply =
      aiReply ??
      getLocalAssistantResponse(message, history);

    return NextResponse.json({
      reply,
      mode: aiReply ? "gemini" : "local",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "Hubo un inconveniente técnico momentáneo. Por favor escribinos por WhatsApp: https://wa.me/541133709716 o a info@greenworking.com.ar",
        mode: "error",
      },
      { status: 500 }
    );
  }
}
