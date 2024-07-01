import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

interface Field {
  id: string;
  label: string;
  type: string;
  className: string;
  defaultValue?: string;
  disabled?: boolean;
}
interface Buttons {
  text: string;
  onClick: () => void;
  className: string;
  isSubmit: boolean;
}

interface FormProps {
  fields: Field[];
  buttons: Buttons[];
  onSubmit: (formData: { [key: string]: string | boolean }) => void;
  showRememberMe?: boolean;
}

export default function Form(props: FormProps) {
  const { fields, buttons, onSubmit, showRememberMe = false } = props;
  const [defaultValues, setDefaultValues] = useState<{ [key: string]: string }>(
    {}
  );
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const rememberMeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialValues = fields.reduce((acc, field) => {
      const storedValue = localStorage.getItem(field.id);
      if (storedValue) {
        acc[field.id] = storedValue;
      } else {
        acc[field.id] = field.defaultValue || "";
      }
      return acc;
    }, {} as { [key: string]: string });
    setDefaultValues(initialValues);
    setRememberMe(localStorage.getItem("rememberMe") === "true");
  }, [fields]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = fields.reduce((acc, field) => {
      acc[field.id] = inputRefs.current[field.id]?.value || "";
      return acc;
    }, {} as { [key: string]: string | boolean });

    if (showRememberMe) {
      formData["rememberMe"] = rememberMe;
      if (rememberMe) {
        fields.forEach((field) => {
          localStorage.setItem(
            field.id,
            inputRefs.current[field.id]?.value || ""
          );
        });
        localStorage.setItem("rememberMe", "true");
      } else {
        fields.forEach((field) => {
          localStorage.removeItem(field.id);
        });
        localStorage.setItem("rememberMe", "false");
      }
    }

    onSubmit(formData);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className={field.className} key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            type={field.type}
            id={field.id}
            ref={(element) => (inputRefs.current[field.id] = element)}
            defaultValue={defaultValues[field.id]}
            disabled={field.disabled}
          />
        </div>
      ))}
      {showRememberMe && (
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            ref={rememberMeRef}
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
      )}
      <div className="button-wrapper">
        {buttons.map((button, index) =>
          button.isSubmit ? (
            <Button key={"Submit button" + index} className={button.className}>
              {button.text}
            </Button>
          ) : (
            <Button
              key={"Button" + index}
              className={button.className}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          )
        )}
      </div>
    </form>
  );
}
