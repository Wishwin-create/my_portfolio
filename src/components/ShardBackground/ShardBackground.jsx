import './ShardBackground.css';

// Each shard: position, size, rotation, animation delay/duration — all randomized once per mount
const generateShards = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 40 + Math.random() * 90,
    rotation: Math.random() * 360,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * -20,
    opacity: 0.05 + Math.random() * 0.12,
  }));
};

const ShardBackground = ({ count = 14 }) => {
  const shards = generateShards(count);

  return (
    <div className="shard-bg-wrapper" aria-hidden="true">
      {shards.map((shard) => (
        <span
          key={shard.id}
          className="shard-piece"
          style={{
            top: `${shard.top}%`,
            left: `${shard.left}%`,
            width: `${shard.size}px`,
            height: `${shard.size * 1.4}px`,
            transform: `rotate(${shard.rotation}deg)`,
            animationDuration: `${shard.duration}s`,
            animationDelay: `${shard.delay}s`,
            opacity: shard.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default ShardBackground;