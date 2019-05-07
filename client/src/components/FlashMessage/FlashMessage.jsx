import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeFlashMessage } from '../../redux/actions/index';
import './FlashMessage.css'

class FlashMessage extends Component {
    close = () => {
        console.log('Close FlashMessage');
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
        }
        this.props.removeFlashMessage({});
    }

    setClosingTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null
        }

        this.timeout = setTimeout(() => {
            console.log('FlashMessage Timed Out');
            this.props.removeFlashMessage({});
        }, 7000);
    }

    componentWillMount() {
        this.setClosingTimeout();
    }

    componentWillUpdate() {
        this.setClosingTimeout();
    }

    render() {
        const {flashMessageType, flashMessageText} = this.props;
        var alertType = 'alert-info'; // purple
        if(flashMessageType === 'Success')
            alertType = 'alert-success';  // green
        else if(flashMessageType === 'Error')
            alertType = 'alert-danger';  // red
        else if (flashMessageType === 'Info')
            alertType = 'alert-primary';  // blue
        else if (flashMessageType === 'Warning')
            alertType = 'alert-warning';  // orange

        return (
            <div className={"alert alert-dismissible " + alertType + " text-center stick-flash-message"}>
                <button onClick={this.close} type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>{flashMessageType}!</strong> {flashMessageText}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
  }
  
  function matchDispatchToProps(dispatch) {
    // Map now I can dispatch action like this.props.actionName(payload)
    return bindActionCreators({
      removeFlashMessage: removeFlashMessage
    }, dispatch)
  }
  
export default connect(mapStateToProps, matchDispatchToProps)(FlashMessage);