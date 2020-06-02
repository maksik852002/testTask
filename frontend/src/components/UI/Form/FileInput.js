import React, {createRef, useState} from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import {TextField, IconButton} from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    display: 'none'
  },
  cursorStyle: {
    cursor: 'pointer'
  }
});

const FileInput = ({onChange, name, label, placeholder, error, variant, size}) => {
  const classes = useStyles();

  const inputRef = createRef();

  const [filename, setFilename] = useState('');

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }
    onChange(e);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        name={name}
        className={classes.input}
        onChange={onFileChange}
        ref={inputRef}
      />
      <TextField
        fullWidth
        variant={variant ? variant : 'outlined'}
        label={label}
        value={filename}
        placeholder={placeholder}
        onClick={activateInput}
        error={!!error}
        inputProps={{
          className: classes.cursorStyle  
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton size={size}>
                <AttachFileIcon  edge="end"/>
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
    </>
  );
};

export default FileInput;