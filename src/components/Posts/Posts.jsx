import './Posts.styles.css';

const Posts = ({ posts, truncateText, viewComments, comments }) => {
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>User Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td data-testid={`post-title-${post.id}`}>{truncateText(post.title, 50)}</td>
              <td>{truncateText(post.body, 50)}</td>
              <td>
                <button  data-testid={`view-comment-button-${post.id}`} onClick={() => viewComments(post.id)}>
                  View Comment
                </button>
                {comments[post.id] && (
                  <ul>
                    {comments[post.id]?.map((comment) => (
                      <li key={comment.id}>
                        <strong>{comment.id}</strong>: {comment.body}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
