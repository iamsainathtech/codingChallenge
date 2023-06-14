import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Posts from "../../../components/Posts/Posts";

describe("Posts", () => {
  test("renders posts and handles view comments", async () => {
    const posts = [
      {
        id: 1,
        userId: 1,
        title: "Post 1",
        body: "Post body 1",
      },
      {
        id: 2,
        userId: 2,
        title: "Post 2",
        body: "Post body 2",
      },
    ];

    const truncateText = jest.fn((textValue, maxLength) => textValue);
    const viewComments = jest.fn();

    const comments = {
      1: [
        {
          id: 1,
          body: "Comment 1",
        },
        {
          id: 2,
          body: "Comment 2",
        },
      ],
    };

    render(
      <Posts
        posts={posts}
        truncateText={truncateText}
        viewComments={viewComments}
        comments={comments}
      />
    );

    // Check if the posts are rendered correctly
    expect(screen.getByTestId("post-title-1")).toBeInTheDocument();
    expect(screen.getByTestId("post-title-2")).toBeInTheDocument();

    // Check if the truncateText function is called correctly
    expect(truncateText).toHaveBeenCalledTimes(4); 

    // Wait for the "View Comment" button to become available
    await waitFor(
      () => {
        expect(screen.getByTestId("view-comment-button-1")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check if the viewComments function is called when the button is clicked
    fireEvent.click(screen.getByTestId("view-comment-button-1"));
    expect(viewComments).toHaveBeenCalledWith(1);
  });
});
