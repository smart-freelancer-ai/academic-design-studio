import React, { createContext, useContext, useState, useCallback } from 'react'
import { defaultLogos, defaultTemplateData } from '../data/defaults'

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
  const [currentTemplate, setCurrentTemplate] = useState('participation')
  const [currentColor, setCurrentColor] = useState('blue')

  // بيانات التصميم
  const [designData, setDesignData] = useState(defaultTemplateData.participation)
  
  // الشعارات
  const [logos, setLogos] = useState(defaultLogos)
  
  // الصور المرفوعة
  const [uploadedImages, setUploadedImages] = useState({})

  // تبديل الوضع
  const switchMode = useCallback((mode) => {
    setCurrentMode(mode)
    // اختيار أول قالب في الوضع الجديد
    const firstTemplate = mode === 'simple' ? 'participation' : 'certificate'
    selectTemplate(firstTemplate)
  }, [])

  // اختيار القالب
  const selectTemplate = useCallback((template) => {
    setCurrentTemplate(template)
    // تحميل البيانات الافتراضية للقالب
    setDesignData(defaultTemplateData[template] || {})
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

  // حفظ التصميم
  const saveDesign = useCallback(() => {
    const data = {
      mode: currentMode,
      template: currentTemplate,
      color: currentColor,
      designData,
      logos,
      uploadedImages,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.download = `design-${currentTemplate}-${Date.now()}.json`
    link.href = URL.createObjectURL(blob)
    link.click()
  }, [currentMode, currentTemplate, currentColor, designData, logos, uploadedImages])

  // تحميل التصميم
  const loadDesign = useCallback((data) => {
    setCurrentMode(data.mode || 'simple')
    setCurrentTemplate(data.template || 'participation')
    setCurrentColor(data.color || 'blue')
    setDesignData(data.designData || {})
    setLogos(data.logos || defaultLogos)
    setUploadedImages(data.uploadedImages || {})
  }, [])

  // إعادة تعيين
  const resetDesign = useCallback(() => {
    setCurrentMode('simple')
    setCurrentTemplate('participation')
    setCurrentColor('blue')
    setDesignData(defaultTemplateData.participation)
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
    resetDesign,
  }

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}
