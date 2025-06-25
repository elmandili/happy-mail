import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'elmandilimail@gmail.com',
        pass: 'wlunwmnrrgaafkfu' 
    }
});

export const sendMail = async (htmlContent, emailAdress) => {
    const mailOptions = {
        from: 'elmandilimail@gmail.com',
        to: emailAdress,
        subject: 'Happy Mail 📨',
        text: "test",
        html: htmlContent
    }

    transporter.sendMail(mailOptions,function (error, info){
        if(error){
            console.log("Error: ", error);
        } else {
            console.log("Email Sent: ", info.response);
        }
    })
}
