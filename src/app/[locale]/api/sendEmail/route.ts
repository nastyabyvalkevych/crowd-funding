import { transporter } from "@/config/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, description, phone } = await request.json();

    const mailOption = {
      // from: "careeros@tryporpra.com",
      to: "nastuly72@gmail.com",
      subject: "Лист Ukranian Aid Fund",
      html: `
        <h2>Допомога потрібна ${name}</h2>
        <h4>Номер телефону: ${phone}</h4>
        <h4>Ел. пошта: ${email}</h4>
      <h4>Звернення: ${description}</h4>
  
        `,
      // attachments: [{ filename: attachments.file.name, path:attachments.file.uid}],
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 },
    );
  }
}
