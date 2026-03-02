import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-10 font-sans text-xl">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6 uppercase">
          Privacy Policy
        </h1>

        <p className="text-gray-300 mb-10 leading-relaxed">
          <span className="font-semibold text-white">SPEKTR RACING</span>{" "}
          respects your privacy and is committed to protecting your personal
          information. This policy outlines how we collect, use, and safeguard
          your data.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-300 mb-3">
            We may collect the following information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Name, phone number, and email address</li>
            <li>Shipping and billing addresses</li>
            <li>
              Payment details (processed securely via third-party gateways)
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            2. Use of Information
          </h2>
          <p className="text-gray-300 mb-3">Your information is used to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Process and fulfil orders</li>
            <li>Provide customer support</li>
            <li>Send order updates and promotional communication</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            3. Data Security
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Customer data is stored securely</li>
            <li>
              We do not sell or share personal data with unauthorised third
              parties
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            4. Cookies & Analytics
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              Our website may use cookies to enhance your browsing experience
            </li>
            <li>
              Cookies help analyse website traffic and improve performance
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-xl font-semibold text-red-500 mb-3">
            5. Third-Party Services
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>
              Payment gateways and courier partners receive only essential
              information
            </li>
            <li>
              SPEKTR RACING is not responsible for third-party privacy practices
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
