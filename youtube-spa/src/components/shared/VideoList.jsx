import { Card } from 'antd'

const VideoList = ({ items, maxCount }) => {
  return (
    <div>
      {items.slice(0, maxCount).map((video) => (
        <Card
          key={video.id.videoId}
          hoverable
          style={{
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <iframe
              width="300"
              height="180"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
              style={{
                borderRadius: '12px',
                marginRight: 16,
                flexShrink: 0,
              }}
            />

            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              <Card.Meta
                title={
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
                description={
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      padding: '0 5px',
                      color: 'gray',
                    }}
                  >
                    {video.snippet.channelTitle}
                  </div>
                }
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default VideoList
