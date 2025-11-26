import { Card } from 'antd'


const VideoList = ({ items }) => {
  return (
    <div>
      {items.slice(0, maxCount).map((video) => (
        <Card
          key={video.id.videoId}
          hoverable
          style={{
            marginBottom: 16,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
              <Card.Meta title={video.snippet.title} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};



export default VideoList
