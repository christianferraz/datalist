import styled from "styled-components";

export const AppContainer = styled.section`
  && {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: calc(100vh - 16px);
    overflow: hidden;

    background: #001727;
    border-radius: 5px;
    box-shadow: 0 0 30px -5px #000;
    outline: none;

    @import url("https://fonts.googleapis.com/css?family=Mukta:300,400,500,600,700&display=swap");
    font-family: "Mukta", sans-serif;

    & * {
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      margin: 0;
      padding: 0;
      text-decoration: none;
      outline: none;
    }
  }
`;

export const UsersForm = styled.form`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: white;
    padding: 16px 24px;
    min-height: 200px;
    border-radius: 4px;
    width: 460px;
    z-index: 1;
    text-transform: capitalize;
  }
`;

export const Label = styled.h1`
  && {
    margin-bottom: 12px;
  }
`;

export const InputContainer = styled.div`
  && {
    width: 100%;
    position: relative;

    & button {
      height: 100%;
      padding: 0 8px;
      border: none;
      background: none;
      outline: none;
      position: absolute;
      right: 0;
      cursor: pointer;

      & svg {
        font-size: 1.1rem;
        & path {
          fill: #207ebc;
        }
      }

      &.error {
        & svg {
          & path {
            fill: #ff6b6b;
          }
        }
      }

      &.visible {
        & svg {
          transform: rotate(45deg);
        }
      }
    }
  }
`;

export const Input = styled.input`
  && {
    width: 100%;
    padding: 8px 28px 8px 12px;
    border-radius: 4px;
    border: solid 1px #ccc;
    outline: none;
    text-transform: capitalize;

    &:focus {
      border: solid 1px #001727;
      box-shadow: inset 0 0 5px -2px #001727;

      &.is-invalid {
        border: solid 1px red;
        box-shadow: inset 0 0 5px -2px red;
      }
    }
  }
`;

export const Subtitle = styled.div`
  && {
    width: 100%;
    color: #999;
    font-weight: 500;
    font-size: 0.9rem;
    padding-left: 12px;
    margin-top: 4px;

    & b {
      font-weight: 800;
      color: #888;
    }
  }
`;

export const Separator = styled.div`
  && {
    width: 100%;
    height: 1px;
    background: #ccc;
    margin: 4px 0;
  }
`;

export const DropdownContainer = styled.div`
  && {
    width: calc(100% - 8px);
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1000;
  }
`;

export const Dropdown = styled.ul`
  && {
    width: 100%;
    list-style: none;
    padding: 4px 0 0 0;
    margin: 0;
    background: white;
    position: absolute;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 3px 6px -3px #000;
    overflow-y: auto;
    height: fit-content;
    max-height: 360px;
    transform-origin: center top;

    &.hidden {
      transform: scaleY(0);
    }
    &.visible {
      transform: scaleY(1);
      &.error {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        padding-bottom: 4px;
      }
    }
  }
`;

export const ListUser = styled.li`
  && {
    display: flex;
    width: 100%;
    padding: 8px 12px;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus {
      background: #e0f2ff;
    }

    & span {
      margin-left: 8px;
    }
  }
`;

export const ListUserSelected = styled.article`
  && {
    display: flex;
    width: 100%;
    padding: 8px 12px;
    cursor: pointer;
    outline: none;

    &:hover {
      background: #f9dede;
    }

    & span {
      margin-left: 8px;
    }
  }
`;

export const SelectedListUser = styled(ListUser)`
  && {
    width: 100%;
    padding: 6px 12px;
  }
`;

export const DisplayedUsers = styled.ul`
  && {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
    width: 100%;
    padding: 8px;
  }
`;

export const SelectedDisplayedUser = styled.li`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 25%;
    height: 100px;
    padding: 12px;
    cursor: pointer;

    &.delete {
      &:hover {
        background: #f9dede;
      }
    }

    & .avatar {
      display: flex;
    }

    & .avatar-delete {
      display: none;
    }

    &:hover {
      background: #e0f2ff;

      & .avatar {
        display: none;
      }

      & .avatar-delete {
        display: flex;
      }
    }

    & p {
      margin-top: 8px;
      line-height: 0.95em;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
      max-height: 22px;
      overflow: hidden;

      &.new {
        font-weight: 800;
        color: #207ebc;
      }
    }
  }
`;

export const Avatar = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    background: #aaddff;
    font-weight: 600;
    font-size: 0.8rem;

    width: 40px;
    height: 40px;

    &.delete {
      background: #f2abab;
      & svg {
        & path {
          fill: #ff6b6b;
        }
      }
    }

    & svg {
      font-size: 1.2rem;
      & path {
        fill: #207ebc;
      }
    }

    &.list {
      width: 25px;
      height: 25px;
      & svg {
        font-size: 0.8rem;
      }
    }

    &.new {
      & svg {
        & path {
          fill: #207ebc;
        }
      }
    }
  }
`;

export const EmptyResult = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #dcdcdc;
    margin: 12px 0 24px 0;

    & svg {
      font-size: 4rem;
      margin-bottom: 4px;
      & path {
        fill: #eaeaea;
      }
    }
  }
`;

export const UnselectAll = styled.button`
  && {
    border: none;
    background: none;
    padding: 4px 8px;
    margin-bottom: 16px;
    color: #01568e;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ListAllActions = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: fit-content;
    border: none;
    background: none;
    padding: 4px 16px 4px 0;
    color: #01568e;
    cursor: pointer;
    height: 30px;
    position: absolute;
    right: 0px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button`
  && {
    border: none;
    border-radius: 4px;
    padding: 12px 32px;
    outline: none;
    background: #ccc;
    color: #aaa;
    cursor: default;

    &.active {
      background: #207ebc;
      color: white;
      cursor: pointer;
    }
  }
`;

export const ClickOut = styled.a`
  && {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: transparent;
    top: 0;
    right: 0;
    z-index: 500;
    outline: none;
  }
`;
