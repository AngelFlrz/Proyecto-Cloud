// pages/api/send-alert.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productName, quantity } = req.body;

    const msg = {
      to: 'angelmflorez15@gmail.com', // destinatario
      from: 'pinturillojuanso@gmail.com', // remitente verificado en SendGrid
      subject: `Alerta de stock bajo para ${productName}`,
      text: `El producto "${productName}" tiene solo ${quantity} unidades disponibles.`,
      html: `<strong>El producto "${productName}" tiene solo ${quantity} unidades disponibles.</strong>`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Alerta enviada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
