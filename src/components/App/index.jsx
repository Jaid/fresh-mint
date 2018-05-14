import React from "react"
import BareHighlight from "react-fast-highlight/lib/BareHighlight"
import highlight from "./highlight";
import highlightCss from "highlight.js/styles/atom-one-dark.css" // eslint-disable-line no-unused-vars
import css from "./style.scss"
import SetupForm from "components/SetupForm"
import compileBash from "../../compiler"
import defaultSetup from "data/defaultSetup.yml"
import icon from "config/icon.png"

class App extends React.Component {

    constructor() {
        super()
        this.state = {formData: defaultSetup}
    }

    handleFormChange = ({formData}) => {
        this.setState({formData})
    }

    render() {
        return <div className={css.content}>
            <div className={css.controls}>
                <img className={css.icon} src={icon}/><span className={css.title}>Fresh Mint</span>
                <SetupForm onChange={this.handleFormChange} formData={this.state.formData}/>
            </div>
            <BareHighlight highlightjs={highlight} languages={["bash"]} className={css.code}>{compileBash(this.state.formData)}</BareHighlight>
        </div>
    }

}

export default process.env.NODE_ENV === "development" ? require("react-hot-loader").hot(module)(App) : App
