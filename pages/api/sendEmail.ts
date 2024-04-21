import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract form data from request body
      const body = JSON.parse(req.body);
      const { to, subject, text, html } = body;

      // Construct Mailgun API request parameters
      const formData = new FormData();
      formData.append('from', `Abiodun's Portfolio Website <${process.env.EMAIL_FROM}>`);
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('text', text);
      formData.append('html', html);

      // Make POST request to Mailgun API
      const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
        },
        body: formData,
      });

      if (response.ok) {
        // Return success response
        res.status(response.status).json({ status: response.status, message: 'Email sent successfully' });
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error sending email:', errorData);
        res.status(response.status).json({ status: response.status, message: 'Failed to send email' });
      }
    } catch (error) {
      // Return error response
      console.error('Error sending email:', error);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  } else {
    // Return error if request method is not allowed
    res.status(405).json({ status: 500, message: 'Method Not Allowed' });
  }
}
