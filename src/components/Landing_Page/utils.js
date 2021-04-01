export const messageOnWhatsAppWeb = () => {
  const _adminMobile = process.env.REACT_APP_ADMIN_MOBILE;
  const _message = "Hello, This is a Dummy Message";
  const _whatsAppWebUrl = `https://api.whatsapp.com/send?phone=${_adminMobile}&text=${_message}`;
  console.log("Mobile :", _adminMobile);
  console.log("Mobile :", _whatsAppWebUrl);

  window.open(_whatsAppWebUrl, "_blank");
};

export const callOnMobile = () => {
  const _adminMobile = process.env.REACT_APP_ADMIN_MOBILE;

  window.open(`tel:${_adminMobile}`, "_blank");
};
