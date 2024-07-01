import Account from "../../components/Account/Account";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Form from "../../components/Form/Form";
import { useState } from "react";
import { updateUser } from "../../features/auth/authSlice";

export default function User() {
  const userData = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fields = [
    {
      id: "userName",
      label: "User Name",
      type: "text",
      defaultValue: userData?.userName,
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      defaultValue: userData?.firstName,
      disabled: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      defaultValue: userData?.lastName,
      disabled: true,
    },
  ];
  const buttons = [
    {
      text: "Save",
      onClick: () => {},
      className: "edit-button",
      isSubmit: true,
    },
    {
      text: "Cancel",
      onClick: handleToggleEdit,
      className: "edit-button",
    },
  ];

  function handleToggleEdit() {
    setToggleEdit(!toggleEdit);
  }

  const handleChangeUsername = async (formData: {
    [key: string]: string | boolean;
  }) => {
    const newUserName = formData.userName;
    if (newUserName === userData?.userName) {
      alert("The new username is the same as the current one.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: newUserName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update username");
      }
      const updatedUser = await response.json();
      console.log(updatedUser);
      dispatch(
        updateUser({ ...userData, userName: updatedUser.body.userName })
      );
      alert("Username updated successfully");
      handleToggleEdit();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userData?.firstName} {userData?.lastName}!
        </h1>
      </div>
      {toggleEdit ? (
        <section className="edit-name-content">
          <Form
            fields={fields}
            onSubmit={handleChangeUsername}
            buttons={buttons}
          />
        </section>
      ) : null}
      {!toggleEdit ? (
        <Button className="edit-button" onClick={handleToggleEdit}>
          Edit Name
        </Button>
      ) : null}
      <h2 className="sr-only">Accounts</h2>
      <Account
        classname="account"
        accountTitle="Argent Bank Checking (x8349)"
        accountAmount="$2,082.79"
        accountAmountDescription="Available Balance"
      />
      <Account
        classname="account"
        accountTitle="Argent Bank Savings (x6712)"
        accountAmount="$10,928.42"
        accountAmountDescription="Available Balance"
      />
      <Account
        classname="account"
        accountTitle="Argent Bank Credit Card (x8349)"
        accountAmount="$184.30"
        accountAmountDescription="Current Balance"
      />
    </main>
  );
}
