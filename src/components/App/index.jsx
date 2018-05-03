import React from "react"
import BareHighlight from "react-fast-highlight/lib/BareHighlight"
import highlight from "./highlight";
import highlightCss from "highlight.js/styles/atom-one-dark.css" // eslint-disable-line no-unused-vars
// import bootstrap from "bootstrap"
import "./theme.scss"
import css from "./style.postcss"
import Form from "components/Form"
import compileBash from "../../compiler"

export default class App extends React.Component {

    constructor() {
        super()
        this.state = {formData: {}}
    }

    onFormChange = ({formData}) => {
        this.setState({formData}) // Breaking and apparently unfixable: https://github.com/mozilla-services/react-jsonschema-form/issues/513
    }

    render = () => <div className={css.content}>
        <Form className={css.form} onChange={this.onFormChange}/>
        <BareHighlight highlightjs={highlight} languages={["bash"]} className={css.code}>{compileBash(this.state.formData)}</BareHighlight>
    </div>

}
