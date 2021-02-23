import React from 'react'

const Button = ({ type, onClick, label }) => (
    <div className='button'>
        <button onClick={onClick}
            className={`button button-${type}`} >
            {label}
        </button>
    </div>
)

const ButtonSimples = ({ type, rota, onClick, label }) => {
    if (rota) {
        return (
                <Button type={type}
                    onClick={onClick}
                    label={label} />
        );
    } else {
        return (
            <Button type={type}
                onClick={onClick}
                label={label} />
        )
    }
}

export default ButtonSimples