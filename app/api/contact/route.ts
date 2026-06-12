import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

function genSign(secret: string, timestamp: number): string {
  const stringToSign = `${timestamp}\n${secret}`;
  const hmac = crypto.createHmac('sha256', stringToSign);
  return hmac.digest('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, medicalNeeds, message, country, phone } = await request.json();

    if (!fullName || !email || !country || !medicalNeeds) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
    const secret = process.env.FEISHU_WEBHOOK_SECRET;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const body: Record<string, unknown> = {
      timestamp: String(timestamp),
      sign: genSign(secret || '', timestamp),
      msg_type: 'interactive',
      card: {
        header: {
          title: { content: '🩺 新客户咨询', tag: 'plain_text' },
          template: 'green'
        },
        elements: [
          { tag: 'div', text: { content: `**姓名：** ${fullName}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**国家：** ${country}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**邮箱：** ${email}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**电话/WhatsApp：** ${phone || '未提供'}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**需求：** ${medicalNeeds}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**留言：** ${message || '无'}`, tag: 'lark_md' } },
          { tag: 'div', text: { content: `**时间：** ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`, tag: 'lark_md' } }
        ]
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error('Feishu webhook failed');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
