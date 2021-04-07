interface Auth {
  user: string;
  pass: string;
}

interface Mail {
  service: string;
  host: string;
  port: number;
  auth: Auth;
}

const mail: Mail = {
  service: process.env.MAIL_SERVICE || "",
  host: process.env.MAIL_HOST || "",
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_EMAIL || "",
    pass: process.env.MAIL_PASSWORD || "",
  },
};

export default mail;
