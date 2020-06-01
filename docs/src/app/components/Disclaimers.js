import React from 'react';
import { Row } from 'antd';

const Disclaimers = () => (
  <Row className="footer-copyright small">
    <div className="footer-copyright-text pr-2">
      &#169; Copyright {new Date().getFullYear()}, Sitecore. All Rights Reserved
    </div>{' '}
      |
    <a
      href="https://www.sitecore.com/trust"
      className="pl-2 pr-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      Legal
    </a>{' '}
      |
    <a
      href="https://www.sitecore.com/trust/privacy-policy"
      className="pl-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      Privacy
    </a>
  </Row>
);

export default Disclaimers;
