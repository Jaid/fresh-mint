import React from "react"
import PropTypes from "prop-types"
import lodash from "lodash"

export default class StringArray extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        newPlaceholer: PropTypes.string,
        removePlaceholer: PropTypes.string,
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

    onChange = (event, indexOfChange) => {
        this.props.onChange(this.props.value.map((value, index) => index === indexOfChange ? event.target.value : value))
    }

    onAdd = event => {
        this.props.onChange(lodash.concat(this.props.value, [event.target.value]))
    }

    onBlur = (event, indexOfRemoval) => {
        if (!event.target.value.length) {
            this.props.onChange(this.props.value.filter((value, index) => index !== indexOfRemoval))
        }
    }

    render() {
        const inputs = this.props.value.map((string, index) => <input
            key={index}
            type="text"
            placeholder={this.props.removePlaceholer || "Remove"}
            value={string}
            onChange={event => this.onChange(event, index)}
            onBlur={event => this.onBlur(event, index)}
        />)
        inputs.push(<input
            key={this.props.value.length}
            type="text"
            placeholder={this.props.newPlaceholer || "New"}
            value=""
            onChange={this.onAdd}
        />)

        return <div className={this.props.className}>{inputs}</div>
    }

}
