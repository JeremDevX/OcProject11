import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";

export default function Signin() {
  const navigate = useNavigate();

  const handleFormSubmit = (
    username: string,
    password: string,
    rememberMe: boolean
  ) => {
    console.log(username, password, rememberMe);
    if (!username || !password) {
      let message = "Please fill";
      if (!username && !password) {
        message += " username and password fields";
      } else if (!username) {
        message += " username field";
      } else {
        message += " password field";
      }
      alert(message);
      return;
    }
    navigate("/user");
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form onSubmit={handleFormSubmit} />
      </section>
    </main>
  );
}
