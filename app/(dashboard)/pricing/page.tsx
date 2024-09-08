import React from "react";

const PricingPage = () => {
  return (
    <div>
      <div className="mx-auto px-6 py-3">
        <h1 className="text-center text-xl">Pricing</h1>
        <p className="text-center">
          All plans include a 14-day free trial. No credit card required.
        </p>
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-64 m-4 flex flex-col justify-between px-6">
            <div className="py-4">
              <div className="font-bold text-2xl mb-2">Basic</div>
              <p className="text-gray-700 text-base">Free</p>
            </div>
            <ul className="flex flex-col space-y-2">
              <li>Unlimited Projects</li>
              <li>Unlimited Popups</li>
              <li>Customizable Templates</li>
            </ul>
            <div className="py-4">
              <button className="btn btn-primary" disabled>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
