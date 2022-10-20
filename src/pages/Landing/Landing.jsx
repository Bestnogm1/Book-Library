import AllBooks from "../../components/AllBooks/AllBooks";
import styles from "./Landing.module.css";
const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <>
        {user ? (
          <AllBooks />
        ) : (
          <>
            <AllBooks />
          </>
        )}
      </>
    </main>
  );
};

export default Landing;
