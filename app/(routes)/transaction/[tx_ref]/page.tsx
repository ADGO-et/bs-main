"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetFundingByTxRefQuery } from "@/redux/api/fundingApi";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";
import Logo from "@/public/logo/logo.png";
import { useGetSingleVerifiedStartupQuery } from "@/redux/api/startupApi";
import { useGetHiwotByIdQuery } from "@/redux/api/hiwotApi";

export default function FundingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tx_ref = params?.tx_ref as string;

  const { data, isLoading, isError } = useGetFundingByTxRefQuery(tx_ref);
  const funding = data?.data;
  console.log("funding", funding);

  // Get user info from token (assuming you store it in Redux)
  const user = useSelector((state: any) => state.auth.user);
  const name = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const email = user?.email ?? "";

  const projectId = funding?.startupId
    ? { label: "Startup ID", value: funding.startupId }
    : funding?.hiwotId
    ? { label: "Hiwot ID", value: funding.hiwotId }
    : null;

  const isStartup = !!funding?.startupId;
  const isHiwot = !!funding?.hiwotId;

  const { data: startupData } = useGetSingleVerifiedStartupQuery(
    funding?.startupId,
    { skip: !isStartup }
  );
  const { data: hiwotData } = useGetHiwotByIdQuery(funding?.hiwotId, {
    skip: !isHiwot,
  });
  console.log("hiwotData", hiwotData);
  console.log("startupData", startupData);

  const projectType = isStartup ? "Startup" : isHiwot ? "Hiwot" : "-";
  const handleDownloadReceipt = async () => {
    if (!funding) return;
    const doc = new jsPDF();

    // Try to load the logo image
    const img = new window.Image();
    img.src = Logo.src;
    img.onload = () => {
      doc.addImage(img, "PNG", 150, 10, 40, 20);

      doc.setFontSize(22);
      doc.text("Payment Receipt", 15, 22);

      doc.setFontSize(12);
      doc.setTextColor("#666");
      doc.text(`Date: ${new Date().toLocaleString()}`, 15, 32);

      doc.setFontSize(12);
      doc.setTextColor("#000");
      doc.text(`Name: ${name}`, 15, 42);
      doc.text(`Email: ${email}`, 15, 50);

      // Prepare table body
      const tableBody = [
        ["Transaction Ref (tx_ref)", funding.tx_ref || funding.chapaTxRef],
        // ["Reference", funding.reference || "-"],
        ["Status", funding.status],
        ["Amount", `${funding.amount} ETB`],
        [
          "Service Fee",
          `${funding.serviceFee ?? funding.commission_rate ?? 0} ETB`,
        ],
        ["Description", funding.description || "-"],
        [
          "Transaction Date",
          funding.createdAt ? new Date(funding.createdAt).toLocaleString() : "",
        ],
        ["User ID", funding.userId || "-"],
      ];
      if (isStartup && startupData?.data?.startup?.companyName) {
        tableBody.push(["Project", startupData.data.startup.companyName]);
      }

      autoTable(doc, {
        startY: 60,
        head: [["Field", "Value"]],
        body: tableBody,
        headStyles: { fillColor: "#054789" },
        styles: { fontSize: 10 },
      });

      doc.save(`receipt_${funding.tx_ref || funding.chapaTxRef}.pdf`);
    };
    img.onerror = () => {
      // fallback if image fails to load
      doc.setFontSize(22);
      doc.text("Payment Receipt", 15, 22);

      doc.setFontSize(12);
      doc.setTextColor("#666");
      doc.text(`Date: ${new Date().toLocaleString()}`, 15, 32);

      doc.setFontSize(12);
      doc.setTextColor("#000");
      doc.text(`Name: ${name}`, 15, 42);
      doc.text(`Email: ${email}`, 15, 50);

      autoTable(doc, {
        startY: 60,
        head: [["Field", "Value"]],
        body: [
          ["Transaction Ref (tx_ref)", funding.tx_ref || funding.chapaTxRef],
          ["Reference", funding.reference || "-"],
          ["Status", funding.status],
          ["Amount", `${funding.amount} ETB`],
          [
            "Service Fee",
            `${funding.serviceFee ?? funding.commission_rate ?? 0} ETB`,
          ],
          ["Description", funding.description || "-"],
          [
            "Transaction Date",
            funding.createdAt
              ? new Date(funding.createdAt).toLocaleString()
              : "",
          ],
          ["User ID", funding.userId || "-"],
          // ["Startup", funding.startupId || "-"],
        ],
        headStyles: { fillColor: "#22c55e" },
        styles: { fontSize: 10 },
      });

      doc.save(`receipt_${funding.tx_ref || funding.chapaTxRef}.pdf`);
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 max-w-xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          ← Back
        </Button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold ">Transaction Detail</h1>

          <Button
            onClick={handleDownloadReceipt}
            className=""
            variant="default"
          >
            Generate Receipt
          </Button>
        </div>
        {isLoading && <div>Loading...</div>}
        {isError && (
          <div className="text-red-500">Failed to load transaction.</div>
        )}
        {!isLoading && !isError && funding && (
          <div className="bg-white rounded shadow p-6 space-y-4">
            <div>
              <span className="font-semibold">Transaction Ref:</span>{" "}
              <span className="font-mono">
                {funding.tx_ref || funding.chapaTxRef}
              </span>
            </div>
            <div>
              <span className="font-semibold">Amount:</span> {funding.amount}{" "}
              ETB
            </div>
            <div>
              <span className="font-semibold">Status:</span> {funding.status}
            </div>
            <div>
              <span className="font-semibold">Service Fee:</span>{" "}
              {funding.serviceFee ?? funding.commission_rate ?? 0} ETB
            </div>
            <div>
              <span className="font-semibold">Description:</span>{" "}
              {funding.description || "-"}
            </div>
            {isStartup && startupData?.data?.startup.companyName && (
              <div>
                <span className="font-semibold">Project:</span>{" "}
                {startupData.data.startup.companyName}
              </div>
            )}
            <div>
              <span className="font-semibold">Transaction Date:</span>{" "}
              {funding.createdAt
                ? new Date(funding.createdAt).toLocaleString()
                : ""}
            </div>
            {/* <div>
            <span className="font-semibold">Updated At:</span>{" "}
            {funding.updatedAt
              ? new Date(funding.updatedAt).toLocaleString()
              : ""}
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
