import React from "react"
import PropTypes from "prop-types"
import Form from "react-jsonschema-form"
import schema from "./schema"
import InstallSwitch from "components/InstallSwitch"

const widgets = {
    install: InstallSwitch
}

export default class App extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    // <span/> to get rid of submit button: https://github.com/mozilla-services/react-jsonschema-form/issues/705
    render = () => <Form safeRenderCompletion={true} schema={schema.schema} uiSchema={schema.ui} widgets={widgets} onError={() => console.log(3)} {...this.props}><button>Copy</button></Form>

}
