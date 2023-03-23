import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    borderBottom: 'solid',
    borderWidth: 1,
    borderColor: 'darkgrey',
    marginBottom: 10,
    paddingBottom: 8
  };

  const [showAll, setShowAll] = useState(false);
  const [button, setButton] = useState('view');

  const toggleVisibility = () => {
    setShowAll(!showAll);
    if (button === 'view') {
      setButton('hide');
    }
    else {
      setButton('view');
    }
  };

  const addALike = () => {
    const updatedBlogObject = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlogObject);
  };

  if (!showAll) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{button}</button>
      </div>
    );
  }
  return (
    <div style={blogStyle}  className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{button}</button><br></br>
      {blog.url}<br></br>
      likes: {blog.likes} <button onClick={addALike}>likes</button><br></br>
      {blog.user.name}<br></br>
      <button onClick={() => deleteBlog(blog.id)}>remove blog</button>
    </div>
  );
};

export default Blog;