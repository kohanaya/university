import { React, useEffect } from 'react'
import { Link as RouterLink, useNavigate, useParams, } from 'react-router-dom'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextField from '../../components/Input'
import DateTimePicker from '../../components/DateTimePicker'

const schema = yup.object({
  fullName: yup.string().required(),
  address: yup.string().required(),
}).required()

export default function ActivityEdit () {
  const { courseId, activityId } = useParams()
  const navigate = useNavigate()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'QUIZ',
      title: '',
      maxPoints: '',
      dueDate: '',
      instructions: '',
    }
  })
  const { handleSubmit, reset } = methods
  const isEdit = !!activityId

  useEffect(() => {
    if (isEdit) {
      axios.get(`/activities/${activityId}`).then(resp => {
        reset(resp.data)
      })
    }
  }, [isEdit, activityId, reset])

  const onSubmit = data => {
    const promise = isEdit
      ? axios.put(`/course/${courseId}/activities/${activityId}`, data)
      : axios.post(`/course/${courseId}/activities`, data)
    toast.promise(promise, {
      pending: 'Working...',
      success: `"${data.name}" ${isEdit ? 'updated' : 'created'} 👌`,
      error: 'Something unexpected happened 🤯'
    }).then(() => navigate('/activities'))
  }

  return (
    <Paper>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box px={3} py={2}>
            <Typography variant='h6' margin='dense'>
              {isEdit ? 'Update' : 'Create'} activity
            </Typography>
            <Grid container spacing={1} maxWidth='sm'>
              <Grid item xs={12} sm={12}>
                <TextField name='title' label='Name' placeholder='Jeannette Glover' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField name='maxPoints' label='Max points' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <DateTimePicker name='dueDate' label='Due date & time' />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField name='instructions' label='Instructions' minRows={4} maxRows={10} multiline={true} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant='contained' type='submit'>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
            <hr />
            <br />
            <Button variant='outlined' component={RouterLink} to='/activities'>Go back</Button>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  )
}
