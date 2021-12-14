import { React, useCallback, useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { Link as RouterLink, } from 'react-router-dom'
import { Button, Checkbox, Grid } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Submissions ({ courseId }) {
  const [list, setList] = useState([])
  const [similarity, setSimilarity] = useState('-')
  const [loadingSimilarity, setLoadingSimilarity] = useState(false)

  const refresh = useCallback(() => {
    axios.get(`/courses/${courseId}/submissions`)
      .then(resp => setList(resp.data.map(s => ({ ...s, checked: false }))))
  }, [courseId])

  useEffect(refresh, [refresh])

  const unenroll = (studentId, name) => {
    toast.promise(axios.delete(`/courses/${courseId}/enrollment/students/${studentId}`), {
      pending: `Working "${name}"...`,
      success: `"${name}" unenrolled 👌`,
      error: `Something wrong happened 🤯`
    }).then(refresh)
  }

  function calculateSimilarity (ids) {
    setLoadingSimilarity(true)
    setSimilarity(null)
    axios.post(`/compare`, {
      submissionAId: ids[0],
      submissionBId: ids[1]
    }).then(res => {
      setSimilarity(res.data.similarity)
    }).finally(() => {
      setLoadingSimilarity(false)
    })
  }

  function handleCheck (submission) {

    let shouldUncheck = false

    // if we're checking
    if (!submission.checked) {
      let checked = 0
      let lastCheckedId = null
      list.forEach(s => {
        if (s.checked) {
          checked++
          lastCheckedId = s.id
        }
      })
      if (checked > 2) {
        shouldUncheck = true
      }
      if (checked === 1) {
        calculateSimilarity([lastCheckedId, submission.id])
      }
    }
    setList(list.map(s => {
      if (s.id === submission.id) {
        return { ...s, checked: !submission.checked }
      }
      if (shouldUncheck) {
        return { ...s, checked: false }
      }
      return s
    }))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {(list.length === 0)
          ? (<div>No submissions yet. Add one!</div>)
          : (
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Document</TableCell>
                    <TableCell>Submitted at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                        <Checkbox
                          checked={row.checked}
                          onChange={() => handleCheck(row)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.student.fullName}</TableCell>
                      <TableCell>{row.document}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
      </Grid>
      <Grid item xs={2}>
        <h2>Similarity:</h2>
        {loadingSimilarity ? 'Calculating...' : similarity}
      </Grid>
      <Grid item xs={12}>
        <br />
        <Button variant='outlined' component={RouterLink} to='/students/new'>Submit homework</Button>
      </Grid>
    </Grid>
  )
}
