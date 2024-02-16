import Replicate from "replicate";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

const replicate = new Replicate({
    auth: process.env.REPLICATE_SECRET_KEY
})

export async function POST(
    req: Request,
) {

    try {
        //"Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic"
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body


        if (!userId) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }
        if (!replicate) {
            new NextResponse("Api key not configured", { status: 500 })
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt: prompt
                }
            }
        );

        return NextResponse.json(response);
    } catch (error) {
        console.error(["MUSIC ERROR"], error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }


}