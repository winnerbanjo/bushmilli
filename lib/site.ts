export const site = {
  name: "BushMilli",
  email: "bushmilli1@gmail.com",
  whatsapp: "09161820513",
  whatsappInternational: "2349161820513",
  location: "Lagos, Nigeria",
  bank: {
    accountName: "Akande Roheem Jimoh",
    accountNumber: "9161820513",
    bankName: "Moniepoint MFB"
  }
};

export const policyPages = [
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The rules for browsing, ordering, paying for, and receiving BushMilli products.",
    sections: [
      {
        heading: "Orders",
        body: "Orders are confirmed through BushMilli WhatsApp after product availability, size, delivery location, and final cost are reviewed with the customer."
      },
      {
        heading: "Payment",
        body: "Payment is accepted by bank transfer after order confirmation. Customers should send proof of payment through WhatsApp before dispatch is arranged."
      },
      {
        heading: "Product Availability",
        body: "Products are limited streetwear drops. If an item becomes unavailable after enquiry, BushMilli may suggest another size, colour, product, or refund path where payment has already been made."
      },
      {
        heading: "Customer Responsibility",
        body: "Customers should confirm size, delivery address, contact details, and order summary before making payment."
      }
    ]
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "How customer information is used for orders, support, and delivery.",
    sections: [
      {
        heading: "Information We Collect",
        body: "BushMilli may collect customer name, phone number, delivery address, email address, order details, and payment confirmation details when needed to process an order."
      },
      {
        heading: "How We Use Information",
        body: "Customer information is used to confirm orders, arrange delivery, provide support, keep order records, and prevent fraud."
      },
      {
        heading: "Sharing",
        body: "Delivery details may be shared with dispatch riders, courier partners, or payment/support providers only where needed to complete the order."
      },
      {
        heading: "Contact",
        body: `For privacy questions, contact ${site.email} or WhatsApp ${site.whatsapp}.`
      }
    ]
  },
  {
    slug: "refunds",
    title: "Return & Refund Policy",
    summary: "How exchanges, refunds, and issue reports are handled.",
    sections: [
      {
        heading: "Returns",
        body: "Customers should report order issues through WhatsApp within 24 hours of delivery. Items must be unused, unworn, unwashed, and in good condition for review."
      },
      {
        heading: "Exchanges",
        body: "Size exchanges depend on stock availability. Delivery or dispatch costs for exchanges may apply unless BushMilli made the fulfilment error."
      },
      {
        heading: "Refunds",
        body: "Refunds are reviewed case by case after the issue is confirmed. Custom, worn, damaged, or incorrectly handled items may not qualify for refunds."
      },
      {
        heading: "Incorrect Items",
        body: "If the wrong product or size is delivered by mistake, BushMilli will review the order record and arrange a correction where valid."
      }
    ]
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    summary: "Delivery expectations for Lagos and nationwide orders.",
    sections: [
      {
        heading: "Lagos Delivery",
        body: "Lagos delivery is arranged after payment confirmation. Delivery fees and timing depend on customer location and dispatch availability."
      },
      {
        heading: "Nationwide Delivery",
        body: "Nationwide delivery can be arranged through available courier services. Final delivery cost and estimated arrival are confirmed before payment."
      },
      {
        heading: "Dispatch",
        body: "Orders are dispatched after product availability and payment are confirmed. Delays may occur due to courier schedules, public holidays, weather, or incorrect delivery details."
      }
    ]
  },
  {
    slug: "contact",
    title: "Contact",
    summary: "Reach BushMilli for orders, sizing, delivery, and support.",
    sections: [
      {
        heading: "WhatsApp",
        body: `${site.whatsapp} is the main contact for product enquiries, order confirmation, delivery updates, and support.`
      },
      {
        heading: "Email",
        body: `Email ${site.email} for business, customer service, or order record enquiries.`
      },
      {
        heading: "Location",
        body: `BushMilli operates from ${site.location}. Delivery details are confirmed per order.`
      }
    ]
  },
  {
    slug: "size-guide",
    title: "Size Guide & FAQs",
    summary: "Basic fit guidance and common customer questions.",
    sections: [
      {
        heading: "Fit",
        body: "BushMilli tees are styled with a streetwear fit. Customers should confirm preferred size on WhatsApp before payment, especially for oversized or relaxed fits."
      },
      {
        heading: "Care",
        body: "Wash graphic tees inside out with mild detergent. Avoid bleach, harsh heat, and direct ironing on printed artwork."
      },
      {
        heading: "Custom Questions",
        body: "For exact sizing, current stock, delivery cost, or styling advice, message BushMilli on WhatsApp before placing an order."
      }
    ]
  }
];

export function getPolicy(slug: string) {
  return policyPages.find((page) => page.slug === slug);
}
