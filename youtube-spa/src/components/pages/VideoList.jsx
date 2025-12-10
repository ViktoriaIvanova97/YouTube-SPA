import VideoCardList from '../shared/VideoCardList'

const VideoList = ({ items, onVideoClick }) => (
  <div className="video-list">
    {items.map((video) => (
      <VideoCardList
        key={video.id.videoId}
        video={video}
        onVideoClick={onVideoClick}
      />
    ))}
  </div>
)

export default VideoList
