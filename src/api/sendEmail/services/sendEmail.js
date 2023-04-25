'use strict';

/**
 * sendEmail service
 */

module.exports = ({ env }) => ({
  sendEmail: async (data) => {
    const email = process.env.SENDGRID_EMAIL;
    await strapi.plugins['email'].services.email.send({
      to: data.to,
      from: email, //e.g. single sender verification in SendGrid
      replyTo: email,
      subject: data.subject,
      text: data.text,
    });
  }, 
});
