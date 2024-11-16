import nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";

type Profile = {
  name: string;
  email: string;
};

interface EmailOptions {
  profile: Profile;
  subject: "verification" | "forgot-password" | "password-changed";
  linkUrl?: string;
}

const TOKEN = process.env.MAILTRAP_TOKEN as string;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "nextecom@demomailtrap.com",
  name: "Next Ecom Verification",
};

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3121861414a3d9",
      pass: "bc8c64e5b61b9e",
    },
  });
  return transport;
};

const sendEmailVerificationLink = async (profile: Profile, linkUrl: string) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>Please verify your email by click on <a href=${linkUrl}>this link</a> </h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  // client.send({
  //   from: sender,
  //   to: recipients,
  //   subject: "Verify Your Email",
  //   text: `<h1>Please verify your email by click on <a href=${linkUrl}>this link</a> </h1>`,
  //   category: "Email verification",
  // });

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Verify Your Email",
      user_name: profile.name,
      link: linkUrl,
      btn_title: "Click Me to Verify Email",
      company_name: "Next Ecom",
    },
  });
};

const sendForgotPasswordLink = async (profile: Profile, linkUrl: string) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>click on <a href=${linkUrl}>this link</a> to reset your password</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  // client.send({
  //   from: sender,
  //   to: recipients,
  //   subject: "Forget Password Link",
  //   text: `<h1>click on <a href=${linkUrl}>this link</a> to reset your password</h1>`,
  //   category: "Forget Password Link",
  // });

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Forget Password Link",
      user_name: profile.name,
      link: linkUrl,
      btn_title: "Reset Password",
      company_name: "Next Ecom",
    },
  });
};

const sendUpdatePasswordConfirmation = async (profile: Profile) => {
  // const transport = generateMailTransporter();

  // await transport.sendMail({
  //   from: "verification@nextecom.com",
  //   to: profile.email,
  //   html: `<h1>your password is changed click on <a href=${process.env.SIGN_IN_URL}>this link</a> to sign in.</h1>`,
  // });

  const recipients = [
    {
      email: profile.email,
    },
  ];

  // client.send({
  //   from: sender,
  //   to: recipients,
  //   subject: "Password Reset",
  //   text: `<h1>your password is changed click on <a href=${process.env.SIGN_IN_URL}>this link</a> to sign in.</h1>`,
  //   category: "Password Reset",
  // });

  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Password Reset Successful",
      user_name: profile.name,
      link: process.env.SIGN_IN_URL!,
      btn_title: "Sign in",
      company_name: "Next Ecom",
    },
  });
};

export default async function sendMail({
  profile,
  subject,
  linkUrl,
}: EmailOptions) {
  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forgot-password":
      return sendForgotPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
}
