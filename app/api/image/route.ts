import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_SECRET_KEY'],
});


export async function POST(
    req: Request
) {
    try {

        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;


        if (!userId) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }
        if (!openai) {
            new NextResponse("Api key not configured", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const params = {
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        };
        const imageResponse = await openai.images.generate(params);

        return NextResponse.json(imageResponse.data);

    } catch (error) {
        console.log("[CONVERSATION ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}