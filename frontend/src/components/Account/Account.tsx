import Button from "../Button/Button";

interface AccountProps {
  classname: string;
  accountTitle: React.ReactNode;
  accountAmount: React.ReactNode;
  accountAmountDescription: React.ReactNode;
}

export default function Account(props: AccountProps) {
  return (
    <section className={props.classname}>
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.accountTitle}</h3>
        <p className="account-amount">{props.accountAmount}</p>
        <p className="account-amount-description">
          {props.accountAmountDescription}
        </p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button">View transactions</Button>
      </div>
    </section>
  );
}
