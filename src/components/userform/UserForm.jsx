import "./UserForm.css"

function UserForm({type, name, label, validationRules, register, errors, disabled}) {

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label} * </label>
                <input className= "input-field"
                    placeholder={label}
                    type={type}
                    id={name}
                    {...register(name, validationRules)}
                    disabled={disabled}
                />

            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    );
}

export default UserForm