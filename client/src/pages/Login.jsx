import React, { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const formRef = useRef();

  const navigate = useNavigate();

  const { setAuth } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formRef.current.email.value,
          password: formRef.current.password.value,
        }),
      });

      if (res.status === 200) {
        const auth = await res.json();
        setAuth(auth);
        navigate("/");
      } else {
        console.info(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      ref={formRef}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="email">
        email :
        <input type="email" name="email" />
      </label>
      <label htmlFor="password">
        password :
        <input type="password" name="password" />
      </label>
      <button type="submit">login</button>
    </form>
  );
}
