import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { submitPost } from '../../store/posts';
import { useHistory } from 'react-router-dom';
import './NewPostPage.css';

function ImagePostPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [urlContent, setUrlContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(submitPost({ title, urlContent, postBody, type: 'image' }))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
        return history.push('/dashboard');
    }

    return (
        <div className="post-container">
            <form className="content" onSubmit={handleSubmit}>
                {errors.map((error, idx) => (
                    <p className="post-error" key={idx}>{error}</p>
                ))}
                <label>Post a new image:</label>
                <input
                    className="title"
                    placeholder="Title"
                    value={title}
                    onChange={({ target: { value } }) => setTitle(value)}
                    required
                />
                <input
                    className="url-input"
                    placeholder="Image URL"
                    value={urlContent}
                    onChange={({ target: { value } }) => setUrlContent(value)}
                    required
                />
                <textarea
                    type="text"
                    placeholder="Description"
                    value={postBody}
                    onChange={({ target: { value } }) => setPostBody(value)}
                />
                <div>
                    <button type="submit">CREATE POST</button>
                </div>
            </form>
        </div>

    )
}

export default ImagePostPage;