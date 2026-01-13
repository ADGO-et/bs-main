"use client";

import { useGetMyFundingsQuery } from "@/redux/api/fundingApi";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TransactionHistoryPage() {
  const { data, isLoading, isError } = useGetMyFundingsQuery();

  const fundings = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        {isLoading && <div>Loading...</div>}
        {isError && (
          <div className="text-red-500">Failed to load transactions.</div>
        )}
        {!isLoading && !isError && fundings.length === 0 && (
          <div>No transactions found.</div>
        )}
        <div className="space-y-4">
          {fundings.map((funding) => (
            <div
              key={funding._id}
              className="bg-white rounded shadow p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {funding.description || "Funding"}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-mono">
                    {funding.tx_ref || funding.chapaTxRef}
                  </span>{" "}
                  • {funding.amount} ETB
                </div>
                <div className="text-xs text-gray-500">
                  {funding.createdAt
                    ? new Date(funding.createdAt).toLocaleString()
                    : ""}
                </div>
                <div className="text-xs text-gray-500">
                  Status: {funding.status}
                </div>
                <div className="text-xs text-gray-500">
                  Project:{" "}
                  {funding.hiwotId
                    ? "Hiwot"
                    : funding.startupId
                    ? "Startup"
                    : "-"}
                </div>
              </div>
              <Link
                href={`/transaction/${funding.tx_ref || funding.chapaTxRef}`}
              >
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
