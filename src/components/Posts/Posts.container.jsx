import Posts from "./Posts";
import React, { useState, useEffect, useMemo } from "react";

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const truncateText = useMemo(
    () => (textValue, maxLength) => {
      if (textValue?.length > maxLength) {
        return textValue.substring(0, maxLength) + "...";
      }
      return textValue;
    },
    []
  );
  const viewComments = useMemo(
    () => (postId) => {
        console.log(postId);
      fetch(`https://dummyjson.com/posts/${postId}/comments`)
        .then((response) => response.json())
        .then(data => setComments(prevState => ({ ...prevState, [postId]: data.comments })))
        .catch((error) => console.error("Error fetching comments:", error));
    },
    []
  );
  return (
    <Posts
      posts={posts}
      truncateText={truncateText}
      viewComments={viewComments}
      comments={comments}
    />
  );
};

export default PostsContainer;
