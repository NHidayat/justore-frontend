import PropTypes from 'prop-types';
import './formInput.css';

const FormInput = (props) => {
  const { id, name, label, required, errorMessage, onChange, ...inputProps } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} id={id} name={name} required={required} onChange={onChange} />
      <span>{errorMessage}</span>
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.any,
  onChange: PropTypes.func
};

export default FormInput;
