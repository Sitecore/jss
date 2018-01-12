import React from 'react';
import PropTypes from 'prop-types';
import { commonComponent } from 'enhancers';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Row, Col, Tab, Nav, NavItem } from 'react-bootstrap';
import { Text } from '@sitecore-jss/sitecore-jss-react';

const Tabs = ({ style, rendering, sitecoreContext, ...otherProps }) => (
  <Tab.Container id="tabContainer" className="tabs" defaultActiveKey="0">
    <Row className="clearfix">
      <Col sm={4}>
        <Nav bsStyle="pills" stacked style={sitecoreContext.pageEditing ? { display: 'none' } : {}}>
          {
            (rendering.placeholders.tabs || [])
              .filter(tab => tab && tab.fields && tab.fields.title)
              .map((tab, index) => (
                <NavItem eventKey={tab.fields.title.value} key={`${tab.fields.title.value}${index}`} >
                   <Text field={tab.fields.title} tag="span" />
                </NavItem>))
          }
        </Nav>
      </Col>
      <Col sm={8}>
        <Tab.Content animation>
          <Placeholder name="tabs" rendering={rendering} sitecoreContext={sitecoreContext} {...otherProps} />
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>);

Tabs.propTypes = {
  style: PropTypes.object,
  rendering: PropTypes.object,
  sitecoreContext: PropTypes.object,
};

export default commonComponent(Tabs);
