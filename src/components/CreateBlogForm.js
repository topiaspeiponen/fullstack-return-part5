import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
    // Blog states
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleCreateBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <h2>create new blog</h2>
            <form onSubmit={addBlog}>
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
            <button type="submit">create</button>
            </form>
        </>
    )
}

export default CreateBlogForm