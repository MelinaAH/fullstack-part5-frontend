import { useState} from 'react';
import blogService from '../services/blogs';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    }
    catch (exception) {
      console.log('something went wrong');
      setErrorMessage('wrong something went wrong');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
  };

  return (
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
  )
};

export default AddBlog;