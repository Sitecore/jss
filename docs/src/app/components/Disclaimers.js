import React from 'react';
import { Col } from 'antd';

const Disclaimers = () => (
  <React.Fragment>
    <Col className="footer-copyright small">
      © Copyright {new Date().getFullYear()}, Sitecore. All Rights Reserved.
    </Col>
    <Col className="footer-copyright small">
      <a
        href="https://www.sitecore.com/trust"
        className="pl-2 pr-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Legal
      </a>
      <a
        href="https://www.sitecore.com/trust/privacy-policy"
        className="pl-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy
      </a>
    </Col>
  </React.Fragment>
);

export default Disclaimers;
