import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Courses from './pages/Courses'
import Students from './pages/Students'
import CourseEdit from './pages/CourseEdit'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import StudentEdit from './pages/StudentEdit'
import { Home } from './pages/Home'
import { CourseDetails } from './pages/CourseDetails/CourseDetails'
import { StudentDetails } from './pages/StudentDetails'
import { Layout } from './components/Layout'
import ActivityEdit from './pages/CourseDetails/ActivityEdit'
import ActivityOverview from './pages/ActivityOverview/ActivityOverview'

const theme = createTheme()

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='courses'>
                <Route path=':courseId' element={<CourseDetails />} />
                <Route path=':courseId/edit' element={<CourseEdit />} />
                <Route path=':courseId/activities/new' element={<ActivityEdit />} />
                <Route path=':courseId/activities/:activityId' element={<ActivityOverview />} />
                <Route path='new' element={<CourseEdit />} />
                <Route index element={<Courses />} />
              </Route>
              <Route path='students'>
                <Route path=':studentId' element={<StudentDetails />} />
                <Route path=':studentId/edit' element={<StudentEdit />} />
                <Route path='new' element={<StudentEdit />} />
                <Route index element={<Students />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            newestOnTop={false}
          />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App
