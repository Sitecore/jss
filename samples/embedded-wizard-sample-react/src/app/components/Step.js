import React from 'react';
import DataProvider from 'data-provider';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

class Step extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeData: {},
            formValues: {}
        };

        this.onFormValueChange = this.onFormValueChange.bind(this);
    }

    componentDidMount() {
        this.updateRoute(this.props.route);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.route != prevProps.route) {
            this.updateRoute(this.props.route);
        }
    }

    onFormValueChange(fieldName, value) {
        const formValues = this.state.formValues;
        formValues[fieldName] = value;
        this.setState({
            formValues
        });
    }

    updateRoute(route) {
        const component = this;
        DataProvider.getRouteData(route, 'en').then((data) => {
            component.setState({
                routeData: data.sitecore.route
            });
        });
    }

    render() {
        return this.state.routeData.placeholders ?
            <div className="wizard-step">
                <Placeholder name="main"
                    rendering={this.state.routeData}
                    onValueChange={this.onFormValueChange}
                    formValues={this.state.formValues} />
            </div>
            : <div />;
    }
}

export default Step;