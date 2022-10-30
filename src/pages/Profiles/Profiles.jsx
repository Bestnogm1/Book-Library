import { Link } from "react-router-dom";

const Profiles = ({ profiles }) => {
  return (
    <>
      <title>All Profiles</title>
      <h1>Hello. This is a list of all the profiles.</h1>
      {profiles.length ? (
        <div>
          {profiles.map((profile) => (
            <div key={profile._id}>
              <Link state={{ profile }} to={`/profileDetail/${profile._id}`}>
                <p key={profile._id}>{profile.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No profiles yet</p>
      )}
    </>
  );
};

export default Profiles;
