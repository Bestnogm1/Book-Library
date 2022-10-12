import AllBooks from "../../components/AllBooks/AllBooks";
import styles from "./Landing.module.css";
const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>
        {user ? (
          user.name
        ) : (
          <>
            <AllBooks />
          </>
        )}
      </h1>
    </main>
  );
};

export default Landing;
