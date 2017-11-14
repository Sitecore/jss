import React from 'react';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            formValue: event.target.value
        });
        var fields = this.props.fields;
        if (this.props.onValueChange) {
            this.props.onValueChange(this.props.fields.inputName.value, event.target.value);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fields.inputName.value != prevProps.fields.inputName.value) {
            this.setState({
                formValue: ''
            });
        }
    }

    render() {
        const fields = this.props.fields;
        return <div className="question">
            <label htmlFor={fields.inputName.value} dangerouslySetInnerHTML={{__html: fields.label.editable}} />
            <input value={this.state.formValue} type="text" name={fields.inputName.value} onChange={this.handleChange} />
        </div>;
    }
}

export default Question;