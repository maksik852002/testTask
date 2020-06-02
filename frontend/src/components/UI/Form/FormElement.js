import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import FileInput from './FileInput';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      input: {
        fontSize: 13,
        padding: '6px 0 7px'
      },
    },
  },
});

const FormElement = (props) => {

  let inputChildren = undefined;

  if (props.type === 'select') {
    inputChildren = props.options.map(el => (
      <MenuItem key={el.id} value={el.id}>
        {el.title}
      </MenuItem>
    ));
  }

  let inputComponent = (
    <ThemeProvider theme={theme}>
      <TextField
        variant={ props.variant ? props.variant : 'outlined' }
        fullWidth
        label={props.title}
        error={!!props.error}
        type={props.type}
        select={props.type === 'select'}
        name={props.propertyName}
        id={props.propertyName}
        value={props.value}
        defaultValue={props.default}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        children={inputChildren}
        helperText={props.error}
        size={props.size}
      >
        {inputChildren}
      </TextField>
    </ThemeProvider>
  );

  if (props.type === "file") {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        variant={props.variant}
        onChange={props.onChange}
        placeholder={props.placeholder}
        size={props.size}
      />
    );
  }

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default FormElement;
