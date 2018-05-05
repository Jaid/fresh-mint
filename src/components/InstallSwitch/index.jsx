import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Switch from "react-switch";
import css from "./style.postcss"

export default class InstallSwitch extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        autofocus: PropTypes.bool,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        schema: PropTypes.object.isRequired,
        readonly: PropTypes.bool,
        registry: PropTypes.object,
        onChange: PropTypes.func,
        options: PropTypes.object,
        value: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    onChange = value => {
        this.props.onChange(value)
    }

    render() {
        return <div className={css.container}>
            <Switch
                className={css.switch}
                checkedIcon=<span className={css.installText} />
                uncheckedIcon={null}
                width={100}
                onColor="#70c370"
                boxShadow="0 0 7px #00000066"
                id={this.props.id}
                checked={this.props.value}
                onChange={this.onChange}
            />
            <label htmlFor={this.props.id} className={classnames(css.label, this.props.value && css.install)}>{this.props.label}</label>
        </div>
    }

}
