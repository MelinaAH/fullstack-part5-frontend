const AddBlog = ({
  handleAddBlog,
  title,
  author,
  url,
  handleTitleInput,
  handleAuthorInput,
  handleUrlInput }) => {
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={handleTitleInput}
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            onChange={handleAuthorInput}
          />
        </div>
        <div>
          url: <input
            type="text"
            value={url}
            onChange={handleUrlInput}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
};

export default AddBlog;