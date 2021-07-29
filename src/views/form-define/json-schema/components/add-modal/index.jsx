import React from 'react'
import { Modal } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'

const AddModal = (props) => {
  const { onCancel } = props
  const actions = createAsyncFormActions()
  const handleOk = () => {
    return actions.submit().then(({ values }) => {
      console.log('submit:', values)
    })
  }

  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        'x-props': {
          placeholder: '姓名'
        }
      },
      sex: {
        type: 'string',
        title: '性别',
        enum: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
        'x-props': {
          placeholder: '姓名'
        }
      },
      age: {
        type: 'string',
        title: '年龄',
        'x-props': {
          placeholder: '年龄'
        }
      }
    }
  }

  return (
    <Modal
      visible
      onOk={handleOk}
      title="弹出框表单"
      onCancel={onCancel}
    >
      <SchemaForm
        labelCol={4}
        validateFirst
        wrapperCol={18}
        schema={schema}
        actions={actions}
      />
    </Modal>
  )
}

export default AddModal
