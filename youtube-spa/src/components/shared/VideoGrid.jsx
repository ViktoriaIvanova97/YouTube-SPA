import { Row, Col, Card } from 'antd'


const VideoGrid = ({ items }) => {
  return (
    <Row gutter={[16, 16]}>
      {items.map((video) => (
        <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
          <Card hoverable style={{ height: 220 }}>
            <iframe
              width="100%"
              height="150"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: '12px', }}
              
            />
            <Card.Meta
              description={
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    padding: '0 5px',
                  }}
                >
                  {video.snippet.title}
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default VideoGrid
