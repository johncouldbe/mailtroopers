import React from 'react'

import './Input.css'

export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
          this.input.focus()
        }
    }

    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
          error = <div className="form-error">{this.props.meta.error}</div>
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
              <div className="form-warning">{this.props.meta.warning}</div>
            )
        }

        return (
            <div className="form-input">
                <label htmlFor={this.props.input.name}>
                  {this.props.label}
                </label>
                <div className="p red-text" style={{fontSize: '12px'}}>{error}
                {warning}</div>
                <input
                  style={{fontFamily: '\'Scope One\', serif', fontSize: '16px', marginBottom: '10px'}}
                  className="border grey-text"
                  {...this.props.input}
                  id={this.props.input.name}
                  type={this.props.type}
                  ref={input => (this.input = input)}
                />

            </div>
        )
    }
}
