import * as z from "zod";
export const formSchema = z.object({
    prompt : z.string().min(1, {
        message : "Image promt is required"
    }),
    amount : z.string().min(1),
    resolution : z.string().min(1)
})

export const amountOptions = [
    {
        value: "1",
        label: "One Photo"
    },{
        value: "2",
        label: "Two Photos"
    },{
        value: "3",
        label: "Three Photos"
    },{
        value: "4",
        label: "Four Photos"
    },{
        value: "5",
        label: "Five Photos"
    }
]

export const resolutionOptions = [
    {
      value: "256x256",
      label: "256x256",
    },
    {
      value: "512x512",
      label: "512x512",
    },
    {
      value: "1024x1024",
      label: "1024x1024",
    },
  ];