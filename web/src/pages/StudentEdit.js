import { React, useEffect } from 'react'
import { Link as RouterLink, useNavigate, useParams, } from 'react-router-dom'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../components/Input'

const schema = yup.object({
  fullName: yup.string().required(),
  address: yup.string().required(),
}).required()

export default function StudentEdit () {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      address: '',
    }
  })
  const { handleSubmit, reset } = methods
  const isEdit = !!studentId

  useEffect(() => {
    if (isEdit) {
      axios.get(`/students/${studentId}`).then(resp => {
        reset(resp.data)
      })
    }
  }, [isEdit, studentId, reset])

  const onSubmit = data => {
    console.log(data)
    const promise = isEdit
      ? axios.put(`/students/${studentId}`, data)
      : axios.post('/students', data)
    toast.promise(promise, {
      pending: 'Working...',
      success: `"${data.name}" ${isEdit ? 'updated' : 'created'} 👌`,
      error: 'Something unexpected happened 🤯'
    }).then(() => navigate('/students'))
  }

  return (
    <Paper>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box px={3} py={2}>
            <Typography variant='h6' margin='dense'>
              {isEdit ? 'Update' : 'Create'} student
            </Typography>
            <Grid container spacing={1} maxWidth='sm'>
              <Grid item xs={12} sm={12}>
                <Input name='fullName' label='Full name' placeholder='Jeannette Glover' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input name='address' label='Address' placeholder='147 Virgil Street, Pensacola, FL' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant='contained' type='submit'>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
            <hr />
            <br />
            <Button variant='outlined' component={RouterLink} to='/students'>Go back</Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  )
}
