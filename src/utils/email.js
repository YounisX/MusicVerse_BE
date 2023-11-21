    import nodemailer from 'nodemailer';

    async function sendMail({ to, cc, bcc, subject, html, attachments = [] } = {}) {



        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let info = await transporter.sendMail({
            from:process.env.EMAIL,
            to,
            cc,
            bcc,
            subject,
            html,
            attachments
        })
        return info?.rejected.length?false:true;
    }

   export default sendMail;