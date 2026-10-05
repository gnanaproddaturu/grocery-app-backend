

const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtpEmail = async (email, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "FreshCart <gnana6828@gmail.com>",
            to: [email],
            subject: "Your FreshCart OTP",
            html: `
                <div>
                    <h2>FreshCart Email Verification</h2>
                    <p>Your OTP is:</p>
                    <h1>${otp}</h1>
                    <p>This OTP is valid for 5 minutes.</p>
                </div>
            `,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log("OTP email sent:", data);

        return data;
    } catch (error) {
        console.error("Error while sending OTP email:", error);
        throw error;
    }
};

module.exports = {
    sendOtpEmail,
};