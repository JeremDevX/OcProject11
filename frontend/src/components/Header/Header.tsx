import ActionLink from "../ActionLink/ActionLink";

export default function Header() {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <ActionLink href="/sign-in" iconClassname="fa fa-user-circle">
          Sign In
        </ActionLink>
        <ActionLink href="/home" iconClassname="fa fa-sign-out">
          Sign Out
        </ActionLink>
      </div>
    </nav>
  );
}
