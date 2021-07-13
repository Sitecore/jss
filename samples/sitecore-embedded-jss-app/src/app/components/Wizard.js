import React from 'react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Step from './Step';

class Wizard extends React.Component {
  state = {
    formValues: {},
    step: 0,
  };

  constructor(props) {
    super(props);

    this.onFormValueChange = this.onFormValueChange.bind(this);
  }

  componentDidMount() {
    console.log('Here should be wizard');
  }

  onFormValueChange(fieldName, value) {
    const formValues = { ...this.state.formValues };
    formValues[fieldName] = value;
    this.setState({
      formValues,
    });
  }

  selectNextStep = () => this.setState({ step: this.state.step + 1 });

  selectPreviousStep = () => this.setState({ step: this.state.step - 1 });

  renderStepName = (step, i) => (
    <span key={step.name} className={`wizard-step-name ${i === this.state.step ? 'selected' : ''}`}>
      {step.name}
    </span>
  );

  renderNavigation = (stepsCount) => (
    <div className="wizard-navigation">
      {this.state.step !== 0 && stepsCount ? (
        <button onClick={this.selectPreviousStep}>Previous</button>
      ) : (
        <div />
      )}
      {this.state.step !== stepsCount - 1 && stepsCount && (
        <button onClick={this.selectNextStep}>Next</button>
      )}
    </div>
  );

  renderEditing = (childSteps) => (
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

  render() {
    const { rendering, sitecoreContext } = this.props;
    const childSteps = rendering.fields.data.item.children;

    if (sitecoreContext.pageEditing) {
      return this.renderEditing(childSteps);
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
      <div className="wizard">
        <div className="wizard-steps">{steps.map(this.renderStepName)}</div>
        <div className="wizard-step">{steps[this.state.step].component}</div>
        {this.renderNavigation(steps.length)}
      </div>
    );
  }
}

export default withSitecoreContext()(Wizard);
