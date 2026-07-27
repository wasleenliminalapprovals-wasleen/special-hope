/**
 * ProcessOverview — "How It Works" section (3-4 steps).
 *
 * Shows the general approval process Wasleen follows.
 * Used on homepage to explain the workflow to potential clients.
 *
 * @see /plans/complete-build-plan.md (Phase 6.5 — Process Overview)
 */

import { Search, FileCheck, ClipboardCheck, BadgeCheck } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Submit Your Requirements",
    description:
      "Tell us about your project — type, location, and scope. We'll identify every approval you need.",
    icon: Search,
  },
  {
    step: 2,
    title: "We Prepare & Submit",
    description:
      "Our team compiles all required documents, drawings, and forms. We submit to the relevant authority on your behalf.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "We Track & Follow Up",
    description:
      "We monitor the application status, respond to queries, and make revisions as needed. You stay informed at every stage.",
    icon: ClipboardCheck,
  },
  {
    step: 4,
    title: "Approval Delivered",
    description:
      "Once approved, we deliver your certificate or permit and ensure everything is in order for your project to proceed.",
    icon: BadgeCheck,
  },
];

export default function ProcessOverview() {
  return (
    <section className="bg-light-bg">
      <div className="max-w-6xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-h2 font-montserrat text-heading-text mb-3">
            How It Works
          </h2>
          <p className="text-body-lg text-body-text max-w-2xl mx-auto">
            A streamlined process designed to save you time and eliminate
            the complexity of Dubai's approval system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col items-center text-center p-6">
                {/* Step number circle */}
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-caption font-montserrat font-bold">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-card-bg flex items-center justify-center text-brand-blue mb-4">
                  <Icon size={28} strokeWidth={1.75} />
                </div>

                <h3 className="text-h4 font-montserrat text-heading-text mb-2">
                  {step.title}
                </h3>

                <p className="text-body-sm text-body-text leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (desktop only) */}
                {step.step < 4 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border-light"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
