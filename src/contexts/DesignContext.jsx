import React, { createContext, useContext, useState, useCallback } from 'react'
import { defaultLogos, defaultTemplateData, templates } from '../data/defaults'

const DesignContext = createContext()

export const useDesign = () => {
  const context = useContext(DesignContext)
  if (!context) {
    throw new Error('useDesign must be used within DesignProvider')
  }
  return context
}

export const DesignProvider = ({ children }) => {
  // الوضع الحالي
  const [currentMode, setCurrentMode] = useState('simple') // simple | advanced
  const [currentTemplate, setCurrentTemplate] = useState('generalAnnouncement') // البدء بالقالب الديناميكي الجديد
  const [currentColor, setCurrentColor] = useState('blue')

  // بيانات التصميم
  const [designData, setDesignData] = useState(defaultTemplateData.participation)
  const [isExporting, setIsExporting] = useState(false) // New state for export mode
  
  // الشعارات
  const [logos, setLogos] = useState(defaultLogos)
  
  // الصور المرفوعة
  const [uploadedImages,
    isExporting, setUploadedImages] = useState({})

  // تبديل الوضع
  const switchMode = useCallback((mode) => {
    setCurrentMode(mode)
    // اختيار أول قالب في الوضع الجديد
    const firstTemplate = mode === 'simple' ? 'generalAnnouncement' : 'certificate'
    selectTemplate(firstTemplate)
  }, [])

  // اختيار القالب
  const selectTemplate = useCallback((template) => {
    setCurrentTemplate(template)
    // تحميل البيانات الافتراضية للقالب
    const templateData = defaultTemplateData[template] || {}
    setDesignData(templateData)
    // تحديث اللون بناءً على القالب الجديد
    if (templateData.style && templateData.style.primaryColor) {
      setCurrentColor(templateData.style.primaryColor)
    }
  }, [])

  // تحديته بيانات التصميم
  const updateDesignData = useCallback((updates) => {
    setDesignData(prev => ({ ...prev, ...updates }))
  }, [])

  // تحديث الميزة
  const updateFeature = useCallback((index, value) => {
    setDesignData(prev => {
      const features = [...(prev.features || [])]
      features[index] = value
      return { ...prev, features }
    })
  }, [])

  // إضافة ميزة
  const addFeature = useCallback(() => {
    setDesignData(prev => ({
      ...prev,
      features: [...(prev.features || []), 'ميزة جديدة']
    }))
  }, [])

  // حذف ميزة
  const removeFeature = useCallback((index) => {
    setDesignData(prev => {
      const features = [...(prev.features || [])]
      features.splice(index, 1)
      return { ...prev, features }
    })
  }, [])

  // تحديث شعار
  const updateLogo = useCallback((key, url) => {
    setLogos(prev => ({ ...prev, [key]: url }))
  }, [])

  // رفع صورة
  const uploadImage = useCallback((key, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImages(prev => ({ ...prev, [key]: e.target.result }))
        resolve(e.target.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  // حفظ التصميم في Local Storage
  const saveDesign = useCallback(() => {
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    const newDesign = {
      id: Date.now().toString(),
      name: designData.title || `تصميم ${currentTemplate} جديد`,
      mode: currentMode,
      template: currentTemplate,
      color: currentColor,
      designData,
      logos,
      uploadedImages,
    isExporting,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('savedDesigns', JSON.stringify([newDesign, ...savedDesigns]))
    alert(`تم حفظ التصميم بنجاح باسم: ${newDesign.name}`)
  }, [currentMode, currentTemplate, currentColor, designData, logos, uploadedImages])

  // تحميل التصميم من Local Storage
  const loadDesign = useCallback((designId) => {
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    const data = savedDesigns.find(d => d.id === designId)
    if (data) {
      setCurrentMode(data.mode || 'simple')
      setCurrentTemplate(data.template || 'generalAnnouncement')
      setCurrentColor(data.color || 'blue')
      setDesignData(data.designData || {})
      setLogos(data.logos || defaultLogos)
      setUploadedImages(data.uploadedImages || {})
      alert(`تم تحميل التصميم: ${data.name}`)
    } else {
      alert('لم يتم العثور على التصميم.')
    }
  }, [])

  // الحصول على قائمة التصاميم المحفوظة
  const getSavedDesigns = useCallback(() => {
    return JSON.parse(localStorage.getItem('savedDesigns') || '[]')
  }, [])



  // إعادة تعيين
  const resetDesign = useCallback(() => {
    setCurrentMode('simple')
    setCurrentTemplate('generalAnnouncement')
    setCurrentColor('blue')
    setDesignData(defaultTemplateData.generalAnnouncement)
    setLogos(defaultLogos)
    setUploadedImages({})
  }, [])

  const value = {
    // State
    currentMode,
    currentTemplate,
    currentColor,
    designData,
    logos,
    uploadedImages,
    isExporting,
    
    // Actions
    switchMode,
    selectTemplate,
    setCurrentColor,
    updateDesignData,
    updateFeature,
    addFeature,
    removeFeature,
    updateLogo,
    uploadImage,
    saveDesign,
    loadDesign,
    getSavedDesigns,
    resetDesign,
    setIsExporting,
  }

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}
