import React from "react"
import PropTypes from "prop-types"
import Form from "react-jsonschema-form"
import schema from "./schema"
import css from "./style.scss"

export default class SetupForm extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func
    }

    // <span/> to get rid of submit button: https://github.com/mozilla-services/react-jsonschema-form/issues/705
    render() {
        return <Form className={css.form} schema={schema.schema} uiSchema={schema.ui} {...this.props}>
            <button type="button">Copy</button>
        </Form>
    }

}
