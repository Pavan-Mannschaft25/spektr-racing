import React from "react";

const TermsOfService = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-10 font-sans text-xl">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 uppercase pt-10">
          Terms of Service
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          By accessing or purchasing from{" "}
          <span className="font-semibold text-white">SPEKTR RACING</span>, you
          agree to comply with the following terms and conditions.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            1. Product Usage Disclaimer
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              SPEKTR RACING products are designed to enhance riding comfort and
              protection
            </li>
            <li>
              No product can guarantee complete protection from injury or
              fatality
            </li>
            <li>Customers assume full responsibility for usage</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            2. Pricing & Availability
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Prices are listed in Indian Rupees (₹)</li>
            <li>
              Prices, specifications, and availability may change without prior
              notice
            </li>
            <li>
              Errors in pricing or product information may be corrected at our
              discretion
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            3. Intellectual Property Rights
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              All trademarks, logos, designs, images, and content are the
              exclusive property of SPEKTR RACING
            </li>
            <li>
              Any unauthorised reproduction or misuse is strictly prohibited
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-300 mb-3">
            SPEKTR RACING shall not be liable for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Personal injury or death arising from product usage</li>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Losses resulting from misuse or improper sizing</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            5. Governing Law & Jurisdiction
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>These terms are governed by the laws of India</li>
            <li>
              All disputes shall be subject to the exclusive jurisdiction of
              Indian courts
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
