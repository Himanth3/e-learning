import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axiosClient from '../utils/axiosClient'

const Quiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchQuiz()
  }, [id, user, navigate])

  const fetchQuiz = async () => {
    try {
      const response = await axiosClient.get(`/api/quizzes/${id}/`)
      setQuiz(response.data)
    } catch (error) {
      setError('Failed to load quiz')
      console.error('Error fetching quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId, choiceId) => {
    setAnswers({
      ...answers,
      [questionId]: choiceId
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    // Validate that all questions are answered
    if (Object.keys(answers).length !== quiz?.questions?.length) {
      setError(`Please answer all ${quiz?.questions?.length || 0} questions before submitting.`)
      setSubmitting(false)
      return
    }

    try {
      // Convert answers object to have string keys (question IDs) and integer values (choice IDs)
      const formattedAnswers = {}
      Object.keys(answers).forEach(questionId => {
        formattedAnswers[String(questionId)] = parseInt(answers[questionId])
      })

      console.log('Submitting quiz:', { quiz_id: parseInt(id), answers: formattedAnswers })

      const response = await axiosClient.post(`/api/quizzes/${id}/submit/`, {
        quiz_id: parseInt(id),
        answers: formattedAnswers
      })
      
      console.log('Quiz submission response:', response.data)
      setResults(response.data)
      setError('') // Clear any previous errors
    } catch (error) {
      console.error('Error submitting quiz:', error)
      console.error('Error response:', error.response)
      
      // Better error handling
      let errorMessage = 'Failed to submit quiz'
      if (error.response?.data) {
        if (error.response.data.answers) {
          errorMessage = `Invalid answers format: ${JSON.stringify(error.response.data.answers)}`
        } else if (error.response.data.quiz_id) {
          errorMessage = `Invalid quiz ID: ${JSON.stringify(error.response.data.quiz_id)}`
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        } else {
          errorMessage = JSON.stringify(error.response.data)
        }
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error && !quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card max-w-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button onClick={() => navigate('/courses')} className="btn-primary mt-4 w-full">
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (results) {
    return (
      <>
        {/* Modal Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // Close modal if clicking outside
              setResults(null)
              setAnswers({})
            }
          }}
        >
          <div className={`card max-w-2xl w-full max-h-[90vh] overflow-y-auto ${results.passed ? 'bg-green-50 dark:bg-green-900/30 border-green-500 border-2' : 'bg-red-50 dark:bg-red-900/30 border-red-500 border-2'} animate-slide-up shadow-2xl relative`}>
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setResults(null)
                  setAnswers({})
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Result Header */}
            <div className="text-center mb-6">
              {results.passed ? (
                <>
                  <div className="text-8xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    Congratulations! 🏆
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                    You scored <span className="font-bold text-green-600 dark:text-green-400">{results.score}%</span> and passed the quiz!
                  </p>
                </>
              ) : (
                <>
                  <div className="text-8xl mb-4 animate-bounce">😅</div>
                  <h2 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    Better luck next time!
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                    You scored <span className="font-bold text-red-600 dark:text-red-400">{results.score}%</span>. Keep practicing! 💪
                  </p>
                </>
              )}
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {results.correct_count} / {results.total_questions} Correct
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Passing score: {quiz?.passing_score || 70}%
              </div>
            </div>

            {/* Review Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                📋 Review Your Answers
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {results.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.is_correct
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {result.is_correct ? (
                        <span className="text-2xl">✅</span>
                      ) : (
                        <span className="text-2xl">❌</span>
                      )}
                      <p className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                        {result.question_text}
                      </p>
                    </div>
                    <div className="ml-10 space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold">Your answer:</span>{' '}
                        <span className={result.is_correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                          {result.user_answer || 'Not answered'}
                        </span>
                      </p>
                      {!result.is_correct && (
                        <p className="text-sm">
                          <span className="font-semibold">Correct answer:</span>{' '}
                          <span className="text-green-700 dark:text-green-300">
                            {result.correct_answer}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setResults(null)
                  setAnswers({})
                }}
                className="btn-secondary flex-1"
              >
                🔄 Retake Quiz
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="btn-primary flex-1"
              >
                📚 Back to Courses
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {quiz?.title}
        </h1>
        {quiz?.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {quiz.description}
          </p>
        )}
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-500">
          <span>⏱️ Time limit: {quiz?.time_limit} minutes</span>
          <span>✅ Passing score: {quiz?.passing_score}%</span>
          <span>📝 Questions: {quiz?.questions?.length || 0}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="space-y-8">
          {quiz?.questions?.map((question, qIndex) => (
            <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {qIndex + 1}. {question.question_text}
              </h3>
              <div className="space-y-3">
                {question.choices.map((choice) => (
                  <label
                    key={choice.id}
                    className="flex items-center p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={choice.id}
                      checked={answers[question.id] === choice.id}
                      onChange={() => handleAnswerChange(question.id, choice.id)}
                      className="mr-3"
                    />
                    <span className="text-gray-900 dark:text-gray-100">
                      {choice.choice_text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || Object.keys(answers).length === 0 || Object.keys(answers).length < (quiz?.questions?.length || 0)}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Submitting...
              </span>
            ) : (
              'Submit Quiz ✅'
            )}
          </button>
        </div>
        
        {Object.keys(answers).length > 0 && Object.keys(answers).length < (quiz?.questions?.length || 0) && (
          <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 text-center">
            ⚠️ Please answer all {quiz?.questions?.length || 0} questions before submitting
          </p>
        )}
      </form>
    </div>
  )
}

export default Quiz

