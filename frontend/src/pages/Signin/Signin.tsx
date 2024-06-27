import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectIsAuthenticated } from "../../features/auth/authSlice";
import { useEffect } from "react";

import { RootState } from "../../store/store";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userlog = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(userlog);
  }, [isAuthenticated]);

  const handleFormSubmit = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    console.log(email, password, rememberMe);
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
        throw new Error("Network error ");
      }
      const data = await reponse.json();
      console.log(data);

      if (data.body.token) {
        console.log("control token", data.body.token);

        //
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
        console.log(userData);
        if (userData.body) {
          const user = {
            email: userData.body.email,
            firstName: userData.body.firstName,
            lastName: userData.body.lastName,
            userName: userData.body.userName,
          };
          dispatch(login({ token: data.body.token, user }));
          navigate("/user");
        } else {
          throw new Error("Failed to fetch user data");
        }
        //
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
        <Form onSubmit={handleFormSubmit} />
        {userlog ? <p> Welcome {userlog.userName}</p> : null}
      </section>
    </main>
  );
}
