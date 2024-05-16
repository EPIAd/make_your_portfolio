import { Outlet } from "react-router-dom";
import styles from "./wrapper.module.css";

export function Wrapper() {
  return (
    <div className={styles["wrap"]}>
      <Outlet />
    </div>
  );
}
