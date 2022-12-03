import AllBooks from "../../components/AllBooks/AllBooks";
import styles from "./Landing.module.css";
import { LandingPropsInterface } from "./LandingInterface/LandingInterface";

const Landing = ({ user }: LandingPropsInterface) => {
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
