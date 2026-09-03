"use client";

import { InfoHero, InfoSection } from "@/components/ui/InfoBlocks";
import { Reveal } from "@/components/ui/Reveal";

/*
  /privacy-policy — full privacy policy (14 sections). Both the intro
  paragraph and every numbered section render the finalised copy.
*/

const COLLECTED = [
  "Name",
  "Email address",
  "Phone number",
  "Billing and shipping address",
  "Order and transaction information",
  "Product preferences and enquiries",
  "Account information",
  "Information you provide when contacting customer support",
  "Device and browser information",
  "IP address and general website usage information",
  "Cookies and similar technologies",
];

const USES = [
  "Process and fulfil orders",
  "Arrange shipping and delivery",
  "Communicate order updates",
  "Provide customer support",
  "Process payments through applicable payment providers",
  "Respond to enquiries",
  "Improve our website and services",
  "Personalise your shopping experience",
  "Prevent fraud and misuse",
  "Maintain website security",
  "Meet applicable legal and regulatory requirements",
];

const THIRD_PARTY = [
  "Payment processing",
  "Shipping and logistics",
  "Website analytics",
  "Customer communication",
  "Email delivery",
  "Security",
  "Maps and location services",
  "Social media integrations",
];

const RIGHTS = [
  "Request access to information we hold about you",
  "Request correction of inaccurate information",
  "Request deletion where legally applicable",
  "Withdraw certain permissions or consent",
  "Opt out of marketing communications",
  "Raise concerns regarding the handling of your personal information",
];

export function PrivacyView() {
  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        subtitle="At Saroj Ensemble, we respect your privacy and are committed to handling your personal information responsibly."
        meta="Last Updated: September 2026"
      />

      <div className="container-lux max-w-3xl py-12 md:py-16">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-taupe">
            This Privacy Policy explains how information may be collected,
            used, stored and shared when you visit our website, create an
            account, place an order, contact us or otherwise interact with
            Saroj Ensemble.
          </p>
        </Reveal>

        <div className="mt-2">
          <InfoSection index="1" heading="Information We Collect">
            <p>
              Depending on how you interact with our website, we may collect
              information such as:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {COLLECTED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              We only seek to collect information that is reasonably necessary
              to provide our services and operate our website.
            </p>
          </InfoSection>

          <InfoSection index="2" heading="How We Use Your Information">
            <p>We may use your information to:</p>
            <ul className="list-disc space-y-1 pl-5">
              {USES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Where permitted, we may also use your contact information to send
              relevant updates, offers or marketing communications. You can opt
              out of marketing communications at any time.
            </p>
          </InfoSection>

          <InfoSection index="3" heading="Payment Information">
            <p>
              Payments may be processed through third-party payment providers.
              Saroj Ensemble does not necessarily store complete payment-card
              information on its own systems. Payment information may be
              handled directly by the applicable payment provider according to
              its own privacy and security practices.
            </p>
          </InfoSection>

          <InfoSection index="4" heading="Shipping Information">
            <p>
              To fulfil your order, relevant information may be shared with
              shipping and logistics partners. This may include your name,
              address, phone number, email address and other information
              required to deliver your order.
            </p>
          </InfoSection>

          <InfoSection index="5" heading="Cookies">
            <p>
              Our website may use cookies and similar technologies to improve
              functionality, remember preferences, understand website usage and
              provide a better shopping experience.
            </p>
            <p>
              Some cookies may be essential for the website to function, while
              others may be used for analytics, performance or marketing
              purposes. You can manage certain cookie preferences through your
              browser settings or available website controls.
            </p>
          </InfoSection>

          <InfoSection index="6" heading="Analytics & Website Usage">
            <p>
              We may use analytics and similar technologies to understand how
              visitors interact with our website. This information may help us
              understand which pages are useful, identify technical problems,
              improve navigation and enhance the overall customer experience.
            </p>
          </InfoSection>

          <InfoSection index="7" heading="Third-Party Services">
            <p>
              Our website may use third-party services for functions such as:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {THIRD_PARTY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              These providers may process information according to their own
              privacy policies.
            </p>
          </InfoSection>

          <InfoSection index="8" heading="Data Security">
            <p>
              We take reasonable measures to protect personal information from
              unauthorised access, alteration, disclosure or destruction.
              However, no internet-based service can guarantee absolute
              security.
            </p>
          </InfoSection>

          <InfoSection index="9" heading="Data Retention">
            <p>
              We retain personal information for as long as reasonably
              necessary for the purposes for which it was collected, including
              fulfilling orders, providing services, maintaining business
              records, resolving disputes and complying with legal obligations.
            </p>
            <p>
              The specific retention period may vary depending on the type of
              information and applicable requirements.
            </p>
          </InfoSection>

          <InfoSection index="10" heading="Your Rights">
            <p>
              Depending on your location and applicable law, you may have
              rights relating to your personal information, including the right
              to:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {RIGHTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              To make a privacy-related request, please contact Saroj Ensemble
              using the contact details provided on our website.
            </p>
          </InfoSection>

          <InfoSection index="11" heading="Children's Privacy">
            <p>
              Our website is not intended to knowingly collect personal
              information from children without appropriate consent. If you
              believe that a child has provided personal information to us
              improperly, please contact us so that we can review the matter.
            </p>
          </InfoSection>

          <InfoSection index="12" heading="International Customers">
            <p>
              Because Saroj Ensemble serves customers internationally,
              information may be processed or transferred across countries
              where our service providers operate. Where required, we take
              appropriate steps to handle personal information in accordance
              with applicable laws.
            </p>
          </InfoSection>

          <InfoSection index="13" heading="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, services or legal requirements. When
              changes are made, the updated version will be published on this
              page with a revised effective date.
            </p>
          </InfoSection>

          <InfoSection index="14" heading="Contact Us">
            <p>
              If you have questions, concerns or requests regarding this
              Privacy Policy or the handling of your personal information,
              please contact Saroj Ensemble through the contact information
              provided on our website.
            </p>
          </InfoSection>
        </div>
      </div>
    </main>
  );
}
