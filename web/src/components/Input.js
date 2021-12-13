import { React } from 'react'
import { TextField, Typography } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

export default function Input ({ label, placeholder, name, minRows = 1, maxRows = 1, multiline = false }) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const {
    field: { onChange, onBlur, value, ref }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  return (
    <>
      <TextField
        margin='normal'
        size='small'
        fullWidth
        label={label}
        placeholder={placeholder}
        error={!!errors[name]}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        inputRef={ref}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
      />
      <Typography variant='inherit' color='textSecondary'>
        {errors[name]?.message}
      </Typography>
    </>
  )
}
