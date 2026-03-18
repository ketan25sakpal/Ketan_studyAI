import React from 'react';
import { PricingTable } from "@clerk/nextjs";

export const dynamic = 'force-dynamic';

const PricingPage = () => {
  return (
    <main className="wrapper container py-12">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold font-serif text-[#212a3b] mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-[#3d485e] max-w-2xl">
          Unlock more books, longer sessions, and advanced features to enhance your reading experience.
        </p>
      </div>

      <div className="clerk-pricing-wrapper">
        <PricingTable />
      </div>
    </main>
  );
};

export default PricingPage;
