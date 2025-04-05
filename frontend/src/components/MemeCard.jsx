import '../css/meme-card.css';

function MemeCard({ meme, onLike }) {
  return (
    <div className="meme-card">
      <img src={meme.url} alt="Meme" />
      <div className="meme-card-content">
        <p>Posted by: {meme.username}</p>
        <p>Likes: {meme.likes}</p>
        <button onClick={onLike} className="btn">❤️</button>
      </div>
    </div>
  );
}

export default MemeCard;