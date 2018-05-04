import React from "react"
import PropTypes from "prop-types"
import Form from "react-jsonschema-form"
import schema from "./schema"
import InstallSwitch from "components/InstallSwitch"

const widgets = {
    install: InstallSwitch
}

export default class SetupForm extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func,
        onInit: PropTypes.func
    }

    onRef = form => {
        if (this.props.onInit) {
            this.props.onInit(form.state)
        }
    }

    // <span/> to get rid of submit button: https://github.com/mozilla-services/react-jsonschema-form/issues/705
    render = () => <Form schema={schema.schema} uiSchema={schema.ui} widgets={widgets} ref={this.onRef} {...this.props}><button>Copy</button></Form>

}
