import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import FunctionsIcon from '@mui/icons-material/Functions'

export function Statistics () {
  const { courseId } = useParams()
  const [stats, setStats] = useState({
    highestScore: '-',
    highestScoreName: '-',
    lowestScore: '-',
    lowestScoreName: '-',
    averageScore: '-'
  })

  const refresh = useCallback(() => {
    axios.get(`/courses/${courseId}/scores`)
      .then(resp => setStats(resp.data))
  }, [courseId])

  useEffect(refresh, [refresh])

  return (
    <>
      <h2>Scores</h2>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <ThumbUpAltIcon />
          </ListItemIcon>
          <ListItemText
            primary='Highest score'
            secondary={`${stats.highestScore}/100 - ${stats.highestScoreName}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ThumbDownAltIcon />
          </ListItemIcon>
          <ListItemText
            primary='Lowest score'
            secondary={`${stats.lowestScore}/100 - ${stats.lowestScoreName}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FunctionsIcon />
          </ListItemIcon>
          <ListItemText
            primary='Average score'
            secondary={`${stats.averageScore}/100`}
          />
        </ListItem>
      </List>
    </>
  )
}
