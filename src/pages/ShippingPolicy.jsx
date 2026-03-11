import React from "react";

const ShippingPolicy = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-10 font-sans text-xl">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 uppercase pt-10">
          Shipping Policy
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          <span className="font-semibold text-white">SPEKTR RACING</span> aims
          to ensure timely and reliable delivery of all orders. Please review
          the shipping details below for clarity on coverage, timelines, and
          charges.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            1. Shipping Coverage
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>We currently ship across India</li>
            <li>International shipping may be offered in the future</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            2. Order Processing Time
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Ready stock items: 2–5 business days</li>
            <li>Custom or made-to-order products: 7–14 business days</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            3. Delivery Timeline
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Metro cities: 3–6 business days</li>
            <li>Non-metro & remote locations: 5–10 business days</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            4. Shipping Charges
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Shipping fees (if applicable) are displayed at checkout</li>
            <li>Prices may vary based on location and order size</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            5. Delays & Force Majeure
          </h2>
          <p className="text-gray-300 mb-3">
            SPEKTR RACING shall not be liable for delays caused by circumstances
            beyond our control, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Courier or logistics partners</li>
            <li>Natural calamities or adverse weather conditions</li>
            <li>Government restrictions or public holidays</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShippingPolicy;
