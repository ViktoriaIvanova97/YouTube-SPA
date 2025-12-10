import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { selectorFavorites } from '../../RTK/selectors/selectors'
import { Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import SaveQueryModal from '../shared/Modal'
import { updateFavorite, deleteFavorite } from '..//../RTK/slices/favoriteSlice'
import  FavoriteCard  from '../shared/FavoriteCard'

const FavoritesPage = () => {
  const favorites = useSelector(selectorFavorites)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form] = Form.useForm()
  const [maxCount, setMaxCount] = useState(25)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleExecute = (item) => {
    navigate('/home/search', {
      state: { query: item.query, maxCount: item.maxCount, sort: item.sort },
    })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setMaxCount(item.maxCount)
    form.setFieldsValue({
      query: item.query,
      name: item.name,
      sort: item.sort || 'relevance',
    })
    setModalOpen(true)
  }

  const handleSave = (values) => {
    dispatch(updateFavorite({ id: editingItem.id, ...values }))
    setEditingItem(null)
  }

  const handleDelete = (id) => {
    dispatch(deleteFavorite(id))
  }

  return (
    <div>
      <h2>Избранное</h2>
      {favorites.map((item) => (
        <FavoriteCard
          key={item.id}
          item={item}
          onExecute={handleExecute}
          onEdit={handleEdit}
          onDelete={handleDelete}
          bodyStyle={{ display: 'none' }}
        />
      ))}
      {editingItem && (
        <SaveQueryModal
          open={modalOpen}
          query={editingItem?.query}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
          form={form}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
          isEdit={true}
        />
      )}
    </div>
  )
}

export default FavoritesPage
