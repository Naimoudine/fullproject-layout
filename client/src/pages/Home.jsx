import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [consultations, setConsultations] = useState();

  const { auth } = useOutletContext();

  const getConsultations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/consultations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (res.status === 200) {
        const consultations = await res.json();
        setConsultations(consultations);
      } else {
        console.info(res);
      }
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    getConsultations();
  }, []);

  useEffect(() => {
    console.log(consultations);
  }, [consultations]);

  return (
    <div>
      <h1>Heloo {auth ? auth.user.email : ""}</h1>
      <ul>
        {consultations?.map((consultation) => (
          <li key={consultation.id}>{consultation.startingTime}</li>
        ))}
      </ul>
    </div>
  );
}
