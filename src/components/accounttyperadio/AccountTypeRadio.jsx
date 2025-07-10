import "./AccountTypeRadio.css"

function AccountTypeRadio({register, validationRules, errors, disabled, legendTitle}) {

    return (
        <fieldset>
            <legend className="radio-title">{legendTitle}</legend>

            <label htmlFor= "inwoner" className="radio-label">
                <input className="radio-button"
                    type= "radio"
                    id="Resident"
                    value= "RESIDENT"
                    {...register("accountType", validationRules)}
                    disabled={disabled}
                />
                Inwoner
            </label>

            <label htmlFor= "gemeente" className="radio-label">
                <input className="radio-button"
                    type= "radio"
                    id="Municipality"
                    value= "MUNICIPALITY"
                    {...register("accountType", validationRules)}
                    disabled={disabled}
                />
                Gemeente
            </label>

            {errors.accountType && (<p className="error-message">{errors.accountType.message}</p>
                )}
        </fieldset>
    );
}

export default AccountTypeRadio;