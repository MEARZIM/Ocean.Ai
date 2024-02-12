"use client"
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Code, Divide } from "lucide-react";
import  ReactMarkdown  from "react-markdown";

import { formSchema } from "./constant"
import Heading from '@/components/layouts/Heading/Heading'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/layouts/Loader/Loader";
import { BotAvatar } from "@/components/layouts/bot-avatar/BotAvatar";
import { UserAvatar } from "@/components/layouts/user-avatar/UserAvatar";
import { Empty } from "@/components/ui/empty";


const CodePage = () => {

    const router = useRouter();
    const [messages, setMessages] = useState<any>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const userMessage: any = { role: "user", content: values.prompt };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', { messages: newMessages });
            setMessages((current: any) => [...current, userMessage, response.data]);

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
                title='Code Generation'
                description='Generates code using normal prompts'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
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
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message : any) => (
                            <div
                                key={message.content}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                                )}
                            >
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown
                                    components={{
                                        pre: ({node, ...props}) =>(
                                            <div className="overflow-auto w-full my-4 bg-black/10 rounded-lg">
                                                <pre className="p-4" {...props} />
                                            </div>
                                        ),
                                        code: ({node, ...props}) =>( 
                                            <code className=" bg-black/10 p-1 rounded-lg " {...props} />    
                                                                    
                                        )
                                    }}
                                    className="overflow-hidden text-sm leading-7"
                                >
                                        {message.content || ""}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage