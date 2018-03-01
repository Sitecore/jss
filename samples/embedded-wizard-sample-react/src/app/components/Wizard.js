import React from 'react';
import StepZilla from './StepZillaPatched';
import Step from './Step';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

const Wizard = ({ rendering, sitecoreContext }) => {
  if (sitecoreContext.pageEditing) {
    return renderEditing(rendering);
  }

  /* Some creative use of route data here to allow Stepzilla to manage state. */
  const steps = rendering.placeholders.steps.map((step) => {
    return {
      name: step.fields.stepName.value,
      component: <Step route={step.fields.stepLink.value.href} />
    }
  });

  return <div className='step-progress'>
    <StepZilla steps={steps} dontValidate={true} />
  </div>
}

const renderEditing = (rendering, context) => {
  return <div>
    <h1>Wizard Steps</h1>
    <ol>
      <Placeholder name="steps" rendering={rendering} context={context} />
    </ol>
  </div>;
}

export default withSitecoreContext()(Wizard);