interface ActionLinkProps {
  href: string;
  iconClassname: string;
  children: React.ReactNode;
}

export default function ActionLink(props: ActionLinkProps) {
  return (
    <a href={props.href} className="main-nav-item">
      <i className={props.iconClassname}></i>
      {props.children}
    </a>
  );
}
