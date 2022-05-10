import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleAddLike, handleDeleteBlog, user }) => {
	const [open, setOpen] = useState(null)

	const openedStyle = {
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const closedStyle = {
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<>
			{ !open ?
				<div style={closedStyle}>
					{blog.title}
					<button onClick={() => setOpen(true)}>
            view
					</button>
				</div> :
				<div style={openedStyle}>
					{blog.title}
					<button onClick={() => setOpen(null)}>
            hide
					</button>
					<div>
						{blog.url}
					</div>
					<div>
            likes {blog.likes}
						<button onClick={() => handleAddLike(blog)}>
              like
						</button>
					</div>
					<div>
						{blog.author}
					</div>
					{user.username === blog.user.username &&
            <button onClick={() => handleDeleteBlog(blog)}>
              remove
            </button>
					}
				</div>
			}
		</>
	)}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleAddLike: PropTypes.func.isRequired,
	handleDeleteBlog: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default Blog