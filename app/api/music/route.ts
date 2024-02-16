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
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    alpha: 0.5,
                    prompt_a: prompt,
                    denoising: 0.75,
                    seed_image_id: "vibes",
                    num_inference_steps: 50
                }
            }
        );

        return NextResponse.json(response);

    } catch (error) {
        console.error(["MUSIC ERROR"],error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}