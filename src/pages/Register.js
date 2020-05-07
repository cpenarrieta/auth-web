import React, { useState } from "react";
import { useMutation } from "graphql-hooks";
import { useHistory } from "react-router-dom";

const CREATE_USER_MUTATION = `
mutation CreateUser(
  $firstName: String
  $lastName: String
  $email: String!
  $password: String!
) {
  createUser(
    user: {
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    }
  ) {
    id
  }
}
`;

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await createUser({
          variables: {
            email,
            password,
            firstName,
            lastName,
          },
        });

        if (response?.data?.createUser?.id) {
          history.push("/");
        }
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          value={firstName}
          placeholder="firstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          value={lastName}
          placeholder="lastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">register</button>
      </div>
    </form>
  );
}

export default Register;
