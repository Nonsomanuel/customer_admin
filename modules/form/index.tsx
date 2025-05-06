"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  businessename: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  customername: z
    .string()
    .min(2, "Customer name must be at least 2 characters"),
  phonenumber: z.string().min(2, "Phone number must be valid"),
  product: z.string().min(2, "Product description required"),
  amount: z.string().min(1, "Amount is required"),
  duedate: z.date({
    required_error: "Please select a due date",
  }),
});

export function BizForm() {
  // 1. Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessename: "",
      customername: "",
      phonenumber: "",
      product: "",
      amount: "",
    },
  });

  // 2. Define the submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="p-4">
      <h3 className="text-[32px] font-bold text-[#002625] mb-8  font-radio_canada">
        Track your customers & send WhatsApp payment reminders—free for small
        businesses
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[480px]"
        >
          <div>
            <FormField
              name={"businessname"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name(Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ace Group of Companies"
                      {...field}
                      className="h-[44px] py-2 px-3"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name={"customername"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="h-[44px] py-2 px-3"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name={"phonenumber"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (WhatsApp preferrably)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+2348124356447"
                      {...field}
                      className="h-[44px] py-2 px-3"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name={"product"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="h-[44px] py-2 px-3"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name={"amount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      className="h-[44px] py-2 px-3"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name={"duedate"}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[480px] h-[44px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select the payment due date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
