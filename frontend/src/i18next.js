import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      "transact": "Transact",
      "transfer": "Transfer",
      "loan" : "Loan",
      "fixed deposit" : "Fixed Deposit",
      "trade" : "Trade",
      "hi": "Hi",
      "welcome to": "Welcome to अपनी Bachat",
      "credibility score": "Credibility Score",
      "check payments": "Check Payments",
      "my accounts": "My Accounts",
      "account age": "Account Age",
      "credits used": "Credits Used",
      "enquiry": "Enquiry",
    },
  },
  hi: {
    translation: {
      "transact": "लेनदेन",
      "transfer": "स्थानांतरण",
      "loan" : "ऋण",
      "fixed deposit" : "फिक्स्ड जमा",
      "trade" : "व्यापार",
      "hi": "नमस्ते",
      "welcome to": "अपनी बचत में आपका स्वागत है",
      "credibility score": "विश्वसनीयता स्कोर",
      "check payments": "भुगतान जांचें",
      "my accounts": "मेरे खाते",
      "account age": "खाते की उम्र",
      "credits used": "क्रेडिट उपयोग ",
      "enquiry": "जांच",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;