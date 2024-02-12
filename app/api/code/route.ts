import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env["OPEN_AI_SECRET_KEY"]
});

const instruction = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use comments for better understanding",
}

export async function POST(req: Request) {
    try {
        
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }
        if (!openai) {
            new NextResponse("Api key not configured", { status: 500 })
        }

        if (!messages) {
            new NextResponse("Messages are required", { status: 400 })
        }

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages:  [instruction, ...messages],
            model: 'gpt-3.5-turbo',
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
        
        return NextResponse.json(chatCompletion.choices[0].message);

    } catch (error) {
        console.log("[CODE ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}