import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { name, email, medicalNeeds, message } = data

    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'kagamiya33@163.com',
      subject: `New Medical Consultation Request from ${name}`,
      html: `
        <h2>New Consultation Request</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Medical Needs:</td>
            <td style="padding: 8px;">${medicalNeeds || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${message || 'No message provided'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">
          Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })}
        </p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    )
  }
}