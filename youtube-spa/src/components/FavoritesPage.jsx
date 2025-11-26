import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { selectorFavorites } from '../selectors/selectors'
import { Card, Button, Space, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import SaveQueryModal from './shared/Modal'
import { updateFavorite } from '../slices/favoriteSlice'

const FavoritesPage = () => {
  const favorites = useSelector(selectorFavorites)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form] = Form.useForm()
  const [maxCount, setMaxCount] = useState(25)
  console.log(favorites)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleExecute = (item) => {
    navigate('/home/search', {
      state: { query: item.query, maxCount: item.maxCount },
    })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setMaxCount(item.maxCount || 25)
    form.setFieldsValue({
      name: item.name,
      sort: item.sort || 'relevance',
    })
    setModalOpen(true)
  }

  const handleSave = (values) => {
    dispatch(
      updateFavorite({
        id: editingItem.id,
        query: editingItem.query,
        name: values.name,
        sort: values.sort,
        maxCount,
      })
    )
    setModalOpen(false)
  }

  return (
    <div>
      <h2>Избранное</h2>
      {favorites.map((item) => (
        <Card
          key={item.id}
          title={item.query}
          extra={
            <Space>
              <Button type="primary" onClick={() => handleExecute(item)}>
                Выполнить
              </Button>
              <Button onClick={() => handleEdit(item)}>Редактировать</Button>
              <Button danger>Удалить</Button>
            </Space>
          }
          bodyStyle={{ display: 'none' }}
        />
      ))}
      {editingItem && (
        <SaveQueryModal
          open={modalOpen}
          query={editingItem.query}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
          form={form}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
        />
      )}
    </div>
  )
}

export default FavoritesPage
