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

const type = 'students'

export default function Students () {
  const [list, setList] = useState([])

  const refresh = () => {
    axios.get(`/${type}`).then(resp => setList(resp.data))
  }

  useEffect(() => refresh(), [])

  const deleteRow = (id, name) => {
    toast.promise(axios.delete(`/${type}/${id}`), {
      pending: `Deleting "${name}"...`,
      success: `"${name}" deleted 👌`,
      error: `Cannot delete "${name}" 🤯`
    }).then(refresh)
  }

  return (
    <div>
      <h2>Students:</h2>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Button variant='text' component={RouterLink} to={`/students/${row.id}/edit`}>Edit</Button>
                  <Button variant='text' color='error' onClick={() => deleteRow(row.id, row.fullName)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button variant='outlined' component={RouterLink} to='/students/new'>Add a new student</Button>
    </div>
  )
}
