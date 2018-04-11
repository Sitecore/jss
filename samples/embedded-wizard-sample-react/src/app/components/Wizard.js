import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
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
    if (sitecoreContext.pageEditing) {
      return renderEditing(rendering);
    }

    /* Some creative use of route data here to allow Stepzilla to manage state. */
    const steps = rendering.placeholders.steps.map((step, index) => ({
      name: step.fields.stepName.value,
      component: (
        <Step
          route={step.fields.stepLink.value.href}
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

const renderEditing = (rendering, context) => (
  <div>
    <h1>Wizard Steps</h1>
    <ol>
      <Placeholder name="steps" rendering={rendering} context={context} />
    </ol>
  </div>
);

export default withSitecoreContext()(Wizard);
