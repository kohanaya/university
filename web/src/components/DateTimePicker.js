import TextField from './Input'
import { React } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { default as MaterialPicker } from '@mui/lab/DateTimePicker'

export default function DateTimePicker ({ name, label }) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const {
    field: { onChange, value, ref }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  return (
    <div>
      <MaterialPicker
        label={label}
        value={value}
        onChange={onChange}
        inputRef={ref}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  )
}
