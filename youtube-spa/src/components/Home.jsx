import { Layout, Menu, Button } from 'antd'
import { SearchOutlined, StarOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { persistor } from '../app/store'
import { logout } from '../slices/authSlice'

const { Header, Content } = Layout

const Home = () => {
  const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
  const activeKey = location.pathname.includes('favorites')
    ? 'favorites'
    : 'search'

  const logOut = async () => {
    dispatch(logout())
    await persistor.flush()
    localStorage.clear()
    navigate('/registerform')
  }

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          items={[
            {
              key: 'search',
              icon: <SearchOutlined />,
              label: <Link to="/search">Поиск</Link>,
            },
            {
              key: 'favorites',
              icon: <StarOutlined />,
              label: <Link to="/favorites">Избранное</Link>,
            },
          ]}
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={
            logOut
          }
        >
          Выйти
        </Button>
      </Header>

      <Content
        style={{
          marginTop: 64,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          padding: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  )
}

export default Home
