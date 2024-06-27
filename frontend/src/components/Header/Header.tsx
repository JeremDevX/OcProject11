import { useDispatch, useSelector } from "react-redux";
import ActionLink from "../ActionLink/ActionLink";
import { logout } from "../../features/auth/authSlice";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userData = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (userData) {
      console.log(userData, "userData");
      return;
    }
    console.log("no user data");
  }, [userData]);

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
        {!userData ? (
          <ActionLink href="/sign-in" iconClassname="fa fa-user-circle">
            Sign In
          </ActionLink>
        ) : (
          <ActionLink
            href="#"
            iconClassname="fa fa-sign-out"
            onClick={handleLogout}
          >
            Sign Out
          </ActionLink>
        )}
      </div>
    </nav>
  );
}
