"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormItem,
    FormControl,
    FormField,
} from '@/components/ui/form';
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

import { formSchema } from "./constant"
import Heading from '@/components/layouts/Heading/Heading'
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/layouts/Loader/Loader";
import { Empty } from "@/components/ui/empty";


const VideoPage = () => {

    const router = useRouter();
    const [video, setVideo] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setVideo("");

            const response = await axios.post('/api/video', values);
            
            setVideo(response.data[0]);

            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {

            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title='Video Generation'
                description='Our most Advanced Video Model'
                icon={VideoIcon}
                iconColor='text-orange-500'
                bgColor='bg-orange-500/10'
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 ">
                            <FormField
                                name="prompt"
                                render={({ field }) => {
                                    return (<FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do i help you?"
                                                {...field}
                                            />
                                        </FormControl>

                                    </FormItem>);
                                }}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}> Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-2 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {video.length === 0 && !isLoading && (
                        <Empty label="No video is Generated" />
                    )}
                    {video && (
                        <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPage 