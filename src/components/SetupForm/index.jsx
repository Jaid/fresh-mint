import React from "react"
import PropTypes from "prop-types"
import Form from "react-jsonschema-form"
import schema from "./schema"
import InstallSwitches from "components/InstallSwitches"
import RemovalSwitches from "components/RemovalSwitches"
import css from "./style.scss"

const widgets = {
    installs: InstallSwitches,
    removals: RemovalSwitches
}

export default class SetupForm extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    // <span/> to get rid of submit button: https://github.com/mozilla-services/react-jsonschema-form/issues/705
    render() {
        return <Form className={css.form} schema={schema.schema} uiSchema={schema.ui} widgets={widgets} {...this.props}><button>Copy</button></Form>
    }

}
