"use client";

import React, { useState } from "react";

export default function BookingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete booking
      setIsModalOpen(false);
      setCurrentStep(1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <header className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-headline italic mb-2">Welcome back, Jordan.</h2>
          <p className="text-on-surface-variant font-body">Your academic progress is looking strong this term.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-md shadow-sm font-medium transition-transform active:scale-95">
            View Schedule
          </button>
        </div>
      </header>

      {/* Bento Grid Preview */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low p-8 rounded-md border border-sand-border/40">
          <h3 className="text-2xl font-headline mb-6">Upcoming Classes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface rounded-md border border-sand-border/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-md">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                </div>
                <div>
                  <h4 className="font-professor text-xl">Advanced Rhetoric</h4>
                  <p className="text-sm text-on-surface-variant">Mrs. Eleanor Vance • 10:00 AM</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full">JOINING</span>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-umber-brand text-on-primary-container p-8 rounded-md flex flex-col justify-between">
          <span className="material-symbols-outlined text-4xl opacity-50 mb-4">calendar_month</span>
          <div>
            <h3 className="text-3xl font-headline leading-tight mb-4">Book Office Hours</h3>
            <p className="text-sm opacity-80 mb-6">Connect with teachers for personalized guidance on your projects or coursework.</p>
            <button
              className="w-full bg-surface text-on-surface py-3 rounded-md font-bold hover:bg-primary-fixed transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Schedule Now
            </button>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A120E]/40 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-2xl rounded-md shadow-2xl border border-sand-border overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-sand-border flex justify-between items-center bg-surface-container-lowest">
              <div>
                <h2 className="text-2xl font-headline text-on-surface">Teacher Consultation</h2>
                <p className="text-xs text-on-surface-variant font-body tracking-wider uppercase">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>
              <button
                className="p-2 hover:bg-surface-container rounded-full transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 w-full bg-surface-container">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* STEP 1: SELECT TEACHER */}
              {currentStep === 1 && (
                <div className="step-content">
                  <h3 className="text-xl font-headline mb-6">Choose a Teacher</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Teacher 1 */}
                    <label className="relative flex items-center p-4 border border-sand-border rounded-md cursor-pointer hover:bg-surface-container-low transition-colors group">
                      <input className="hidden peer" name="teacher" type="radio" defaultChecked />
                      <div className="w-14 h-14 bg-surface-container-highest rounded-md overflow-hidden mr-4 border border-sand-border/50 flex items-center justify-center">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-professor text-xl text-on-surface">Mr. Julian Sterling</h4>
                        <p className="text-xs text-on-surface-variant font-body">Department of History</p>
                      </div>
                      <div className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                        check_circle
                      </div>
                    </label>
                    {/* Teacher 2 */}
                    <label className="relative flex items-center p-4 border border-sand-border rounded-md cursor-pointer hover:bg-surface-container-low transition-colors group">
                      <input className="hidden peer" name="teacher" type="radio" />
                      <div className="w-14 h-14 bg-surface-container-highest rounded-md overflow-hidden mr-4 border border-sand-border/50 flex items-center justify-center">
                         <span className="material-symbols-outlined">person</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-professor text-xl text-on-surface">Ms. Elena Thorne</h4>
                        <p className="text-xs text-on-surface-variant font-body">Literature & Arts</p>
                      </div>
                      <div className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                        check_circle
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 2: PICK TIME */}
              {currentStep === 2 && (
                <div className="step-content">
                  <h3 className="text-xl font-headline mb-6">Available Time Slots</h3>
                  <p className="text-sm text-on-surface-variant mb-4 font-body italic">Monday, October 14th</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="py-3 px-4 border border-sand-border rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all">09:00 AM</button>
                    <button className="py-3 px-4 border border-primary bg-primary-container text-on-primary-container rounded-md text-sm font-medium">10:30 AM</button>
                    <button className="py-3 px-4 border border-sand-border rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all">11:15 AM</button>
                    <button className="py-3 px-4 border border-sand-border rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all">01:00 PM</button>
                    <button className="py-3 px-4 border border-sand-border rounded-md text-sm font-medium opacity-40 cursor-not-allowed" disabled>02:30 PM</button>
                    <button className="py-3 px-4 border border-sand-border rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all">04:00 PM</button>
                  </div>
                </div>
              )}

              {/* STEP 3: TOPIC */}
              {currentStep === 3 && (
                <div className="step-content">
                  <h3 className="text-xl font-headline mb-6">What would you like to discuss?</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Subject / Topic</label>
                      <input
                        className="w-full bg-surface-container-low border border-sand-border focus:ring-primary focus:border-primary rounded-md px-4 py-3 font-body text-on-surface outline-none"
                        placeholder="e.g. Project proposal review"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Detailed Notes (Optional)</label>
                      <textarea
                        className="w-full bg-surface-container-low border border-sand-border focus:ring-primary focus:border-primary rounded-md px-4 py-3 font-body text-on-surface outline-none"
                        placeholder="Briefly describe what you'd like to focus on..."
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-sand-border flex justify-between items-center bg-surface-container-lowest">
              <button
                className={`text-on-surface-variant font-medium text-sm hover:text-on-surface transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
                onClick={handlePrev}
              >
                Back
              </button>
              <button
                className="bg-umber-brand text-on-primary px-8 py-3 rounded-md font-bold transition-all hover:shadow-lg active:scale-95"
                onClick={handleNext}
              >
                {currentStep === totalSteps ? "Confirm Booking" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
