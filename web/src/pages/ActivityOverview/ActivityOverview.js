import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function ActivityOverview () {
  const { courseId, activityId } = useParams()
  const [list, setList] = useState([])

  const refresh = () => {
    axios.get('/courses/${courseId}/activities/${activityId}')
      .then(resp => setList(resp.data))
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

    </div>
  )
}
