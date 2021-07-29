import React, { Fragment } from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const getExpressionScope = () => {
  return {
    text(...args) {
      return React.createElement(
        'span',
        {
          className: 'self-text',
        },
        ...args
      )
    },
    help(text, offset = 4) {
      return React.createElement(
        Tooltip,
        { title: text },
        <QuestionCircleOutlined
          style={{ cursor: 'pointer', marginLeft: offset }}
        />
      )
    },
  }
}
