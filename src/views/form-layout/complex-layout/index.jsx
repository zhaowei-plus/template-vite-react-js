import React from 'react'
import { useVisible } from '@/hooks'
import AddModal from './components/add-modal'

const ComplexLayout = () => {
  const addModal = useVisible(true)

  return (
    <div>
      复杂表单布局
      {
        addModal.visible && (
          <AddModal
            onCancel={addModal.close}
          />
        )
      }
    </div>
  )
}

export default ComplexLayout
