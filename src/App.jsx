import { useState } from 'react'
import Sidebar from './components/Editor/Sidebar'
import Canvas from './components/Editor/Canvas'
import Header from './components/UI/Header'
import { useDesign } from './contexts/DesignContext'

function App() {
  const { currentMode } = useDesign()

  return (
    <div className="min-h-screen bg-gradient-to-br from-academic-gradient1 to-academic-gradient2">
      <Header />
      
      <div className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 min-h-[calc(100vh-120px)]">
          <Sidebar />
          <Canvas />
        </div>
      </div>
    </div>
  )
}

export default App
