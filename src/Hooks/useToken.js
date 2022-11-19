import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("doctorToken", data.token);
            setToken(data.token);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [email]);
  return [token];
};

export default useToken;
