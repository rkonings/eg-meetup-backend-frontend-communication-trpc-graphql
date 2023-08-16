import { trpc } from "./trpc";

export function ExampleQuery() {
  const getUsersQuery = trpc.getUsers.useQuery();

  if (!getUsersQuery.data || getUsersQuery.data.length === 0) {
    return null;
  }

  return (
    <ul>
      {getUsersQuery.data.map((user) => (
        <li key={user.firstName}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
}
