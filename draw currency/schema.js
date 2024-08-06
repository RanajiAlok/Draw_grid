const currencySchema = {
    title: "Currency Options",
    type: "object",
    properties: {
      currency_denomination: {
        type: "string",
        title: "Currency Denomination"
      },
      currency_order: {
        type: "string",
        enum: ["ascending", "descending"],
        default: "descending",
        title: "Currency Order"
      }
    },
    required: ["currency_denomination"]
  };
  