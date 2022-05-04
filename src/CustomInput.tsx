import React, { useState, useEffect, useRef, cloneElement, Children, ReactElement, MouseEvent, KeyboardEvent, JSXElementConstructor } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faUserPlus,
  faUserSlash,
  faPlusCircle,
  faSadCry
} from "@fortawesome/free-solid-svg-icons";

import {
  InputContainer,
  Input,
  Label,
  Separator,
  DropdownContainer,
  Dropdown,
  ListUser,
  ListUserSelected,
  Subtitle,
  DisplayedUsers,
  SelectedDisplayedUser,
  Avatar,
  ClickOut,
  EmptyResult,
  UnselectAll,
  ListAllActions
} from "./styles";

interface CustomInputProps {
  children: any
  data: UserProps[]
}

export interface UserProps {
  isSelected: boolean
  id: number
  name: string
  username: string
}

export function CustomInput({ children, data }: CustomInputProps) {
  const [users, setUsers] = useState<UserProps[]>([]);
  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleSelection = (user: UserProps) => {
    user.isSelected = true;
    setUsers(
      [...users.filter((e) => e.id !== user.id), user].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  const handleUnselection = (user: UserProps) => {
    user.isSelected = false;
    setUsers(
      [...users.filter((e) => e.id !== user.id), user].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  const handleSelectAll = () => {
    let tempArray = [...users];
    tempArray.map((user) => (user.isSelected = true));
    setUsers(tempArray);
  };

  const handleUnselectAll = () => {
    let tempArray = [...users];
    tempArray.map((user) => (user.isSelected = false));
    setUsers(tempArray);
  };

  const _children = Children.map(children, (child) => {
    console.log('type carai', child.type === CustomInputField)
    if (child.type === CustomInputField) {
      return cloneElement(child, {
        users,
        selectUser: handleSelection,
        unselectUser: handleUnselection,
        selectAll: handleSelectAll,
        unselectAll: handleUnselectAll
      });
    }

    if (child.type === CustomInputResult) {
      return cloneElement(child, {
        users,
        unselectUser: handleUnselection,
        unselectAll: handleUnselectAll
      });
    }

    return cloneElement(child, {
      className:
        users.filter((user) => user.isSelected).length > 0
          ? "active"
          : "inactive"
    });
  });
  // console.log(_children)
  return _children;
}

interface CustomInputFieldProps {
  label?: string
  users?: UserProps[]
  selectUser?: (user: UserProps) => void
  unselectUser?: (user: UserProps) => void
  selectAll?: () => void
  unselectAll?: () => void
}

export const CustomInputField = ({
  label,
  users,
  selectUser,
  unselectUser,
  selectAll,
  unselectAll
}: CustomInputFieldProps) => {
  const [availableUsers, setAvailableUsers] = useState<UserProps[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef != null) {
      setSearchValue(inputRef.current?.value);
      if (searchValue.length <= 0 && users) {
        setAvailableUsers(users);
      } else {
        validateSearch();
      }
    }
  }, [searchValue, users]);

  const validateSearch = () => {
    let search = searchValue.toLowerCase().trim();
    if (searchValue.length >= 0) {
      let filteredUsers = users?.filter((user) =>
        user.name.toLowerCase().includes(search)
      );
      if (filteredUsers && filteredUsers.length > 0) {
        setAvailableUsers(filteredUsers);
        setError(false);
      } else {
        setAvailableUsers([]);
        setError(true);
      }
    }
  };

  const handleInputFocus = (e: any) => {
    e.persist()

    if (users) {
      setAvailableUsers(users);
    }
    validateSearch();
    setShow(true);
  };

  const handleSearch = (e: any) => {
    e.persist();
    validateSearch();
  };

  const handleSelection = (user: UserProps) => {
    if (user.isSelected) {
      setSearchValue("")
      setShow(false)
      unselectUser?.(user)
    } else {
      setAvailableUsers([])
      setSearchValue("")
      setShow(false);
      selectUser?.(user)
    }
  }

  const handleAll = (type: string) => {
    setShow(false);
    if (type === "unselect")
      unselectAll?.();
    if (type === "select") selectAll?.();
  };

  const handleItemsKeyDown = (e: KeyboardEvent, user: UserProps) => {
    if (e.key === "Enter") {
      handleSelection(user);
    }
    if (e.key === "Escape") setAvailableUsers([]);
    if (e.key === "ArrowDown") {
      const item = document.activeElement;
      const activate = (item: HTMLElement) => {
        // Set all of the buttons to tabindex -1
        document.querySelectorAll("li").forEach((li) => (li.tabIndex = -1));

        // Make the current button "active"
        item.tabIndex = 0;
        item.focus();
      };
      if (item?.nextElementSibling) {
        activate(item.nextElementSibling as HTMLElement);
      }
    }
    if (e.key === "ArrowUp") {
      const item = document.activeElement;
      const activate = (item: HTMLElement) => {
        document.querySelectorAll("li").forEach((li) => (li.tabIndex = -1));
        item.tabIndex = 0;
        item.focus();
      };
      if (item?.previousElementSibling) {
        activate(item.previousElementSibling as HTMLElement);
      }
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    setShow(true);
    if (e.key === "ArrowDown") document.querySelectorAll("li")[0].focus();
    if (e.key === "Escape") {
      setAvailableUsers([]);
      setShow(false);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      let search = searchValue.toLowerCase().trim();
      let firstUser = users?.filter((user) =>
        user.name.toLowerCase().includes(search)
      )[0];
      if (firstUser) {
        selectUser?.(firstUser);
        setAvailableUsers([]);
        setSearchValue("");
        setShow(false);
      }
    }
  };

  const setDropdownClassName = () => {
    if (show && !error) {
      return "visible";
    } else if (show && error) {
      return "visible error";
    } else {
      return "hidden";
    }
  };

  const renderSelectedUsers = (users: UserProps[]) =>
    users.filter((user) => user.isSelected).length > 0 && (
      <>
        <ListAllActions onClick={() => handleAll("unselect")}>
          Unselect All
        </ListAllActions>
        <Subtitle aria-hidden={true}>
          Selected: <b>({users.filter((user) => user.isSelected).length})</b>
        </Subtitle>
        {users
          .filter((user) => user.isSelected)
          .map((user, index) => (
            <ListUserSelected
              key={user.username}
              onClick={() => handleSelection(user)}
              onKeyDown={(e) => handleItemsKeyDown(e, user)}
            >
              <Avatar className="list delete">
                <FontAwesomeIcon icon={faUserSlash} />
              </Avatar>
              <span>{user.name}</span>
            </ListUserSelected>
          ))}
        <Separator aria-hidden={true} />
      </>
    );

  const renderUnselectedUsers = (users: UserProps[]) =>
    users.filter((user) => !user.isSelected).length > 0 ? (
      <>
        <ListAllActions onClick={() => handleAll("select")}>
          Select All
        </ListAllActions>
        <Subtitle aria-hidden={true}>
          All Users: <b>({users.filter((user) => !user.isSelected).length})</b>
        </Subtitle>
        {users
          .filter((user) => !user.isSelected)
          .map((user, index) => (
            <ListUser
              key={user.username}
              onClick={() => handleSelection(user)}
              onKeyDown={(e) => handleItemsKeyDown(e, user)}
              tabIndex={0}
            >
              <Avatar className="list">
                <FontAwesomeIcon icon={faUserPlus} />
              </Avatar>
              <span>{user.name}</span>
            </ListUser>
          ))}
      </>
    ) : (
      <ListUser>No more users available</ListUser>
    );

  const renderUsers = (users: UserProps[]) => {
    if (users.length > 0) {
      return (
        <>
          {renderSelectedUsers(users)}
          {renderUnselectedUsers(users)}
        </>
      );
    }

    if (error) {
      return (
        <ListUser>
          User &nbsp; <b>{searchValue}</b> &nbsp;does not exist
        </ListUser>
      );
    }

    return <ListUser> Start typing...</ListUser>;
  };

  return (
    <>
      <Label>{label}</Label>
      <InputContainer>
        <button
          type="button"
          className={setDropdownClassName()}
          onClick={(e) => handleInputFocus(e)}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        <Input
          type="text"
          placeholder="Users"
          className={error ? "is-invalid" : "is-valid"}
          ref={inputRef}
          value={searchValue}
          onFocus={(e) => handleInputFocus(e)}
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(e);
          }}
          onKeyDown={(e) => handleInputKeyDown(e)}
        />
      </InputContainer>
      {show && (
        <ClickOut
          onClick={() => {
            setSearchValue("");
            setShow(false);
          }}
        />
      )}
      <DropdownContainer>
        <Dropdown className={setDropdownClassName()}>
          {availableUsers && renderUsers(availableUsers)}
        </Dropdown>
      </DropdownContainer>
    </>
  );
};

interface CustomInputResultProps {
  users: UserProps[]
  unselectUser: (user: UserProps) => void
  unselectAll: () => void
}


export const CustomInputResult = ({ users, unselectUser, unselectAll }: CustomInputFieldProps) => {
  const renderUsers = (users?: UserProps[]) => {
    if (users) {
      if (users.length > 0) {
        return users
          .filter((user) => user.isSelected)
          .map((user) => (
            <SelectedDisplayedUser
              key={user.username}
              className="delete"
              onClick={() => unselectUser?.(user)}
            >
              <Avatar className="avatar">
                <FontAwesomeIcon icon={faUser} />
              </Avatar>
              <Avatar className="avatar-delete delete">
                <FontAwesomeIcon icon={faUserSlash} />
              </Avatar>
              <p>{user.name}</p>
            </SelectedDisplayedUser>
          ));
      }
    }
  };

  return (
    <>
      <DisplayedUsers>{renderUsers(users)}</DisplayedUsers>
      {users && users.filter((user) => user.isSelected).length <= 0 ? (
        <EmptyResult>
          <FontAwesomeIcon icon={faSadCry} />
          <span>You have not select any user</span>
        </EmptyResult>
      ) : (
        <UnselectAll onClick={() => unselectAll?.() }>Unselect All</UnselectAll>
      )}
    </>
  );
};
