import { patchKudos } from "../Assets/api";
import { useContext, useState } from "react";
import { UserContext } from "../Assets/usercontext";

const Kudos = ({ kudosCount, name }) => {
  const [kudos, setKudos] = useState(0);
  const user = useContext(UserContext);

  function giveKudos() {
    setKudos((kudos) => kudos + 1);
    patchKudos(name, 1)
      .then((updateUser) => {
        // console.log(updateUser);
      })
      .catch((err) => {
        console.dir(err);
        setKudos((kudos) => kudos - 1);
      });
  }

  return (
    <>
      <button onClick={giveKudos}>Give Kudos</button>
    </>
  );
};

export default Kudos;
