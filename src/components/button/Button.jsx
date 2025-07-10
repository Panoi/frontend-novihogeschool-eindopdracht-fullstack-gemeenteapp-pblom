import "./Button.css"

function Button({loading, buttonFunction, type, onClickEffect, className}) {

    return (
        <button className={className}
         type={type}
                disabled={loading}
                onClick={onClickEffect}
        > {buttonFunction}
        </button>
    )
}

export default Button;