import { Link } from 'react-router-dom';
import styles from './home.module.css';
export function HomePage() {
  return (
    <section className={styles.container}>
      <Link to='/invest'>투자 MBTI</Link>
      <Link to='/tax-saving'>절세 MBTI</Link>
      <Link to='/earn'>적립 MBTI</Link>
    </section>
  );
}
