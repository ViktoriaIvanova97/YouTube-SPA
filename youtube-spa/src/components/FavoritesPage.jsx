import { useSelector } from 'react-redux'
import { selectorFavorites } from '../selectors/selectors'
import { Card, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const FavoritesPage = () => {
  const favorites = useSelector(selectorFavorites)
  console.log(favorites)

  const navigate = useNavigate()


  const handleExecute = (query) => {
	navigate('/home/search', { state: { query } })
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
              <Button type="primary" onClick={() => handleExecute(item.query)}>Выполнить</Button>
              <Button>Редактировать</Button>
              <Button danger>Удалить</Button>
            </Space>
          }
          bodyStyle={{ display: 'none' }}
        />
      ))}
    </div>
  )
}

export default FavoritesPage
