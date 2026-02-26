import twilio from 'twilio'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendOtpSms = async (phone , otp) => {
    await client.message.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: phone 
    })
}

export default sendOtpSms;