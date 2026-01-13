import React from "react";

export default function TermsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          BoleStarter Terms &amp; Conditions for Startups
        </h1>
        <ol className="list-decimal list-inside space-y-3 text-gray-800 mb-8">
          <li>
            <span className="font-semibold">Eligibility:</span> You must be 18
            years or older and legally authorized to run a business in your
            country. Your startup must have a clear business idea, prototype, or
            product plan.
          </li>
          <li>
            <span className="font-semibold">Accuracy of Information:</span> All
            information provided must be true and accurate. False or misleading
            information will lead to immediate campaign suspension.
          </li>
          <li>
            <span className="font-semibold">Use of Funds:</span> Funds collected
            must only be used for the stated purpose in your campaign. Misuse of
            funds may result in legal action or account suspension.
          </li>
          <li>
            <span className="font-semibold">Compliance:</span> You agree to
            comply with local laws, tax obligations, and BoleStarter policies.
            Projects promoting illegal activities or harmful products will be
            rejected.
          </li>
          <li>
            <span className="font-semibold">Intellectual Property:</span> You
            confirm that all content (images, videos, and text) you upload is
            owned by you or properly licensed.
          </li>
          <li>
            <span className="font-semibold">Payment &amp; Fees:</span>{" "}
            BoleStarter charges a platform fee (e.g., 5%) and applicable
            transaction charges on funds raised.
          </li>
          <li>
            <span className="font-semibold">Transparency &amp; Updates:</span>{" "}
            You must regularly update backers on the project’s progress. Failure
            to deliver promised rewards or updates can affect future campaigns.
          </li>
          <li>
            <span className="font-semibold">Refund Policy:</span> BoleStarter
            does not guarantee refunds to backers. Refund arrangements, if any,
            must be handled by the startup.
          </li>
          <li>
            <span className="font-semibold">Termination:</span> BoleStarter
            reserves the right to suspend or terminate your campaign if you
            violate these terms.
          </li>
        </ol>
        <p className="mt-8 text-gray-700 font-semibold">
          By launching your campaign, you agree to these Terms and Conditions.
        </p>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
