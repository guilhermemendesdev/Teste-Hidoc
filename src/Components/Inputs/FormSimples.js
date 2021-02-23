import React, { Component } from 'react';

export default class FormSimples extends Component {
    render(){
        const { value, name, placeholder, type,style, label, onChange, erro } = this.props;
        return (
            <div className={`form-input`}>
                { label && <label>{label}</label> }
                <input className={style} type={type} value={value} name={name} placeholder={placeholder} onChange={onChange} />
                {
                    erro && (
                        <small className="erro">{erro}</small>
                    )
                }
            </div>
        )
    }
}