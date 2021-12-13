import { React, useEffect, useState } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'

export default function Courses () {
  const [list, setList] = useState([])

  const refresh = () => {
    axios.get('/courses').then(resp => setList(resp.data))
  }

  useEffect(() => refresh(), [])

  const deleteRow = (id, name) => {
    toast.promise(axios.delete(`/courses/${id}`), {
      pending: `Deleting "${name}"...`,
      success: `"${name}" deleted 👌`,
      error: `Cannot delete "${name}" 🤯`
    }).then(refresh)
  }

  return (
    <div>
      <h2>Courses:</h2>
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
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Button variant='text' component={RouterLink} to={`/courses/${row.id}`}>
                    <LaunchIcon /> Open
                  </Button>
                  <Button variant='text' component={RouterLink} to={`/courses/${row.id}/edit`}>
                    <EditIcon /> Edit
                  </Button>
                  <Button variant='text' color='error' onClick={() => deleteRow(row.id, row.name)}>
                    <DeleteIcon /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant='outlined' component={RouterLink} to='/courses/new'>Add a new course</Button>
    </div>
  )
}
