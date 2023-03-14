import Nav from './Nav';
import styles from '../styles/components/layout.module.scss';

type WrapperProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: WrapperProps) {
  return (
    <div className={styles.layout}>
      <Nav />
      <div className="container">{children}</div>
    </div>
  );
}
