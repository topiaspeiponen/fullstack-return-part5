const CreateBlogForm = ({ handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={handleCreateBlog}>
            <div>
                title
                <input
                type="text"
                value={title}
                name="Username"
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                name="Username"
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                type="text"
                value={url}
                name="Username"
                onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create blog</button>
            </form>
        </>
    )
}

export default CreateBlogForm