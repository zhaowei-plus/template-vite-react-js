import React from 'react'
import { useVisible } from '@/hooks'
import AddModal from './components/add-modal'

const JSONSchema = () => {
  const addModal = useVisible(true)

  return (
    <div>
      JSONSchema
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

export default JSONSchema
