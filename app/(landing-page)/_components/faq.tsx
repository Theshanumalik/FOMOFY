import React from "react";

const FAQ = () => {
  return (
    <div className="max-w-xl mx-auto w-full">
      <h4 className="text-center text-lg font-semibold my-4">
        Frequently Asked Questions
      </h4>
      <div className="join join-vertical w-full max-w-xl mx-auto">
        <div className="collapse collapse-arrow join-item border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-base font-medium">
            How to get started?
          </div>
          <div className="collapse-content">
            <p>
              To get started, you need to sign-in with your Google account and
              create a project.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-base font-medium">
            How to integrate with my website?
          </div>
          <div className="collapse-content">
            <p>
              You can copy the embed code from the dashboard and paste it into
              your website.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-base font-medium">
            How it works?
          </div>
          <div className="collapse-content">
            <p>
              FOMOFY uses jquery and css to create beautiful and engaging FOMO.
              You can customize the FOMO notification as per your needs.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-base font-medium">
            Can I use it for free?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can use FOMOFY for free. We also have a paid plan with
              additional features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
