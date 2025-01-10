const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AQipWo9VfjfSg78UrS4c_NibUgwPL_A2om6bhB_c7JxhAu_U8g8tiw6DrVVMSDPg-OmG8P3QSFMBgl4d",
  client_secret: "ED7KXYa6fN1cVtUazLyMruEfvhpPoGx-O4FxI9DtI6pMiixxCBh4rADIq4yFQL0MGPvgN6BleiZfgUGq",
});

module.exports = paypal;
