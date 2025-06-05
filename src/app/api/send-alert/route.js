// pages/api/send-alert.js
import { NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';





sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { nombre, cantidad } = await req.json();

    const msg = {
      to: 'angelmflorez15@gmail.com', // Cambia esto
      from: 'pinturillojuanso@gmail.com', // Este debe estar verificado en SendGrid
      subject: `⚠️ Alerta de bajo stock: ${nombre}`,
      text: `El producto "${nombre}" tiene solo ${cantidad} unidades.`,
    };

    await sendgrid.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al enviar correo' }, { status: 500 });
  }
}
