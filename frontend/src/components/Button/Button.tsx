interface ButtonProps {
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
