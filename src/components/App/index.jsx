import React from "react"
import BareHighlight from "react-fast-highlight/lib/BareHighlight"
import highlight from "./highlight";
import highlightCss from "highlight.js/styles/atom-one-dark.css" // eslint-disable-line no-unused-vars
// import bootstrap from "bootstrap"
import "./theme.scss"
import css from "./style.postcss"
import SetupForm from "components/SetupForm"
import compileBash from "../../compiler"
import defaultSetup from "data/defaultSetup.yml"
import {hot} from "react-hot-loader"

class App extends React.Component {

    constructor() {
        super()
        this.state = {formData: defaultSetup}
    }

    onFormChange = ({formData}) => {
        this.setState({formData})
    }

    render() {
        return <div className={css.content}>
            <SetupForm className={css.form} onChange={this.onFormChange} formData={this.state.formData} onInit={this.onFormChange} />
            <BareHighlight highlightjs={highlight} languages={["bash"]} className={css.code}>{compileBash(this.state.formData)}</BareHighlight>
        </div>
    }

}

// export default process.env.NODE_ENV === "development" ? hot(module)(App) : App
export default hot(module)(App)
