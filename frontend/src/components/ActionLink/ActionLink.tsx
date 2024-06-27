interface ActionLinkProps {
  href: string;
  iconClassname: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ActionLink(props: ActionLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (props.onClick) {
      event.preventDefault();
      props.onClick();
    }
  };

  return (
    <a href={props.href} className="main-nav-item" onClick={handleClick}>
      <i className={props.iconClassname}></i>
      {props.children}
    </a>
  );
}
