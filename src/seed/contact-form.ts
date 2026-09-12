import { lexicalParagraphs } from '@/utilities/lexicalPlain'

export const contactFormSeed = {
  title: 'Contact Form',
  submitButtonLabel: 'Send',
  confirmationType: 'message' as const,
  confirmationMessage: lexicalParagraphs(['Your message has been sent. Thank you!']),
  fields: [
    {
      name: 'name',
      blockName: 'name',
      blockType: 'text' as const,
      label: 'Full name',
      required: true,
      width: 50,
    },
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email' as const,
      label: 'Email',
      required: true,
      width: 50,
    },
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'text' as const,
      label: 'Phone',
      required: true,
      width: 100,
    },
    {
      name: 'address',
      blockName: 'address',
      blockType: 'text' as const,
      label: 'Address',
      required: false,
      width: 100,
    },
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea' as const,
      label: 'Message',
      required: true,
      width: 100,
    },
  ],
  emails: [
    {
      emailTo: 'support@amazonadc.com',
      emailFrom: '"Amazon Air Duct Cleaning" <support@amazonadc.com>',
      replyTo: '{{email}}',
      subject: 'New website inquiry from {{name}}',
      message: lexicalParagraphs([
        'A new contact form submission:',
        'Name: {{name}}',
        'Email: {{email}}',
        'Phone: {{phone}}',
        'Address: {{address}}',
        'Message: {{message}}',
      ]),
    },
  ],
}
