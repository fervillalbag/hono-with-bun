import { hc } from "hono/client";
import { queryOptions } from "@tanstack/react-query";

import { type ApiRoutes } from "@server/app";

const client = hc<ApiRoutes>("/");
export const api = client.api;

async function getCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) throw new Error("server error");

  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
