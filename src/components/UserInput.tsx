import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import InputForm from "@/components/InputForm";

const UserInput: FC = () => {
  return (
    <div className="w-full max-h-screen">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Create Receipt</CardTitle>
          <CardDescription>Enter the below provided details</CardDescription>
        </CardHeader>
        <CardContent>
          <InputForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInput;
