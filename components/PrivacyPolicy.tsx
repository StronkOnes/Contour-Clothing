import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white dark:bg-black relative z-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-12 leading-none">Privacy Policy (POPIA Compliant)</h1>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>Contour Worldwide is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA).</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Information Collected</h2>
          <p>We collect your name, physical address, email, and phone number for the sole purpose of processing your order and delivery.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Third Parties</h2>
          <p>Your data is shared only with essential service providers: Yoco (Payment Processing) and our couriers (The Courier Guy, Pudo, Aramex).</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Security</h2>
          <p>We do not store your credit card details. All transactions are encrypted and handled securely by Yoco.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Your Rights</h2>
          <p>You have the right to request access to the information we hold about you or ask for its deletion by contacting <a href="mailto:siphondala@gmail.com" className="underline">siphondala@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;