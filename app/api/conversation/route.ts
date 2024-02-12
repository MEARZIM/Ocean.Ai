import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPEN_AI_SECRET_KEY'], // This is the default and can be omitted
});


export async function POST(
    req: Request
  ) {
    try {
        
      const { userId } = auth();
      const body = await req.json();
      const { messages  } = body;

        if (!userId) {
            new NextResponse("UnAuthorized User", {status: 401})
        }
        if (!openai){
            new NextResponse("Api key not configured", {status: 500})
        }

        if (!messages) {
            new NextResponse("Messages are required", {status: 400})
        }

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: messages,
            model: 'gpt-3.5-turbo',
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
        // console.log(chatCompletion)
        return NextResponse.json(chatCompletion.choices[0].message);
    
    } catch (error) {
        console.log("[CONVERSATION ERROR]",error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}