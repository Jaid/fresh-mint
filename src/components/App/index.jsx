import React from "react"
import {ToastContainer} from "react-toastify"
import BareHighlight from "react-fast-highlight/lib/BareHighlight"
import highlight from "./highlight";
import highlightCss from "highlight.js/styles/atom-one-dark.css" // eslint-disable-line no-unused-vars
import css from "./style.scss"
import SetupForm from "components/SetupForm"
import compileBash from "../../compiler"
import hashState from "lib/hashState"
import defaultSetup from "data/defaultSetup.yml"
import icon from "config/icon.png"
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify"

class App extends React.Component {

    constructor() {
        super()
        const formData = hashState.get() || defaultSetup
        this.state = {
            formData,
            code: compileBash(formData)
        }
    }

    handleFormChange = ({formData}) => {
        this.setState({
            formData,
            code: compileBash(formData)
        })
    }

    handleCopy = () => {
        toast("Copied to clipboard!")
    }

    handlePermalink = () => {
        hashState.set(this.state.formData)
        toast("Updated URL bar!")
    }

    render() {
        return <div className={css.content}>
            <ToastContainer toastClassName={css.toast} progressClassName={css.toastProgressBar}/>
            <div className={css.controls}>
                <img className={css.icon} src={icon}/><span className={css.title}>Fresh Mint</span>
                <SetupForm onChange={this.handleFormChange} onCopy={this.handleCopy} onPermalink={this.handlePermalink} code={this.state.code} formData={this.state.formData}/>
            </div>
            <BareHighlight highlightjs={highlight} languages={["bash"]} className={css.code}>{this.state.code}</BareHighlight>
        </div>
    }

}

export default process.env.NODE_ENV === "development" ? require("react-hot-loader").hot(module)(App) : App
