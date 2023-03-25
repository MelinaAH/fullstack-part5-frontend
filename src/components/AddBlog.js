import { useState } from 'react';
import PropTypes from 'prop-types';

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
    <div className='formDiv'>
      <h2>create a new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            id='author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url: <input
            type="text"
            value={url}
            id='url'
            onChange={(e) => setUrl(e.target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit' id='createButton'>create</button>
      </form>
    </div>
  );
};

AddBlog.propTypes = {
  addBlog: PropTypes.func.isRequired
};

export default AddBlog;