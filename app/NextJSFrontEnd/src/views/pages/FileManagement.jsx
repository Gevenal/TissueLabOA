// src/views/pages/FileManagement.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const API_URL = 'http://localhost:5588/list-files'

const FileManagement = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load files')
        setLoading(false)
      })
  }, [])

  const handleClick = (filename) => {
    if (filename.endsWith('.svs')) {
      navigate(`/viewer?file=${encodeURIComponent(filename)}`)
    } else {
      alert('Only .svs files are viewable')
    }
  }
  
  return (
    <div className="container py-4">
      <h2 className="mb-3">Uploaded File Management</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Size (KB)</th>
            <th>Last Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, i) => (
            <tr key={i}>
              <td>{file.filename}</td>
              <td>{file.size_kb}</td>
              <td>{file.modified}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleClick(file.filename)}
                >
                  Load
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileManagement
