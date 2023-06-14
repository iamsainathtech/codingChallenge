import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PostsContainer from '../../../components/Posts/Posts.container';

describe('PostsContainer', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ posts: [{ id: 1, title: 'Post 1', body: 'Post body 1' }] }),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  test('renders posts', async () => {
    await act(async () => {
      render(<PostsContainer />);
    });

    // check URL of fetch
    expect(global.fetch).toHaveBeenCalledWith('https://dummyjson.com/posts');

    // Wait for the data to be loaded
    await screen.findByText('Post 1');

    // Check if the rendered post is displayed correctly
    expect(screen.getByText('Post 1')).toBeInTheDocument();
  });
});
