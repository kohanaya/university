import { useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import CourseActivities from './CourseActivities'
import EnrolledStudents from './EnrolledStudents'
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Statistics } from './Statistics'
import Submissions from './Submissions'

const assignments = [
  {
    id: 1,
    name: 'Quiz 1',
    dueDate: 'December 1, 23:30 CST',
    people: [
      { id: 1, fullName: 'Kirsten Rivera' },
      { id: 2, fullName: 'Barbara Enriquez' }
    ]
  }
]

export function CourseDetails () {
  const { courseId } = useParams()
  const [course, setCourse] = useState({})
  const [missed, setMissed] = useState({})

  useEffect(() => {
    axios.get(`/courses/${courseId}`)
      .then(resp => setCourse(resp.data))
    axios.get(`/courses/${courseId}/activities/missed`)
      .then(resp => setMissed(resp.data))
  }, [courseId])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>{course.number} {course.name}</h1>
      </Grid>
      <Grid item xs={12} md={8}>
        <h2>Missed assignments</h2>
        {missed.length === 0 ? 'No missed assignments!' : (
          <List dense>
            {assignments.map((assignment) => (
              <Fragment key={assignment.id}>
                <ListItem>
                  <ListItemIcon><MenuBookIcon /></ListItemIcon>
                  <ListItemText primary={assignment.name} secondary={assignment.dueDate} />
                </ListItem>
                <List>
                  {assignment.people.map((person) => (
                    <ListItem key={person.id} sx={{ pl: 4 }}>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText primary={person.fullName} />
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ))}
          </List>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Statistics />
      </Grid>
      <Grid item xs={12}>
        <h2>Latest submissions</h2>
        <Submissions courseId={courseId} />
      </Grid>
      <Grid item xs={12}>
        <h2>Enrolled Students</h2>
        <EnrolledStudents courseId={courseId} />
      </Grid>
      <Grid item xs={12}>
        <h2>Activities</h2>
        <CourseActivities courseId={courseId} />
      </Grid>
    </Grid>
  )
}
