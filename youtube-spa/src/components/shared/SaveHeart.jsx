import { useState, memo, Suspense, lazy} from 'react'
import { Tooltip, message, Form } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addFavorite } from '..//../RTK/slices/favoriteSlice'
const SaveQueryModal = lazy(() => import('../shared/Modal'))

const SaveHeart = ({ query }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [maxCount, setMaxCount] = useState(25)
  const dispatch = useDispatch()

  const handleSave = (values) => {
    dispatch(
      addFavorite({ query, name: values.name, sort: values.sort, maxCount })
    )
    setModalOpen(false)
    message.success('Поиск сохранён в избранное')
  }

  const openModal = () => {
    form.setFieldsValue({
      query,
      name: query,
      sort: 'relevance',
    })
    setModalOpen(true)
  }
  return (
    <>
      <Tooltip title="Сохранить в избранное">
        <span
          onClick={openModal}
          style={{
            cursor: 'pointer',
            fontSize: 20,
            color: query ? 'rgba(27, 127, 204, .8)' : '#ccc',
            pointerEvents: query ? 'auto' : 'none',
          }}
        >
          <HeartOutlined />
        </span>
      </Tooltip>
      <Suspense fallback={<div>Загрузка...</div>}>
        <SaveQueryModal
          open={modalOpen}
          query={query}
          onSave={handleSave}
          onCancel={() => setModalOpen(false)}
          form={form}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
          isEdit={false}
        />
      </Suspense>
    </>
  )
}

export default memo(SaveHeart)
