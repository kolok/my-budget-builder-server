// here is our Mailer

'use strict'

import nodeMailer from 'nodemailer'
import pug from 'pug'
import path from 'path'

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'joe@oudard.org',
    pass: 'Joe://Oudard'
  }
})

class Mailer {
  constructor() {}

  async signUpMail(email, name) {

    const signupHTML = pug.compileFile(path.join(__dirname,'emailTemplates','signup','html.pug'))
    const signupText = pug.compileFile(path.join(__dirname,'emailTemplates','signup','text.pug'))
    const signupSubject = pug.compileFile(path.join(__dirname,'emailTemplates','signup','subject.pug'))

    let mailOptions = {
      from: '"Joe Oudard" <joe@oudard.org>', // sender address
      to: email, // list of receivers
      subject: signupSubject({name: name}), // Subject line
      text: signupText({name: name}), // plain text body
      html: signupHTML({name: name}) // html body
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
    })
  }

}

export default Mailer
