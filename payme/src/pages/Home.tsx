import React, { useState } from "react";

const Home = () => {
  const [salary, setSalary] = useState("");
  const [confirmedSalary, setConfirmedSalary] = useState<number>();
  const [configError, setConfigError] = useState<string | null>(null);

  const validateSalary = () => {
    let parsed = parseInt(salary);

    if (isNaN(parsed)) {
      setConfigError("Invalid Salary");
    } else {
      setConfigError(null);
      setConfirmedSalary(parsed);
    }
  };

  return (
    <div>
      {configError && <h3 style={{ color: "red" }}>{configError}</h3>}
      {confirmedSalary && !configError && (
        <h3>Your salary is {confirmedSalary} per year!</h3>
      )}

      <input onChange={(e) => setSalary(e.target.value)} value={salary} />

      <button onClick={validateSalary}>Confirm</button>
    </div>
  );
};

export default Home;
