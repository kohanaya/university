import { React, useEffect } from 'react'
import { Link as RouterLink, useNavigate, useParams, } from 'react-router-dom'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../components/Input'
import { RadioButtons } from '../components/RadioButtons'

const schema = yup.object({
  number: yup.string().required(),
  name: yup.string().required(),
  location: yup.string().required(),
  time: yup.string().required(),
}).required()

export default function CourseEdit () {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      number: '',
      name: '',
      location: '',
      time: ''
    }
  })
  const { handleSubmit, reset } = methods
  const isEdit = !!courseId

  useEffect(() => {
    if (isEdit) {
      axios.get(`/courses/${courseId}`).then(resp => {
        reset(resp.data)
      })
    }
  }, [isEdit, courseId, reset])

  const onSubmit = data => {
    const promise = isEdit
      ? axios.put(`/courses/${courseId}`, data)
      : axios.post('/courses', data)
    toast.promise(promise, {
      pending: 'Working...',
      success: `"${data.name}" ${isEdit ? 'updated' : 'created'} 👌`,
      error: 'Something unexpected happened 🤯'
    }).then(() => navigate('/courses'))
  }

  return (
    <Paper>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box px={3} py={2}>
            <Typography variant='h6' margin='dense'>
              {isEdit ? 'Update' : 'Create'} course
            </Typography>
            <Grid container spacing={1} maxWidth='sm'>
              <Grid item xs={12} sm={12}>
                <Input name='number' label='Course number' placeholder='CS777' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input name='name' label='Course name' placeholder='Introduction to something' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RadioButtons name='location' label='Location' options={[
                  { label: 'Web', value: 'WEB' },
                  { label: 'Campus', value: 'CAMPUS' }
                ]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input name='time' label='Time' placeholder='Mon-Tue 08:30' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant='contained' type='submit'>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
            <hr />
            <br />
            <Button variant='outlined' component={RouterLink} to='/courses'>Go back</Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  )
}
