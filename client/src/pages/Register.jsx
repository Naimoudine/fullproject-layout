import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [password, setPassword] = useState("");

  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formRef.current.email.value,
          password: password,
        }),
      });
      if (res.status === 201) {
        navigate("/login");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={(e) => handleSubmit(e)}
      ref={formRef}
    >
      <label htmlFor="email">
        email :
        <input type="email" name="email" />
      </label>
      <label htmlFor="password">
        password :
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">register</button>
    </form>
  );
}
