import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()
    console.log({ testAccount })

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    })
    try {
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to,
            subject: 'Change password',
            html,
        })
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    } catch (e) {
        console.log(e)
    }
}
