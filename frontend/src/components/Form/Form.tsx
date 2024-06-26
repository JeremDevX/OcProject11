import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

interface FormProps {
  onSubmit: (username: string, password: string, rememberMe: boolean) => void;
}

export default function Form(props: FormProps) {
  const [defaultUsername, setDefaultUsername] = useState<string>("");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setDefaultUsername(storedUsername);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const rememberMe = rememberMeRef.current?.checked || false;

    props.onSubmit(username, password, rememberMe);

    if (rememberMe) {
      localStorage.setItem("username", username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          defaultValue={defaultUsername}
        ></input>
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          ref={rememberMeRef}
          defaultChecked
          onClick={() => {
            if (defaultUsername !== "") {
              localStorage.removeItem("username");
            }
          }}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <Button className="sign-in-button">Sign In</Button>
    </form>
  );
}
