import { useState } from "react";

const Blog = ({ blog }) => {
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

  if (!showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{button}</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{button}</button><br></br>
        {blog.url}<br></br>
        likes: {blog.likes} <button>likes</button><br></br>
        {blog.user.name}
      </div>
  )
}

export default Blog;