import React from "react";

const RefundReturnPolicy = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-10 font-sans text-xl">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 uppercase">
          Refund & Return Policy
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          <span className="font-semibold text-white">SPEKTR RACING</span>{" "}
          follows a strict, quality-focused return and refund policy due to the
          technical and protective nature of riding gear.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            1. Eligibility for Returns
          </h2>
          <p className="text-gray-300 mb-3">
            Returns are accepted only under the following conditions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Manufacturing defect</li>
            <li>Incorrect product shipped</li>
            <li>Product damaged during transit</li>
          </ul>
          <p className="text-gray-300 mt-3">
            Return requests must be raised within{" "}
            <span className="text-white font-semibold">48 hours</span> of
            delivery.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            2. Non-Returnable Items
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Products showing signs of use, wear, or washing</li>
            <li>Products damaged due to accidents or mishandling</li>
            <li>Customised or made-to-order products</li>
            <li>Clearance or discounted items (unless defective)</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            3. Inspection & Approval
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              Returned products must be unused, unwashed, and in original
              packaging
            </li>
            <li>All returns undergo a quality inspection</li>
            <li>
              Approval or rejection is at{" "}
              <span className="text-white font-semibold">
                SPEKTR RACING’s sole discretion
              </span>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            4. Refund Process
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Approved refunds are processed within 7–10 business days</li>
            <li>Refunds are issued to the original payment method</li>
            <li>
              Shipping charges are non-refundable unless the error is from
              SPEKTR RACING
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            5. Exchanges
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Size exchanges may be allowed subject to availability</li>
            <li>Exchange shipping costs may be borne by the customer</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RefundReturnPolicy;
