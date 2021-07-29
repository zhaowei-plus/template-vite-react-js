import React, { useMemo } from 'react'
import { Modal } from 'antd'
import {
  SchemaForm,
  createFormActions,
  SchemaMarkupField as Field,
} from '@formily/antd'
import { FormTextBox, Input, Select } from '@formily/antd-components'
import { getExpressionScope } from './config'
import components from './form'
import useEffects from './effects'

import './index.less'

export default (props) => {
  const { params = {}, onCancel, onOk } = props
  const { detail, index } = params
  const actions = useMemo(() => createFormActions(), [])

  const handleSubmit = (params) => {
    console.log('handleSubmit params:', params)
  }

  // 金额校验
  const moneyValidator = length => value => {
    if (value > 0) {
      const valueSplit = value.toString().split('.')
      if (valueSplit[0].length > length) {
        return `金额最多${length}位整数`
      }

      if (valueSplit.length === 2) {
        if (valueSplit[1].length > 2) {
          return '金额最多2位小数'
        }
      }
    } else {
      return '请输入正确的金额'
    }
  }

  // 库存校验
  const stockValidator = value => {
    if (value > 0) {
      if (!/(^[1-9]\d*$)/.test(value)) {
        return '可销库存数必须是大于0的整数'
      } else if (value > 20000000) {
        return '最大值为20000000'
      }
    } else {
      return '请输入正确的库存数量'
    }
  }

  const initialValues = useMemo(() => {
    return {
      favorableConfig: {
        status: 0,
      },
      capacityConfig: {
        unit: 'M',
      },
      timelinessConfig: {
        unit: '日',
      },
      productConfig: {
        status: 1,
      },
    }
  }, [params])

  const orgNumValidator = value => {
    if (!value) {
      return '请输入人数范围'
    } else {
      const { min, max } = value
      if (!min) {
        return '请输入有效最小值'
      } else if (!/(^[1-9]\d*$)/.test(min) || min.toString().length > 8) {
        return '最小值需为8位以内正整数'
      }

      if (!max) {
        return '请输入有效最大值'
      } else if (!/(^[1-9]\d*$)/.test(max) || max.toString().length > 8) {
        return '最大值需为8位以内正整数'
      }

      if (max < min) {
        return '最大值需不小于最小值'
      }
    }
  }

  // 正整数长度判断
  const posIntegerValidator = length => value => {
    if (!/(^[1-9]\d*$)/.test(value) || value.toString().length > length) {
      return `请输入${length}位内正整数`
    }
  }

  const isAdd = !detail

  return (
    <Modal
      visible
      centered
      width={630}
      onCancel={onCancel}
      maskClosable={false}
      wrapClassName="add-modal"
      onOk={() => actions.submit()}
      title={`${isAdd ? '新增' : '修改'}产品`}
    >
      <SchemaForm
        labelCol={7}
        wrapperCol={16}
        actions={actions}
        effects={useEffects}
        validateFirst={true}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        components={{ ...components, Input, Select }}
        expressionScope={getExpressionScope()}
        previewPlaceholder="暂无数据"
      >
        <Field
          editable={false}
          type="string"
          name="skuCode"
          title="产品编码"
          visible={!isAdd}
        />
        <Field
          required
          type="textarea"
          name="name"
          title="产品名称"
          x-props={{
            placeholder: '请输入产品名称',
            maxLength: 15,
            style: {
              width: 220,
            },
            autoSize: {
              minRows: 1,
              maxRows: 1,
            },
          }}
        />
        <FormTextBox
          required
          title="企业人数范围"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="orgNumConfig.numDisabled"
            visible={false}
            x-props={{
              placeholder: '规格不限',
              style: {
                width: 250,
              },
              addonAfter: <span className="addon-after">人</span>,
            }}
            x-component-props={{
              disabled: true,
            }}
          />
          <Field
            required
            type="string"
            name="orgNumConfig.range"
            x-component="InputRange"
            visible={true}
            x-props={{
              placeholder: '请输入',
              style: {
                width: 250,
              },
              addonAfter: <span className="addon-after">人</span>,
            }}
            x-component-props={{
              max: 9999999999, // 最大10位正整数
            }}
            x-rules={[{ validator: orgNumValidator }]}
          />
          <Field
            type="checkbox"
            name="orgNumConfig.noLimit"
            enum={[
              {
                label: "{{ text('规格不限', help('指包含全部规格')) }}",
                value: -1,
              },
            ]}
          />
        </FormTextBox>
        <FormTextBox
          required
          title="使用人数范围"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="useNumConfig.numDisabled"
            visible={false}
            x-props={{
              placeholder: '规格不限',
              style: {
                width: 170,
              },
              addonAfter: <span className="addon-after">人</span>,
            }}
            x-component-props={{
              disabled: true,
            }}
          />
          <Field
            required
            type="string"
            name="useNumConfig.num"
            visible={true}
            x-props={{
              placeholder: '请输入10位以内正整数',
              style: {
                width: 170,
              },
              addonAfter: <span className="addon-after">人</span>,
            }}
            x-rules={[{ validator: posIntegerValidator(10) }]}
          />
          <Field
            type="checkbox"
            name="useNumConfig.noLimit"
            enum={[
              {
                label: '规格不限',
                value: -1,
              },
            ]}
          />
        </FormTextBox>
        <FormTextBox
          required
          title="容量限制"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="capacityConfig.numDisabled"
            visible={false}
            x-props={{
              placeholder: '规格不限',
              style: {
                width: 170,
              },
            }}
            x-component-props={{
              disabled: true,
            }}
          />
          <Field
            required
            type="string"
            name="capacityConfig.num"
            visible={true}
            x-props={{
              placeholder: '请输入8位以内正整数',
              style: {
                width: 170,
              },
            }}
            x-rules={[{ validator: posIntegerValidator(8) }]}
          />
          <Field
            required
            name="capacityConfig.unit"
            x-component="Select"
            enum={['M', 'G', 'T']}
            x-props={{
              placeholder: '单位',
              style: {
                width: 60,
              },
              disabled: true,
            }}
            x-component-props={{
              disabled: false,
            }}
            x-rules={[{ required: true, message: '请选择单位' }]}
          />
          <Field
            type="checkbox"
            name="capacityConfig.noLimit"
            enum={[
              {
                label: '规格不限',
                value: -1,
              },
            ]}
          />
        </FormTextBox>

        <FormTextBox
          required
          title="数量限制"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="numConfig.numDisabled"
            visible={false}
            x-props={{
              enableEdit: false,
              placeholder: '规格不限',
              style: {
                width: 170,
              },
              addonAfter: <div className="addon-after">条/台</div>,
            }}
          />
          <Field
            required
            type="string"
            name="numConfig.num"
            visible={true}
            x-props={{
              placeholder: '请输入8位以内正整数',
              style: {
                width: 170,
              },
              addonAfter: <div className="addon-after">条/台</div>,
            }}
            x-rules={[{ validator: posIntegerValidator(8) }]}
          />
          <Field
            type="checkbox"
            name="numConfig.noLimit"
            enum={[
              {
                label: '规格不限',
                value: -1,
              },
            ]}
          />
        </FormTextBox>

        <FormTextBox
          required
          title="时效性限制"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="number"
            name="timelinessConfig.numDisabled"
            visible={false}
            x-props={{
              placeholder: '规格不限',
              style: {
                width: 170,
              },
            }}
            x-component-props={{
              disabled: true,
            }}
          />
          <Field
            required
            type="number"
            name="timelinessConfig.num"
            visible={true}
            x-props={{
              placeholder: '请输入8位以内正整数',
              style: {
                width: 170,
              },
            }}
            x-rules={[{ validator: posIntegerValidator(8) }]}
          />
          <Field
            required
            type="string"
            name="timelinessConfig.unit"
            enum={['日', '月', '年']}
            x-props={{
              placeholder: '单位',
              style: {
                width: 60,
              },
              disabled: true,
            }}
            x-component-props={{
              disabled: false,
            }}
            x-rules={[{ required: true, message: '请选择单位' }]}
          />
          <Field
            type="checkbox"
            name="timelinessConfig.noLimit"
            enum={[
              {
                label: '规格不限',
                value: -1,
              },
            ]}
          />
        </FormTextBox>

        <Field
          required
          type="number"
          name="originalPrice"
          title="收款方标价"
          x-props={{
            style: {
              width: 270,
            },
            placeholder: '请输入收款方标价，最多保留两位小数',
            addonAfter: <div className="addon-after">元</div>,
          }}
          x-rules={[{ validator: moneyValidator(8) }]}
        />
        <FormTextBox
          required
          title="产品标价"
          text="%s %s %s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="productConfig.status"
            enum={[
              { label: '订购价格', value: 1 },
              { label: '预约价格', value: 2 },
            ]}
          />
          <Field
            required
            type="number"
            name="productConfig.price"
            x-props={{
              style: {
                width: 210,
              },
              placeholder: '请输入，最多保留两位小数',
              addonAfter: <div className="addon-after">元</div>,
            }}
            x-rules={[{ validator: moneyValidator(8) }]}
          />
          <Field
            type="string"
            name="productConfig.input"
            x-props={{
              style: {
                width: 210,
              },
              maxLength: 15,
              placeholder: '请输入15个字符，可为空',
            }}
          />
        </FormTextBox>
        <FormTextBox
          required
          title="优惠价"
          text="%s%s%s"
          className="xm-form-text-box"
        >
          <Field
            type="string"
            name="favorableConfig.status"
            enum={[
              { label: '支持', value: 1 },
              { label: '不支持', value: 0 },
            ]}
          />
          <Field
            required
            type="number"
            name="favorableConfig.amount"
            x-props={{
              style: {
                width: 210,
              },
              placeholder: '请输入，最多保留两位小数',
              addonAfter: <div className="addon-after">元</div>,
            }}
            x-rules={[{ validator: moneyValidator(8) }]}
          />
        </FormTextBox>

        {isAdd ? (
          <FormTextBox
            required
            title="可销库存数"
            text="%s%s%s"
            className="xm-form-text-box"
          >
            <Field
              type="number"
              name="stockConfig.numDisabled"
              visible={false}
              x-props={{
                placeholder: '库存不限',
                style: {
                  width: 200,
                },
              }}
              x-component-props={{
                disabled: true,
              }}
            />
            <Field
              type="number"
              name="stockConfig.num"
              visible={true}
              x-props={{
                placeholder: '请输入正整数',
                style: {
                  width: 200,
                },
              }}
              x-rules={[{ validator: stockValidator }]}
            />
            <Field
              type="checkbox"
              name="stockConfig.noLimit"
              enum={[
                {
                  label: "{{ text('库存不限', help('一般适用于虚拟商品')) }}",
                  value: -1,
                },
              ]}
              default={[]}
            />
          </FormTextBox>
        ) : (
          <Field
            editable={false}
            title="库存数目"
            type="string"
            name="stockConfig.num"
            x-props={{
              filter: value => {
                if (+value === -1) {
                  return '库存不限'
                }
                return value
              },
            }}
          />
        )}
        <Field
          type="string"
          name="skuInst"
          title="备注"
          x-component="TextArea"
          x-props={{
            placeholder: '请输入30字以内备注',
            maxLength: 30,
            style: {
              width: 280,
            },
            autoSize: {
              minRows: 2,
            },
          }}
        />
      </SchemaForm>
    </Modal>
  )
}
