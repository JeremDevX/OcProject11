import Account from "../../components/Account/Account";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Form from "../../components/Form/Form";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/auth/authSlice";

interface strapiAccountData {
  id: number;
  attributes: {
    title: string;
    amount: number;
    balance: string;
  };
}

const accountData = [
  {
    classname: "account",
    accountTitle: "Argent Bank Checking (x8349)",
    accountAmount: "$2,082.79",
    accountAmountDescription: "Available Balance",
  },
  {
    classname: "account",
    accountTitle: "Argent Bank Savings (x6712)",
    accountAmount: "$10,928.42",
    accountAmountDescription: "Available Balance",
  },
  {
    classname: "account",
    accountTitle: "Argent Bank Credit Card (x8349)",
    accountAmount: "$184.30",
    accountAmountDescription: "Current Balance",
  },
];

export default function User() {
  const [strapiAccountData, setStrapiAccountData] =
    useState<strapiAccountData[]>();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fields = [
    {
      id: "userName",
      label: "User Name :",
      type: "text",
      defaultValue: user?.userName,
      className: "input-wrapper-change-info",
    },
    {
      id: "firstName",
      label: "First Name :",
      type: "text",
      defaultValue: user?.firstName,
      disabled: true,
      className: "input-wrapper-change-info",
    },
    {
      id: "lastName",
      label: "Last Name :",
      type: "text",
      defaultValue: user?.lastName,
      disabled: true,
      className: "input-wrapper-change-info",
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
      isSubmit: false,
    },
  ];

  function handleToggleEdit() {
    setToggleEdit(!toggleEdit);
  }

  const handleChangeUsername = async (formData: {
    [key: string]: string | boolean;
  }) => {
    const newUserName = formData.userName;
    if (newUserName === user?.userName) {
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
      dispatch(updateUser({ ...user, userName: updatedUser.body.userName }));
      alert("Username updated successfully");
      handleToggleEdit();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const fecthAccountData = async () => {
        try {
          const response = await fetch("http://localhost:1337/api/accounts", {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch account data");
          }
          const data = await response.json();
          setStrapiAccountData(data.data);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      fecthAccountData();
    }
  }, [user]);

  return (
    <main className="main bg-dark">
      <div className="header">
        {toggleEdit ? (
          <h1>Edit User info</h1>
        ) : (
          <h1>
            Welcome back
            <br />
            {user?.firstName} {user?.lastName}!
          </h1>
        )}
        {toggleEdit ? (
          <section className="edit-name-content">
            <Form
              fields={fields}
              onSubmit={handleChangeUsername}
              buttons={buttons}
            />
          </section>
        ) : (
          <Button className="edit-button" onClick={handleToggleEdit}>
            Edit Name
          </Button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {strapiAccountData
        ? strapiAccountData.map((account, index) => (
            <Account
              key={"Account n°" + index}
              classname="account"
              accountTitle={account.attributes.title}
              accountAmount={"$" + account.attributes.amount}
              accountAmountDescription={account.attributes.balance}
            />
          ))
        : accountData.map((account, index) => (
            <Account
              key={"Account n°" + (index + 1)}
              classname={account.classname}
              accountTitle={account.accountTitle}
              accountAmount={account.accountAmount}
              accountAmountDescription={account.accountAmountDescription}
            />
          ))}
    </main>
  );
}
