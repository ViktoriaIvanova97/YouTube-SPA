import { Layout, Menu, Button } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice'

const { Header, Content } = Layout

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeKey = location.pathname.includes('favorites')
    ? 'favorites'
    : 'search'

  const logOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          items={[
            {
              key: 'search',
              label: <Link to="/home/search">Search</Link>,
            },
            {
              key: 'favorites',
              label: <Link to="/home/favorites">Favorites</Link>,
            },
          ]}
        />
        <Button type="primary" onClick={logOut}>
          Log out
        </Button>
      </Header>

      <Content className="header-content">
        <Outlet />
      </Content>
    </Layout>
  )
}

export default Home
