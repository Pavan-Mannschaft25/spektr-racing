import React from "react";

const WarrantyPolicy = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-10 font-sans text-xl">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 uppercase pt-10">
          Warranty Policy
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          <span className="font-semibold text-white">SPEKTR RACING</span> is
          committed to delivering high-performance riding gear and apparel
          crafted with premium materials and strict quality controls. This
          Warranty Policy outlines the scope, coverage, and limitations of our
          product warranty.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            1. Warranty Coverage
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              All SPEKTR RACING products are covered under a Limited
              Manufacturer’s Warranty against defects in materials and
              workmanship when used under normal riding and lifestyle
              conditions.
            </li>
            <li>Warranty Period: 6 (six) months from the date of delivery</li>
            <li>Coverage applies only to the original purchaser</li>
            <li>Proof of purchase (invoice/order ID) is mandatory</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            2. What the Warranty Covers
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Defective stitching or seam failure</li>
            <li>Faulty zippers, fasteners, or closures</li>
            <li>Material defects present at the time of delivery</li>
            <li>Structural issues caused by production faults</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            3. What the Warranty Does Not Cover
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Normal wear and tear over time</li>
            <li>Damage due to crashes, accidents, or impact</li>
            <li>Improper usage, misuse, or negligence</li>
            <li>Improper washing, drying, or maintenance</li>
            <li>Alterations, custom tailoring, or third-party modifications</li>
            <li>
              Colour fading, ageing, or deterioration due to sweat, UV exposure,
              or weather
            </li>
            <li>
              Products used for professional racing or competitive events unless
              explicitly stated
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            4. Warranty Claim Procedure
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-200 mb-4">
            <li>
              Email:{" "}
              <a
                href="mailto:support@spektrracing.com"
                className="text-red-400 hover:underline"
              >
                support@spektrracing.com
              </a>
            </li>
            <li>Include:</li>
          </ol>

          <ul className="list-disc list-inside ml-5 space-y-2 text-gray-200">
            <li>Order ID or invoice</li>
            <li>Clear images/videos of the defect</li>
            <li>Description of the issue and usage duration</li>
          </ul>

          <p className="text-gray-300 mt-4">
            After assessment, SPEKTR RACING reserves the right to{" "}
            <span className="text-white font-semibold">
              repair, replace, or refund
            </span>{" "}
            the product. The final decision rests solely with SPEKTR RACING
            after inspection.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            5. Disclaimer
          </h2>
          <p className="text-gray-300 leading-relaxed">
            This warranty is limited to the product itself and does not cover
            any personal injury, property damage, or incidental loss arising
            from product usage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WarrantyPolicy;
