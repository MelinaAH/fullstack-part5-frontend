import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [succeeded, setSucceeded] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      console.log('wrong username or password');

      setSucceeded(false);
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null)
        setSucceeded(true);
      }, 5000);
    }
  };

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
      setBlogs(blogs.concat(newBlog));
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      setTitle('');
      setAuthor('');
      setUrl('');
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

  /*
  //
  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorInput = (e) => {
    setAuthor(e.target.value);
  };

  const handleUrlInput = (e) => {
    setUrl(e.target.value);
  };
  */

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} succeeded={succeeded} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password<input
              type="password"
              value={password}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} succeeded={succeeded} />
      <div>
        {user.name} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedUser');
          setUser(null)
        }}>
          logout
        </button>
      </div>
      <div>
        <Togglable buttonLabel='new blog'>
          <AddBlog
            handleAddBlog={handleAddBlog}
            title={title}
            author={author}
            url={url}
            handleTitleInput={({ target }) => setTitle(target.value)} // handleTitleInput={handleTitleInput} works as well
            handleAuthorInput={({ target }) => setAuthor(target.value)}
            handleUrlInput={({ target }) => setUrl(target.value)}
          />
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App;
