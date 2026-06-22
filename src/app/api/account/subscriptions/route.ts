import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    items: [
      { id: 'mct_professional', planName: 'MCT Professional', renewalDate: '2027-06-30', paymentStatus: 'Paid', users: 8 },
      { id: 'mct_business', planName: 'MCT Business', renewalDate: '2027-09-30', paymentStatus: 'Invoice requested', users: 21 },
    ],
  });
}
