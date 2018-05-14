import React from "react"
import PropTypes from "prop-types"
import lodash from "lodash"

export default class StringArray extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        newPlaceholer: PropTypes.string,
        removePlaceholer: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.any.isRequired
    }

    handleChange = (event, indexOfChange) => {
        this.props.onChange(this.props.value.map((value, index) => index === indexOfChange ? event.target.value : value))
    }

    handleAdd = event => {
        this.props.onChange(lodash.concat(this.props.value, [event.target.value]))
    }

    handleBlur = (event, indexOfRemoval) => {
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
            onChange={event => this.handleChange(event, index)}
            onBlur={event => this.handleBlur(event, index)}
        />)
        inputs.push(<input
            key={this.props.value.length}
            type="text"
            placeholder={this.props.newPlaceholer || "New"}
            value=""
            onChange={this.handleAdd}
        />)

        return <div className={this.props.className}>{inputs}</div>
    }

}
