export type LegalSection = {
  heading: string
  intro?: string
  items?: string[]
  paragraphs?: string[]
}

export type LegalPageContent = {
  slug: string
  title: string
  description: string
  intro: string
  detailsHeading: string
  sections: LegalSection[]
  closing?: string
}

export const privacyPolicy: LegalPageContent = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description:
    'Learn how Amazon Air Duct Cleaning collects, uses, and protects your personal information. Read our 2026 updated privacy commitment.',
  intro: 'Amazon Air Duct Cleaning respects your privacy and is committed to protecting your personal information.',
  detailsHeading: 'Privacy Policy Details',
  sections: [
    {
      heading: 'Information we collect',
      intro:
        'When you use our website, submit a contact form, request a quote, or call us, we may collect the following information:',
      items: ['Name', 'Phone number', 'Email address', 'Address', 'Service details'],
    },
    {
      heading: 'How we use your information',
      intro: 'We collect this information only to:',
      items: [
        'Contact you about your service request',
        'Schedule appointments',
        'Provide customer support',
        'Improve our services',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'We do not sell, rent, or share your personal information with third parties for marketing purposes.',
      ],
    },
    {
      heading: 'Cookies and Tracking',
      paragraphs: [
        'Our website may use cookies and analytics tools to improve user experience, understand website traffic, and optimize performance. These cookies do not contain personal data.',
      ],
    },
    {
      heading: 'Data Protection',
      paragraphs: [
        'We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.',
      ],
    },
    {
      heading: 'Third-Party Services',
      paragraphs: [
        'We may use third-party tools (such as payment processors or analytics services). These providers are required to protect your information.',
      ],
    },
  ],
  closing: 'By using our website, you agree to this Privacy Policy.',
}

export const termsOfService: LegalPageContent = {
  slug: 'terms-of-service',
  title: 'Terms of Service',
  description:
    'Terms of service for Amazon Air Duct Cleaning website use, service availability, and limitations of liability.',
  intro: 'By using the Amazon Air Duct Cleaning website, you agree to the following terms.',
  detailsHeading: 'Terms of Service Details',
  sections: [
    {
      heading: 'Website Use',
      items: [
        'This website provides information about our air duct cleaning and related services.',
        'Submitting a form or requesting a quote does not guarantee service until confirmed by our team.',
      ],
    },
    {
      heading: 'Service Availability',
      items: [
        'All services are subject to availability, location, and confirmation.',
        'We reserve the right to refuse service at our discretion.',
      ],
    },
    {
      heading: 'Accuracy of Information',
      items: [
        'We strive to keep our website accurate, but we do not guarantee that all information is always up to date.',
        'Prices, services, and offers may change without notice.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      items: [
        'Amazon Air Duct Cleaning is not responsible for damages caused by incorrect information submitted by users or circumstances beyond our control.',
      ],
    },
    {
      heading: 'Intellectual Property',
      items: [
        'All content on this website (text, images, logos) belongs to Amazon Air Duct Cleaning and may not be used without permission.',
      ],
    },
  ],
  closing: 'By continuing to use this website, you agree to these terms.',
}

export const refundPolicy: LegalPageContent = {
  slug: 'refund-policy',
  title: 'Refund Policy',
  description:
    'Refund and satisfaction policy for Amazon Air Duct Cleaning. Contact us within 7 days if you are not satisfied with service.',
  intro: 'At Amazon Air Duct Cleaning, customer satisfaction is our top priority.',
  detailsHeading: 'Refund Policy Details',
  sections: [
    {
      heading: 'If you are not satisfied',
      intro:
        'If you are not satisfied with the service provided, please contact us within 7 days of your appointment. We will:',
      items: [
        'Re-perform the service at no additional cost, or',
        'Issue a full or partial refund depending on the situation',
      ],
    },
    {
      heading: 'Refund processing',
      paragraphs: ['Refunds are processed using the original payment method.'],
    },
    {
      heading: 'We do not provide refunds for',
      items: [
        'Services that were completed and approved on-site',
        'Issues caused by pre-existing system conditions or customer-provided information',
      ],
    },
    {
      heading: 'To request a refund, contact us at',
      items: ['support@amazonadc.com', '(800) 606-3334'],
    },
  ],
}

/** Seed source only — runtime reads from Payload via `@/utilities/legal`. */
export const legalPages = [privacyPolicy, termsOfService, refundPolicy]
