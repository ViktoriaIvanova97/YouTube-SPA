import { Card, Button, Space } from 'antd'
import React from 'react'
import { memo } from 'react'

const FavoriteCard = ({ item, onExecute, onEdit, onDelete }) => {
  return (
    <Card
      title={item.name}
      extra={
        <Space>
          <Button type="primary" onClick={() => onExecute(item)}>Выполнить</Button>
          <Button onClick={() => onEdit(item)}>Редактировать</Button>
          <Button danger onClick={() => onDelete(item.id)}>Удалить</Button>
        </Space>
      }
      bodyStyle={{ display: 'none' }}
    />
  )
}

export default memo(FavoriteCard)
