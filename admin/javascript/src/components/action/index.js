import React from 'react';
import ReactDOM from 'react-dom';
import SilverStripeComponent from 'silverstripe-component';

class ActionComponent extends SilverStripeComponent {
    render() {
        return (
            <button className={this.getButtonClasses()}>
                {this.props.text}
            </button>
        );
    }

    getButtonClasses() {
        var buttonClasses = 'btn';

        //If there is no text
        if (this.props.text === '') {
        	buttonClasses += ' no-text';
        }

        //Add 'type' class
        if (this.props.type === 'danger') {
            buttonClasses += ' btn-danger';
        } else if (this.props.type === 'success') {
            buttonClasses += ' btn-success';
        } else if (this.props.type === 'primary') {
            buttonClasses += ' btn-primary';
        } else if (this.props.type === 'link') {
            buttonClasses += ' btn-link';
        } else if (this.props.type === 'secondary') {
            buttonClasses += ' btn-secondary';
        } else if (this.props.type === 'complete') {
            buttonClasses += ' btn-success-outline';
        } 

        //Add icon class
        if (typeof this.props.icon !== 'undefined') {
            buttonClasses += ` font-icon-${this.props.icon}`;
        }

        return buttonClasses;
    }
}

ActionComponent.propTypes = {
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    text: React.PropTypes.string
};

export default ActionComponent;
