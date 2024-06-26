import Account from "../../components/Account/Account";
import Button from "../../components/Button/Button";

export default function User() {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <Button className="edit-button">Edit Name</Button>
      </div>
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
