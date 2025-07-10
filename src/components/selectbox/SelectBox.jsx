import Select from "react-select";
import {Controller} from "react-hook-form";
import "./SelectBox.css"

function SelectBox({
                       name,
                       options,
                       errors,
                       control,
                       validationRules,
                       label,
                       placeholder,
                       selectLabel,
                       selectInput,
                       selectDiv,
                       disabled,
                       onChange
                   }) {

    return (
        <div className={selectDiv}>
            <label htmlFor={name} className={selectLabel}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={validationRules}
                render={({field}) => (
                    <Select className={selectInput}
                            {...field}
                            onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                if (onChange) onChange(selectedOption);
                            }}
                            options={options}
                            placeholder={placeholder}
                            isSearchable
                            isDisabled={disabled}
                            menuShouldScrollIntoView={false}
                            menuPosition="fixed"
                    />
                )}
            />
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    );
}

export default SelectBox;