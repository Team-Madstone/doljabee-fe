import Nav from './Nav';

type WrapperProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: WrapperProps) {
  return (
    <div className="layout">
      <Nav />
      <div className="container">{children}</div>
    </div>
  );
}
