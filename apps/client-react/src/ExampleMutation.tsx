import { FormEvent } from "react";
import { trpc } from "./trpc";

import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

function getFormData(event: FormEvent<HTMLFormElement>) {
  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData);

  return data;
}

export function ExampleMutation() {
  const utils = trpc.useContext();
  const addUserMutation = trpc.addUser.useMutation({
    onSuccess() {
      utils.getUsers.invalidate();
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = getFormData(event);

    const result = UserSchema.safeParse(data);

    if (result.success) {
      addUserMutation.mutate(result.data);
      event.currentTarget.reset();
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="First name" name="firstName" />
        <input type="text" placeholder="Last name" name="lastName" />
        <button type="submit">Create</button>
      </form>

      <>
        {addUserMutation.data ? (
          <>
            {addUserMutation.data.firstName} {addUserMutation.data?.lastName} is
            created
          </>
        ) : null}
      </>
    </>
  );
}
