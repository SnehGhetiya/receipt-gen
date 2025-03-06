"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateReceiptContext } from "@/context/InputFormContext";
import { format } from "date-fns";
import { CheckCheck, Download, IndianRupee } from "lucide-react";

const ReceiptPreview = () => {
  const { form } = useCreateReceiptContext();
  const values = form.watch();

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const receiptElement = document.querySelector("#receipt-preview");

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${values?.ownerName}_${values?.flatNumber}_${
        values?.date?.getMonth() + 1
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
  };

  return (
    <div
      className="w-full max-h-screen mx-auto print:p-0 print:bg-white"
      id="receipt-preview"
    >
      <Card className="print:border-0 print:shadow-none print:bg-white">
        <CardHeader className="border-b pb-4 print:bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full flex flex-col items-start justify-between gap-1">
              <div className="w-full flex justify-between items-center mb-3">
                <CardTitle className="text-xl font-bold">
                  SANVI FLATS MAINTENANCE INVOICE
                </CardTitle>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  PAID
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between">
                <p>
                  <strong>Payment Date:</strong>
                  {values?.date
                    ? format(new Date(values.date), "PPP")
                    : "No date selected"}
                </p>
                <p>
                  <strong>Invoice Date:</strong> {format(Date.now(), "PPP")}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6 print:bg-white">
          {/* Property and Tenant Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 border rounded-lg flex flex-col items-center justify-center w-full">
              <h3 className="font-semibold text-lg">Flat Number</h3>
              <p className="text-muted-foreground">{values.flatNumber}</p>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center justify-center w-full">
              <h3 className="font-semibold text-lg">Tenant</h3>
              <p className="text-muted-foreground">{values.ownerName}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-muted p-4 rounded-lg flex flex-col items-center md:flex-row gap-3 w-full print:bg-white">
            <div className="bg-primary/10 p-2 rounded-full">
              <IndianRupee className="h-6 w-6 text-primary" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div>
                <h3 className="font-semibold">Payment Method</h3>
                <p className="text-muted-foreground">Cash (Paid)</p>
              </div>
              <CheckCheck className="h-6 w-6 text-green-700" />
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Charges</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted text-left print:bg-white">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Monthly Maintenance Fee</td>
                    <td className="p-3 text-right">
                      ₹{Number(values?.amount)?.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="border-t bg-muted font-medium print:bg-white">
                    <td className="p-3">Total</td>
                    <td className="p-3 text-right">
                      ₹{Number(values?.amount)?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-green-200 p-4 rounded-lg print:bg-white">
            <h3 className="font-semibold mb-2">Payment Status</h3>
            <p className="text-sm text-muted-foreground">
              This invoice has been paid in full via cash payment. Thank you for
              your prompt payment. This receipt serves as proof of your payment
              for the maintenance charges listed above.
            </p>
          </div>
        </CardContent>

        {form.formState.isValid ? (
          <CardFooter
            className="border-t pt-4 flex flex-wrap gap-3 print:hidden"
            data-html2canvas-ignore
          >
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
};

export default ReceiptPreview;
