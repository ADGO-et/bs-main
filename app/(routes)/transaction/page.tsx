"use client";

import {
  useGetMyFundingsQuery,
  useGetFundingByTxRefQuery,
} from "@/redux/api/fundingApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserFundingsPage() {
  const { data, isLoading } = useGetMyFundingsQuery();

  const [selectedTxRef, setSelectedTxRef] = useState<string | null>(null);

  const { data: fundingDetail, isFetching } = useGetFundingByTxRefQuery(
    selectedTxRef!,
    {
      skip: !selectedTxRef,
    }
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Transactions</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (!data?.data || data.data.length === 0) && (
        <div>No transactions found.</div>
      )}
      <div className="space-y-4">
        {data?.data?.map((funding) => (
          <div
            key={funding._id}
            className="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                {funding.description || "Funding"}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-mono">{funding.tx_ref}</span> •{" "}
                {funding.amount} ETB
              </div>
              <div className="text-xs text-gray-500">
                {new Date(funding.createdAt).toLocaleString()}
              </div>
            </div>
            <Button
              onClick={() => setSelectedTxRef(funding.tx_ref)}
              variant="outline"
              size="sm"
            >
              View Receipt
            </Button>
          </div>
        ))}
      </div>

      {selectedTxRef && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Transaction Receipt</h3>
            {isFetching && <div>Loading receipt...</div>}
            {fundingDetail?.data && (
              <pre className="text-xs max-h-64 overflow-auto bg-gray-100 p-2 rounded">
                {JSON.stringify(fundingDetail.data, null, 2)}
              </pre>
            )}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setSelectedTxRef(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
