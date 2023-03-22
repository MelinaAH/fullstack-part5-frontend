import { useState } from 'react';

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = async (e) => {
    e.preventDefault();
    addBlog({
        title: title,
        author: author,
        url: url
      });
      
      setTitle('');
      setAuthor('');
      setUrl('');
  };

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url: <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
};

export default AddBlog;