import React from 'react'
import { SchemaForm, SchemaMarkupField as Field, FormButtonGroup, Submit, Reset } from '@formily/antd'
import { FormBlock } from '@formily/antd-components'
import useEffects from './effects'

const FormJSX = () => {
  const handleSubmit = (params) => {
    console.log('submit:', params)
  }

  const initialValues = {
    name: '张三',
    school: 'i讯飞大学',
  }

  return (
    <SchemaForm
      labelCol={4}
      validateFirst
      wrapperCol={18}
      effects={useEffects}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      <FormBlock
        title="基本信息"
        name="baseInfo"
      >
        <Field
          name="name"
          type="string"
          title="姓名"
          x-props={{
            placeholder: '姓名'
          }}
        />
        <Field
          name="sex"
          type="string"
          title="性别"
          enum={[
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ]}
          x-props={{
            placeholder: '性别'
          }}
        />
        <Field
          name="age"
          type="string"
          title="年龄"
          x-props={{
            placeholder: '年龄'
          }}
        />
        <Field
          name="openEducateInfo"
          type="boolean"
          title="填写教育信息"
          default={false}
          x-props={{
            placeholder: '年龄'
          }}
        />
      </FormBlock>

      <FormBlock
        title="教育信息"
        name="educateInfo"
      >
        <Field
          name="school"
          type="string"
          title="学校"
          x-props={{
            placeholder: '学校'
          }}
        />
        <Field
          name="major"
          type="string"
          title="专业"
          x-props={{
            placeholder: '专业'
          }}
        />
        <Field
          name="education"
          type="string"
          title="学历"
          x-props={{
            placeholder: '学历'
          }}
        />
      </FormBlock>
      <FormButtonGroup offset={8}>
        <Submit>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}

export default FormJSX
