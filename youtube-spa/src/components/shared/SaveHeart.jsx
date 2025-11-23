import { useState } from 'react'
import { Tooltip, message,Form } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../../slices/favoriteSlice'
import SaveQueryModal from '../shared/Modal'

const SaveHeart = ({ query }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [maxCount, setMaxCount] = useState(25);
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(addFavorite(query))
    setOpen(false)
    message.success('Поиск сохранён в избранное')
  }

  return (
    <>
      <Tooltip title="Сохранить в избранное">
        <span
          onClick={() => setModalOpen(true)}
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

      <SaveQueryModal
        open={modalOpen}
        query={query}
        onSave={handleSave}
        onCancel={() => setModalOpen(false)}
        form={form}
        maxCount={maxCount}
        setMaxCount={setMaxCount}
      />
    </>
  )
}

export default SaveHeart
