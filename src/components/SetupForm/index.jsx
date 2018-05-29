import React from "react"
import PropTypes from "prop-types"
import Form from "react-jsonschema-form"
import schema from "./schema"
import css from "./style.scss"
import lodash from "lodash"
import {CopyToClipboard} from "react-copy-to-clipboard";

export default class SetupForm extends React.Component {

    static propTypes = {
        code: PropTypes.string.isRequired,
        className: PropTypes.string,
        onChange: PropTypes.func,
        onPermalink: PropTypes.func,
        onCopy: PropTypes.func
    }

    render() {
        return <Form className={css.form} schema={schema.schema} uiSchema={schema.ui} {...this.props}>
            <CopyToClipboard text={this.props.code} onCopy={this.props.onCopy || lodash.noop}>
                <button type="button">Copy</button>
            </CopyToClipboard>
            <button type="button" onClick={this.props.onPermalink || lodash.noop}>Permalink</button>
        </Form>
    }

}
