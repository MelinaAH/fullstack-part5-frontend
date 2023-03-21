import { useState } from 'react';
import blogService from '../services/blogs';
import Notification from '../components/Notification';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(true);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    try {
      const newObject = {
        title: title,
        author: author,
        url: url
      };
      const newBlog = await blogService.create(newObject);
      console.log(newBlog);
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      /*if (newBlog) {
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      }*/
    }
    catch (exception) {
      console.log('something went wrong');
      setSucceeded(false);
      setMessage('a new blog cannot be added');
      setTimeout(() => {
        setMessage(null)
        setSucceeded(true);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={message} succeeded={succeeded} />
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url: <input
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
};

export default AddBlog;