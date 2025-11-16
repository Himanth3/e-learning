import { useState, useEffect } from 'react'
import axiosClient from '../utils/axiosClient'

const PDFs = () => {
  const [pdfs, setPdfs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPDFs()
  }, [])

  const fetchPDFs = async () => {
    try {
      const response = await axiosClient.get('/api/pdfs/')
      setPdfs(response.data)
    } catch (error) {
      setError('Failed to load PDFs')
      console.error('Error fetching PDFs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPDFs = filter === 'all' 
    ? pdfs 
    : pdfs.filter(pdf => pdf.course === parseInt(filter))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          📄 Study Materials
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Download PDFs and study materials for your Python journey
        </p>
      </div>

      {pdfs.length > 0 && (
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="all">All PDFs</option>
            {/* Add course filters if needed */}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPDFs.map((pdf) => (
          <div key={pdf.id} className="card hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">📄</span>
              {pdf.course_title && (
                <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded">
                  {pdf.course_title}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {pdf.title}
            </h3>
            {pdf.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {pdf.description}
              </p>
            )}
            <a
              href={`/pdfs/${pdf.file_path || pdf.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-primary w-full"
            >
              Download PDF 📥
            </a>
          </div>
        ))}
      </div>

      {filteredPDFs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {filter === 'all' ? 'No PDFs available yet.' : 'No PDFs found for this filter.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PDFs

