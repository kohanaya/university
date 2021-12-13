import { React } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import { Typography } from '@mui/material'

// https://react-hook-form.com/api/usecontroller
export function RadioButtons ({ label, name, options }) {
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
      <FormControl component='fieldset' margin='normal'>
        <FormLabel component='legend'>{label}</FormLabel>
        <RadioGroup
          row name='row-radio-buttons-group'
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        >
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
              name={name}
              color={!!errors[name]?.message ? 'error' : 'default'}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
        <Typography variant='inherit' color='textSecondary'>
          {errors[name]?.message}
        </Typography>
      </FormControl>
    </>
  )
}
