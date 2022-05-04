import React, { useState, useEffect } from "react";

import BarLoader from "react-spinners/BarLoader";

import {
  CustomInput,
  CustomInputField,
  CustomInputResult,
  UserProps
} from "./CustomInput";

import { AppContainer, UsersForm, Button } from "./styles";

const App = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isFetchingUsers, setFetchingUsers] = useState(true);

  const fetchUsers = async () => {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");

    let dataUsers: UserProps[] = await res.json()
    dataUsers.map(users => (users.isSelected = false))
    setUsers(dataUsers.sort((a, b) => a.id - b.id));
    setFetchingUsers(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit =  (e: any) => {
    e.preventDefault();
    users.filter(user => user.isSelected).length > 0 &&
      alert(
        "users:\n" +
          users
            .filter(user => user.isSelected)
            .map((user, index) => "\n" + (index + 1) + ". " + user.name) +
          "\n\nHave just been added"
      );

    let arr: UserProps[] = [];
    users.map(user => arr.push({ ...user, isSelected: false }));
    setUsers(arr);
  };

  return (
    <AppContainer tabIndex={0}>
      <UsersForm onSubmit={e => handleSubmit(e)}>
        {isFetchingUsers ? (
          <BarLoader height={4} width={100} color={"#001727"} />
        ) : (
          <CustomInput data={users}>
            <CustomInputField label="Add Users" />
            <CustomInputResult />
            <Button>Submit</Button>
          </CustomInput>
        )}
      </UsersForm>
    </AppContainer>
  );
};

export default App;
