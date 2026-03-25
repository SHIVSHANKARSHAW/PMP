import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailtextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailtextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Email Service Failed Silently. Make sure that you have provided your MAILTRAP credentials in the .env file");
        console.error("Error: ", error);
    }
}


const emailVerificationContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we're excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#37e783",
                    text: "Verify Email",
                    link: verificationUrl
                },
            },
            outro: "Need help, or have questions? Just reply to this email we'd love to help :)",
        },
    };
}


const forgotPasswordContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the passowrd of your account",
            action: {
                instructions: "To reset your password please click on the following button",
                button: {
                    color: "#f14646",
                    text: "Reset Password",
                    link: verificationUrl
                },
            },
            outro: "Need help, or have questions? Just reply to this email we'd love to help :)",
        },
    };
}


export {
    emailVerificationContent, 
    forgotPasswordContent,
    sendEmail,
};

