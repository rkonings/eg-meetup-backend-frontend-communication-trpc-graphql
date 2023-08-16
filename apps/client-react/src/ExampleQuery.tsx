import { trpc } from "./trpc";

export function ExampleQuery() {
  const users = trpc.getUsers.useQuery();

  if (!users.data || users.data.length === 0) {
    return null;
  }

  return (
    <ul>
      {users.data.map((user) => (
        <li key={user.firstName}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
}
