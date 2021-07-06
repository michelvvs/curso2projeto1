import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          albumId: 1,
          id: 1,
          url: 'urk1.jpg',
        },
        {
          albumId: 2,
          id: 2,
          url: 'urk2.jpg',
        },
        {
          albumId: 2,
          id: 2,
          url: 'urk2.jpg',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/comments', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          postId: 1,
          id: 1,
          name: 'title1',
        },
        {
          postId: 2,
          id: 2,
          name: 'title2',
        },
        {
          postId: 3,
          id: 3,
          name: 'title3',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and loadMore', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('nadicas, baby');
    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();
  });
});
