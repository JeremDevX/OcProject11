import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      className: "input-wrapper-sign-in",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      className: "input-wrapper-sign-in",
    },
  ];
  const button = [
    {
      text: "Sign In",
      onClick: () => {},
      className: "sign-in-button",
      isSubmit: true,
    },
  ];

  const handleFormSubmit = async (formData: {
    [key: string]: string | boolean;
  }) => {
    const email = formData.email as string;
    const password = formData.password as string;
    if (!email || !password) {
      let message = "Please fill";
      if (!email && !password) {
        message += " email and password fields";
      } else if (!email) {
        message += " email field";
      } else {
        message += " password field";
      }
      alert(message);
      return;
    }
    try {
      const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!reponse.ok) {
        throw new Error("Network error or invalid credentials");
      }
      const data = await reponse.json();

      if (data.body.token) {
        const userResponse = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.body.token}`,
            },
          }
        );
        const userData = await userResponse.json();
        if (userData.body) {
          const user = {
            email: userData.body.email,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
            userName: userData.body.userName,
          };
          const token = data.body.token;
          dispatch(login({ token, user }));
          navigate("/user");
        } else {
          throw new Error("Failed to fetch user data");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("An error occured " + error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Form
          fields={fields}
          onSubmit={handleFormSubmit}
          showRememberMe
          buttons={button}
        />
      </section>
    </main>
  );
}
