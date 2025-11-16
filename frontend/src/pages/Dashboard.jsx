import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axiosClient from '../utils/axiosClient'

const Dashboard = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [quizzesLoading, setQuizzesLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
    fetchQuizzes()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axiosClient.get('/api/courses/')
      // Handle both paginated and non-paginated responses
      const coursesData = response.data.results || response.data || []
      setCourses(coursesData.slice(0, 6)) // Show first 6 courses
    } catch (error) {
      console.error('Error fetching courses:', error)
      // Show empty state with motivational message instead of fallback data
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const fetchQuizzes = async () => {
    try {
      const response = await axiosClient.get('/api/quizzes/')
      setQuizzes(response.data.slice(0, 6)) // Show first 6 quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error)
      setQuizzes([])
    } finally {
      setQuizzesLoading(false)
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
        return 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section with Animations */}
      <div className="mb-8 relative overflow-hidden">
        <div className="card bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 text-white p-8 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">
                Welcome back, {user?.first_name || user?.username || 'Coder'}! 👋
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90 animate-slide-up">
                🚀 Ready to level up your Python skills today?
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="text-lg animate-bounce">💻</span>
                <span className="text-lg animate-bounce" style={{ animationDelay: '0.1s' }}>🐍</span>
                <span className="text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                <span className="text-lg animate-bounce" style={{ animationDelay: '0.3s' }}>🔥</span>
                <span className="text-lg animate-bounce" style={{ animationDelay: '0.4s' }}>🎯</span>
              </div>
            </div>
            <div className="text-8xl md:text-9xl animate-pulse">
              🐍
            </div>
          </div>
        </div>
        
        {/* Motivational Quotes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 p-4 animate-fade-in">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200 flex items-center gap-2">
              <span className="text-xl">💡</span> "Every expert was once a beginner"
            </p>
          </div>
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 p-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <span className="text-xl">🚀</span> "Code your way to success!"
            </p>
          </div>
          <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700 p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2">
              <span className="text-xl">⭐</span> "Practice makes perfect!"
            </p>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Available Courses
          </h2>
          <Link to="/courses" className="text-primary-600 dark:text-primary-400 hover:underline">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.slug || course.id}`}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
              >
                {/* Course Image */}
                {course.image && (
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={`/images/${course.image}`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>⏱️ {course.duration}</span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold group-hover:underline">
                    Start Learning →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quizzes Section - After Courses */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            📝 Available Quizzes
          </h2>
          <Link to="/courses" className="text-primary-600 dark:text-primary-400 hover:underline">
            View All Courses →
          </Link>
        </div>
        {quizzesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${quiz.id}`}
                className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl animate-bounce">📝</div>
                  {quiz.course_title && (
                    <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded">
                      {quiz.course_title}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {quiz.title}
                </h3>
                {quiz.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    {quiz.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <div className="flex gap-3">
                    <span>⏱️ {quiz.time_limit} min</span>
                    <span>✅ {quiz.passing_score}%</span>
                    {quiz.question_count > 0 && (
                      <span>📋 {quiz.question_count} Q</span>
                    )}
                  </div>
                </div>
                <button className="w-full btn-primary text-sm">
                  Take Quiz Now 🚀
                </button>
              </Link>
            ))}
          </div>
        )}
        {quizzes.length === 0 && !quizzesLoading && (
          <div className="text-center py-12 card bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No quizzes available yet. Check back soon!
            </p>
            <Link to="/courses" className="btn-primary inline-block">
              Browse Courses →
            </Link>
          </div>
        )}
      </div>

      {/* Stats Section with Animations */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <div className="text-4xl mb-3 animate-bounce">🎓</div>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            0
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold">Courses Completed</div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Keep learning! 💪</p>
        </div>
        <div className="card text-center hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '0.1s' }}>⏱️</div>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            0
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold">Hours Learned</div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Time well spent! ⭐</p>
        </div>
        <div className="card text-center hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: '0.2s' }}>🏆</div>
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            0
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-semibold">Certificates Earned</div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Achieve greatness! 🌟</p>
        </div>
      </div>
      
      {/* Motivational Footer */}
      {courses.length === 0 && !loading && (
        <div className="mt-12 card bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700 text-center p-8">
          <div className="text-6xl mb-4 animate-bounce">🎯</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Ready to Start Learning? 🚀
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Courses are loading... Check back soon or contact admin to add courses! 💡
          </p>
          <Link to="/courses" className="btn-primary inline-block">
            Browse All Courses →
          </Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard


