import "./TextArea.css"
import "../userform/UserForm.css"

function TextArea({name, errors, register, validationRules, rows, cols, label, textAreaDiv, placeholder}) {

    return (
        <div className={textAreaDiv}>
        <label htmlFor={name} className="form-label">
            {label} </label>
        <textarea className="input-field textarea"
            id={name}
            name={name}
            rows= {rows}
            cols= {cols}
                  placeholder={placeholder}
            {...register(name, validationRules)}
            />

    {errors[name] && <p className="error-message">{errors[name].message}</p>}

</div>
    );
}

export default TextArea;