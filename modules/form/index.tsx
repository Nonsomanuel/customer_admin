"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const formSchema = z.object({
  businessname: z
    .string()
    .min(2, {
      message: "Business name must be at least 2 characters.",
    })
    .optional(),
  customername: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  phonenumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^[+]?[0-9]+$/, {
      message: "Phone number must contain only numbers and optional + prefix",
    }),
  product: z.string().min(2, {
    message: "Product description required.",
  }),
  amount: z
    .string()
    .min(1, {
      message: "Amount is required.",
    })
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
      message: "Amount must be a valid number",
    }),
  duedate: z.date({
    required_error: "Please select a due date",
  }),
});

export function BizForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessname: undefined,
      customername: "",
      phonenumber: "",
      product: "",
      amount: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const customer = {
      businessName: values.businessname ?? "",
      name: values.customername,
      phone: values.phonenumber,
      product: values.product,
      amount: Number(values.amount),
      dueDate: Timestamp.fromDate(new Date(values.duedate)),
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "customers"), customer);

      toast.custom(
        (t) => (
          <div className="relative flex items-center justify-between text-[15px] md:w-[414px] p-4 font-radio_canada text-[#228329] bg-white rounded-none shadow-lg">
            <span>
              {
                "✅ Reminder set! We'll message your customer before the due date."
              }
            </span>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-[#228329] hover:text-[#1a6b24] focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ),
        {
          position: "top-center",
          duration: 6000,
        }
      );

      form.reset(); // clears the form
    } catch (error) {
      console.error("❌ Firestore error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-[32px] font-bold text-[#002625] mb-8 font-radio_canada">
        Track Customers. Send WhatsApp Reminders. No Signup, No Stress.
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[480px]"
        >
          <FormField
            control={form.control}
            name="businessname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ace Group of Companies"
                    {...field}
                    className="h-[44px] py-2 px-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="h-[44px] py-2 px-3"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (WhatsApp preferably)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+2348124356447"
                    {...field}
                    className="h-[44px] py-2 px-3"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="h-[44px] py-2 px-3"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="h-[44px] py-2 px-3"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duedate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal h-[44px]",
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
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    aria-required
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
