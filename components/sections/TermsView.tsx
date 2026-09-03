"use client";

import { InfoHero, InfoSection } from "@/components/ui/InfoBlocks";

/*
  /terms — full terms of service (16 sections). The governing-law
  wording is kept general until the business owner / legal adviser
  provides the final jurisdiction.
*/

const VARIATIONS = [
  "Colour",
  "Texture",
  "Weave",
  "Finish",
  "Pattern",
  "Surface character",
  "Drape",
];

const IP_ITEMS = [
  "Logos",
  "Brand names",
  "Product photography",
  "Images",
  "Graphics",
  "Text",
  "Designs",
  "Layouts",
  "Illustrations",
  "Videos",
];

export function TermsView() {
  return (
    <main className="bg-white">
      <InfoHero
        eyebrow="Terms of Service"
        title="Terms of Service"
        subtitle="Welcome to Saroj Ensemble. By accessing or using our website, purchasing our products or using any services provided through the website, you agree to these Terms of Service. Please read these terms carefully before using the website."
        meta="Last Updated: September 2026"
      />

      <div className="container-lux max-w-3xl py-12 md:py-16">
        <div className="mt-2">
          <InfoSection index="1" heading="About These Terms">
            <p>
              These Terms of Service govern your use of the Saroj Ensemble
              website and your purchase of products through the website. If you
              do not agree with these terms, please do not use the website or
              place an order.
            </p>
          </InfoSection>

          <InfoSection index="2" heading="Product Information">
            <p>
              We make reasonable efforts to ensure that product descriptions,
              photographs, colours, measurements and other product information
              are accurate. However, fabrics are physical materials and may
              naturally exhibit variations in:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {VARIATIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Photography and differences between screens can also cause
              colours to appear slightly different from the physical product.
              Minor variations do not necessarily indicate a defect.
            </p>
          </InfoSection>

          <InfoSection index="3" heading="Product Availability">
            <p>
              Products are subject to availability. Certain fabrics may be
              available only in limited quantities. We reserve the right to
              modify, discontinue or restrict the availability of any product
              without prior notice.
            </p>
            <p>
              If an ordered product becomes unavailable, we will contact the
              customer regarding the appropriate resolution.
            </p>
          </InfoSection>

          <InfoSection index="4" heading="Pricing">
            <p>
              Product prices displayed on the website are subject to change. We
              reserve the right to correct pricing, product or promotional
              errors where necessary.
            </p>
            <p>
              Applicable taxes, shipping charges and other fees will be
              displayed during the applicable purchase process where required.
            </p>
          </InfoSection>

          <InfoSection index="5" heading="Orders">
            <p>
              Placing an order constitutes a request to purchase the selected
              products. An order is subject to successful payment, product
              availability and verification.
            </p>
            <p>
              We reserve the right to refuse or cancel an order in
              circumstances including suspected fraud, pricing errors, product
              unavailability, payment issues or other legitimate reasons.
            </p>
          </InfoSection>

          <InfoSection index="6" heading="Payments">
            <p>
              Payments may be processed through third-party payment providers.
              By completing a transaction, you agree to provide accurate
              payment and billing information and to comply with the applicable
              payment provider&apos;s terms.
            </p>
          </InfoSection>

          <InfoSection index="7" heading="Shipping">
            <p>
              Saroj Ensemble aims to dispatch confirmed orders within 24 hours.
              Domestic delivery is generally expected within 7 days, subject to
              destination and logistics. We also offer international delivery
              to 200+ countries.
            </p>
            <p>
              Delivery times are estimates and may be affected by courier
              delays, customs, weather, public holidays, incorrect addresses
              and other circumstances outside our reasonable control.
            </p>
          </InfoSection>

          <InfoSection index="8" heading="International Orders">
            <p>
              International orders may be subject to customs duties, import
              taxes, local fees or other charges imposed by the destination
              country. Such charges are generally the responsibility of the
              recipient unless otherwise explicitly stated.
            </p>
            <p>
              Customers are responsible for providing accurate information
              required for international delivery.
            </p>
          </InfoSection>

          <InfoSection index="9" heading="Returns & Exchanges">
            <p>
              Eligible products may be returned within 14 days of delivery,
              subject to the conditions stated in our Returns &amp; Exchanges
              Policy. Fabric that has been cut, washed, altered, stitched, dyed,
              used or otherwise modified may not be eligible for return.
            </p>
            <p>
              Please review the Returns &amp; Exchanges page before placing an
              order.
            </p>
          </InfoSection>

          <InfoSection index="10" heading="Intellectual Property">
            <p>All website content, including but not limited to:</p>
            <ul className="list-disc space-y-1 pl-5">
              {IP_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              is owned by or licensed to Saroj Ensemble unless otherwise stated.
              You may not reproduce, distribute, modify, publish or
              commercially exploit our content without prior written
              permission.
            </p>
          </InfoSection>

          <InfoSection index="11" heading="Website Use">
            <p>
              You agree not to use the website for unlawful purposes or in a
              way that could damage, disrupt or interfere with the website, its
              infrastructure or other users. You must not attempt to gain
              unauthorised access to restricted areas, systems or information.
            </p>
          </InfoSection>

          <InfoSection index="12" heading="Third-Party Services">
            <p>
              Certain website functions may rely on third-party providers,
              including payment processors, shipping partners, analytics
              services and other technology providers. Saroj Ensemble is not
              responsible for independent third-party services outside its
              reasonable control.
            </p>
          </InfoSection>

          <InfoSection index="13" heading="Limitation of Liability">
            <p>
              To the extent permitted by applicable law, Saroj Ensemble will
              not be responsible for indirect, incidental or consequential
              losses arising from the use of the website or products. Nothing
              in these Terms is intended to exclude rights or protections that
              cannot legally be excluded.
            </p>
          </InfoSection>

          <InfoSection index="14" heading="Changes to These Terms">
            <p>
              We may update these Terms of Service from time to time. Updated
              terms will be published on this page, and the revised date will
              be displayed at the top.
            </p>
          </InfoSection>

          <InfoSection index="15" heading="Governing Law">
            <p>
              These Terms shall be interpreted in accordance with applicable
              laws and regulations governing Saroj Ensemble and the relevant
              transaction. Where required, disputes will be subject to the
              jurisdiction specified by applicable law.
            </p>
          </InfoSection>

          <InfoSection index="16" heading="Contact">
            <p>
              If you have questions regarding these Terms of Service, please
              contact Saroj Ensemble using the contact details provided on our
              website.
            </p>
          </InfoSection>
        </div>
      </div>
    </main>
  );
}
