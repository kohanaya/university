import { React, useCallback, useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Link as RouterLink, } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function CourseActivities ({ courseId }) {
  const [list, setList] = useState([])

  const refresh = useCallback(() => {
    axios.get(`/courses/${courseId}/activities`)
      .then(resp => setList(resp.data))
  }, [courseId])

  useEffect(refresh, [refresh])

  const deleteRow = (id, name) => {
    toast.promise(axios.delete(`/courses/${id}/activities/${id}`), {
      pending: `Deleting "${name}"...`,
      success: `"${name}" deleted 👌`,
      error: `Cannot delete "${name}" 🤯`
    }).then(refresh)
  }

  return (
    <div>
      {(list.length === 0)
        ? (<div>No activities. Add one!</div>)
        : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Class number</TableCell>
                  <TableCell>Class name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.maxPoints}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>
                      <Button variant='text' component={RouterLink} to={`/courses/${row.id}/edit`}>Edit</Button>
                      <Button variant='text' color='error' onClick={() => deleteRow(row.id, row.title)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      <br />
      <Button variant='outlined' component={RouterLink} to={`/courses/${courseId}/activities/new`}>
        Add activity
      </Button>
    </div>
  )
}
