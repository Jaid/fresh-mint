import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import Switch from "react-switch";
import css from "./style.postcss"
import removals from "data/removals"

export default class RemovalSwitches extends React.Component {

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

    onChange = (id, value) => {
        if (value) {
            this.props.onChange([id, ...this.props.value])
        } else {
            this.props.onChange(this.props.value.filter(removal => removal !== id))
        }
    }

    render() {
        return this.props.schema.items.enum.map(id => {
            const removal = removals.find(findingRemoval => findingRemoval.id === id)
            return <div key={removal.id}>
                <Switch
                    className={css.switch}
                    checkedIcon=<span className={css.removeText}/>
                    uncheckedIcon={null}
                    width={100}
                    onColor="#d66464"
                    boxShadow="0 0 7px #00000066"
                    id={removal.id}
                    checked={this.props.value.includes(removal.id)}
                    onChange={value => this.onChange(removal.id, value)}
                />
                <label htmlFor={removal.id} className={classnames(css.label, this.props.value && css.removal)}>{removal.title}</label>
            </div>
        })
    }

}
