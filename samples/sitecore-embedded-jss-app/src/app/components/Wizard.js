import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import StepZilla from './StepZillaPatched';
import Step from './Step';

class Wizard extends React.Component {
  state = {
    formValues: {},
  };

  constructor(props) {
    super(props);

    this.onFormValueChange = this.onFormValueChange.bind(this);
  }

  onFormValueChange(fieldName, value) {
    const formValues = { ...this.state.formValues };
    formValues[fieldName] = value;
    this.setState({
      formValues,
    });
  }

  render() {
    const { rendering, sitecoreContext } = this.props;
    const childSteps = rendering.fields.data.item.children;

    if (sitecoreContext.pageEditing) {
      return renderEditing(childSteps);
    }

    const steps = childSteps.map((step, index) => ({
      name: step.displayName,
      component: (
        <Step
          route={step.url}
          onFormValueChange={this.onFormValueChange}
          formValues={this.state.formValues}
          key={`step${index}`}
        />
      ),
    }));

    return (
      <div className="step-progress">
        <StepZilla steps={steps} dontValidate={true} />
      </div>
    );
  }
}

const renderEditing = (childSteps, context) => (
  <div>
    <h1>Wizard Steps</h1>
    <ol>
      {childSteps.map((step) => (
        <li key={step.url}>
          <a href={step.url}>{step.displayName}</a>
        </li>
      ))}
    </ol>
  </div>
);

export default withSitecoreContext()(Wizard);
