import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import SitecoreContentService from '../../boot/SitecoreContentService';

export default class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: {},
    };
  }

  componentDidMount() {
    this.updateRoute(this.props.route);
  }

  updateRoute(route) {
    const component = this;
    SitecoreContentService.getRouteData(route, 'en').then((data) => {
      component.setState({
        routeData: data.sitecore.route,
      });
    });
  }

  render() {
    const { routeData } = this.state;
    const { onFormValueChange, formValues } = this.props;

    return routeData.placeholders ? (
      <Placeholder
        name="jss-main"
        rendering={routeData}
        onValueChange={onFormValueChange}
        formValues={formValues}
      />
    ) : (
      <div />
    );
  }
}
