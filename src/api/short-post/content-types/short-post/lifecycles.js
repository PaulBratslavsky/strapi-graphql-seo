module.exports = {

  async afterCreate(event) {
    const { result } = event;

    console.log(result, "afterCreate called")
    
    const emailData = {
      to: "paul.bratslavsky@strapi.io",
      subject: "New AI Article Was Published",
      text: `The article ${result.title} has been published.`
    }

    console.log(emailData, "Sending Email")
    await strapi.service("api::send-email.send-email").sendEmail(emailData)
  },
};


