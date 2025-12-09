import { Layout, Menu, Button } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { logout } from '../slices/authSlice'

const { Header, Content } = Layout

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const activeKey = useMemo(
    () => (location.pathname.includes('favorites') ? 'favorites' : 'search'),
    [location.pathname]
  )

  const menuItems = useMemo(
    () => [
      { key: 'search', label: <Link to="/home/search">Search</Link> },
      { key: 'favorites', label: <Link to="/home/favorites">Favorites</Link> },
    ],
    []
  )

  const logOut = useCallback(() => {
    dispatch(logout())
    navigate('/')
  }, [dispatch, navigate])

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          items={menuItems}
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
