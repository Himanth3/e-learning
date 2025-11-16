import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../utils/axiosClient'

const CourseDetail = () => {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourse()
  }, [slug])

  const fetchCourse = async () => {
    try {
      // Fetch course by slug
      const response = await axiosClient.get(`/api/courses/${slug}/`)
      setCourse(response.data)
    } catch (error) {
      setError('Failed to load course')
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card max-w-md">
          <p className="text-red-600 dark:text-red-400">{error || 'Course not found'}</p>
          <Link to="/courses" className="btn-primary mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/courses" className="text-primary-600 dark:text-primary-400 hover:underline mb-4 inline-block">
        ← Back to Courses
      </Link>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Course Image */}
          {course.image ? (
            <div className="w-full md:w-64 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`/images/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-full h-full hidden items-center justify-center text-6xl">
                {course.icon || '📚'}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full md:w-64 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
              <span className="text-6xl">{course.icon || '📚'}</span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {course.description}
            </p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                {course.level}
              </span>
              <span className="text-gray-600 dark:text-gray-400">⏱️ {course.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDFs Section */}
      {course.pdfs && course.pdfs.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            📄 Study Materials & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.pdfs.map((pdf) => (
              <div key={pdf.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {pdf.title}
                </h3>
                {pdf.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {pdf.description}
                  </p>
                )}
                <a
                  href={`/pdfs/${pdf.file_path || pdf.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-primary text-sm w-full"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quizzes Section - After PDFs, Enhanced */}
      {course.quizzes && course.quizzes.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              📝 Test Your Knowledge
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {course.quizzes.length} {course.quizzes.length === 1 ? 'Quiz' : 'Quizzes'} Available
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${quiz.id}`}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl animate-bounce">📝</div>
                  <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded">
                    Quiz
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {quiz.title}
                </h3>
                {quiz.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {quiz.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
                  <div className="flex gap-2">
                    <span>⏱️ {quiz.time_limit} min</span>
                    <span>✅ {quiz.passing_score}%</span>
                    {quiz.question_count > 0 && (
                      <span>📋 {quiz.question_count} Q</span>
                    )}
                  </div>
                </div>
                <button className="btn-primary text-sm w-full group-hover:scale-105 transition-transform">
                  Take Quiz Now 🚀
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}

      {(!course.pdfs || course.pdfs.length === 0) && 
       (!course.quizzes || course.quizzes.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No materials or quizzes available for this course yet.
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseDetail

