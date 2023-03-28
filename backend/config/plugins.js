module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "u2404055@uel.ac.uk",
        defaultReplyTo: "u2404055@uel.ac.uk",
      },
    },
  },
});
