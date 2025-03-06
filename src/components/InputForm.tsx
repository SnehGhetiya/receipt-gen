"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateReceiptContext } from "@/context/InputFormContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Download, SendHorizontal } from "lucide-react";
import { FC } from "react";

const InputForm: FC = () => {
  const { form } = useCreateReceiptContext();

  const onSubmit = form.handleSubmit(async (values) => {
    const html2pdf = (await import("html2pdf.js")).default;
    const receiptElement = document.querySelector("#receipt-preview");

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${values?.ownerName}_${values?.flatNumber}_${
        values?.date && values?.date?.getMonth() + 1
      }.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        dpi: 192,
        letterRendering: true,
        backgroundColor: "#FFFFFF",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf(receiptElement, opt);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="w-full grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type a owner name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="flatNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flat Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type a flat number"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type an amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Date Of Payment</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!form?.formState?.isValid ? (
            <Button type="submit" variant="default">
              <SendHorizontal className="h-4 w-4" />
              Submit
            </Button>
          ) : (
            <Button type="submit" variant="default">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

InputForm.displayName = "InputForm";

export default InputForm;
