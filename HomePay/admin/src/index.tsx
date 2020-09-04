import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "styles/template/dashforge.scss";
import "styles/template/pages/auth.scss";
import "styles/template/pages/calendar.scss";
import "styles/template/pages/chat.scss";
import "styles/template/pages/contacts.scss";
import "styles/template/pages/dashboard.scss";
import "styles/template/pages/demo.scss";
import "styles/template/pages/filemgr.scss";
import "styles/template/pages/mail.scss";
import "styles/template/pages/profile.scss";
import "styles/customize.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
