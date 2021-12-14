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

export default function Submissions ({ courseId }) {
  const [list, setList] = useState([])

  const refresh = useCallback(() => {
    axios.get(`/courses/${courseId}/submissions`)
      .then(resp => setList(resp.data))
  }, [courseId])

  useEffect(refresh, [refresh])

  const unenroll = (studentId, name) => {
    toast.promise(axios.delete(`/courses/${courseId}/enrollment/students/${studentId}`), {
      pending: `Working "${name}"...`,
      success: `"${name}" unenrolled 👌`,
      error: `Something wrong happened 🤯`
    }).then(refresh)
  }

  return (
    <div>
      {(list.length === 0)
        ? (<div>No submissions yet. Add one!</div>)
        : (
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
                      <Button variant='text' color='error'
                              onClick={() => unenroll(row.id, row.fullName)}>Unenroll</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      <br />
      <Button variant='outlined' component={RouterLink} to='/students/new'>Submit homework</Button>
    </div>
  )
}
