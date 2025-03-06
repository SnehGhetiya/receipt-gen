"use client";
import ReceiptPreview from "@/components/ReceiptPreview";
import UserInput from "@/components/UserInput";
import { FC, Suspense } from "react";

const Home: FC = () => {
  return (
    <Suspense>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <UserInput />
        <ReceiptPreview />
      </div>
    </Suspense>
  );
};

export default Home;
