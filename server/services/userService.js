import twilio from 'twilio'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendOtpSms = async (phone , otp) => {
    await client.message.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phone 
    })
}
