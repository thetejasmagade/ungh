import type { GithubUser } from "~types";

export default eventHandler(async (event) => {
  const res = await ghFetch("/search/users", {
    params: { q: event.context.params.query },
  });

  if (res.items.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "User Not Found",
    });
  }

  const user = <GithubUser>{
    id: res.items[0].id,
    username: res.items[0].login,
  };

  return { user };
});
