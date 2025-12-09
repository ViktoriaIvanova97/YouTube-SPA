import VideoCardGrid from './VideoCardGrid'

const VideoGrid = ({ items, onVideoClick }) => {
  return (
    <div className="video-grid">
      {items.map((video) => (
        <VideoCardGrid
          key={video.id.videoId}
          video={video}
          onVideoClick={onVideoClick}
        />
      ))}
    </div>
  )
}

export default VideoGrid
