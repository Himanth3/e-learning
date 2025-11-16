import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../utils/axiosClient'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axiosClient.get('/api/courses/')
      console.log('Courses API Response:', response.data) // Debug log
      
      // Handle both paginated and non-paginated responses
      const coursesData = response.data.results || response.data || []
      console.log('Courses Data:', coursesData) // Debug log
      
      setCourses(coursesData)
      
      if (coursesData.length === 0) {
        setError('No courses available. Please run: python manage.py load_initial_data')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      console.error('Error response:', error.response)
      
      if (error.response?.status === 404) {
        setError('API endpoint not found. Check backend URL and routes.')
      } else if (error.response?.status === 500) {
        setError('Backend server error. Check Django terminal for details.')
      } else if (!error.response) {
        setError('Cannot connect to backend. Make sure Django server is running on http://localhost:8000')
      } else {
        setError(error.response?.data?.detail || error.message || 'Failed to load courses.')
      }
    } finally {
      setLoading(false)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card max-w-md">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">Troubleshooting:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure backend is running on port 8000</li>
              <li>Run: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">python manage.py load_initial_data</code></li>
              <li>Check browser console (F12) for errors</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          📚 Python Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Master Python – From Basics to Web Development 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.slug}`}
            className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Course Image */}
            {course.image && (
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded-lg overflow-hidden">
                <img
                  src={`/images/${course.image}`}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full hidden items-center justify-center text-6xl">
                  {course.icon || '📚'}
                </div>
              </div>
            )}
            {!course.image && (
              <div className="flex items-center justify-center w-full h-32 bg-gray-100 dark:bg-gray-800 mb-4 rounded-lg">
                <span className="text-6xl">{course.icon || '📚'}</span>
              </div>
            )}
            <div className="flex items-start justify-between mb-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                {course.level}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {course.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {course.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
              <span>⏱️ {course.duration}</span>
              <div className="flex gap-2">
                {course.pdf_count > 0 && (
                  <span className="text-xs">📄 {course.pdf_count}</span>
                )}
                {course.quiz_count > 0 && (
                  <span className="text-xs">📝 {course.quiz_count}</span>
                )}
              </div>
            </div>
            <button className="mt-4 w-full btn-primary text-sm">
              Start Learning →
            </button>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No courses available yet.</p>
        </div>
      )}
    </div>
  )
}

export default Courses

