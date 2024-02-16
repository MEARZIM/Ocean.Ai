"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Music } from 'lucide-react';
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


const MusicPage = () => {

    const router = useRouter();
    const [music, setMusic] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setMusic("");

            const response = await axios.post('/api/music', values);
            
            setMusic(response.data.audio);

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
                title='Music'
                description='Our most Advanced Conversation Model'
                icon={Music}
                iconColor='text-emerald-500'
                bgColor='bg-emerald-500/10'
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
                    {music.length === 0 && !isLoading && (
                        <Empty label="No music is Generated" />
                    )}
                    {music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPage