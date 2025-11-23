import { useState } from 'react'
import { Modal, Tooltip, message } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../../slices/favoriteSlice'

const SaveHeart = ({ query }) => {
  const [open, setOpen] = useState(false)
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
          onClick={() => setOpen(true)}
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

      <Modal
        title="Сохранить запрос"
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <p>Сохранить запрос «{query}» в избранное?</p>
      </Modal>
    </>
  )
}

export default SaveHeart
