import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onValueChange) {
      this.props.onValueChange(this.props.fields.inputName.value, event.target.value);
    }
  }

  render() {
    const { fields, formValues } = this.props;
    let value = formValues[fields.inputName.value];
    if (!value) {
      value = '';
    }

    return (
      <div className="question">
        <Text tag="label" field={fields.label} />
        <input
          value={value}
          type="text"
          name={fields.inputName.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Question;
