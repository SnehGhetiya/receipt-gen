"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, FC, ReactNode, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ownerName: z.string().trim().min(1, { message: "Owner name is required" }),
  flatNumber: z.string().trim().min(1, { message: "Flat number is required" }),
  amount: z.coerce.number().min(1, { message: "Amount is required" }),
  date: z.date({ required_error: "Date of payment is required" }),
});

const CreateReceiptContext = createContext<{
  form: UseFormReturn<z.infer<typeof formSchema>>;
} | null>(null);

export const useCreateReceiptContext = () => {
  const context = useContext(CreateReceiptContext);
  if (!context) {
    throw new Error(
      "useCreateReceiptContext must be used within CreateReceiptContext"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const CreateReceiptContextProvider: FC<Props> = ({ children }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      flatNumber: "",
      amount: 0,
      date: undefined,
    },
  });

  return (
    <CreateReceiptContext.Provider value={{ form }}>
      {children}
    </CreateReceiptContext.Provider>
  );
};

export default CreateReceiptContextProvider;
