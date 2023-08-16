import { trpc } from "./trpc";

export function ExampleQuery() {
  const userQuery = trpc.getUserByFirstName.useQuery({ firstName: "Niels" });
  return (
    <div>
      <h1>
        Welcome to tRPC
        {userQuery.data ? `, ${userQuery.data?.firstName}` : null}!
      </h1>
    </div>
  );
}
