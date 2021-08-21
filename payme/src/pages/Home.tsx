import React, { useState } from "react";

const Home = () => {
  const [salaryInput, setSalary] = useState("");
  const [confirmedSalary, setConfirmedSalary] = useState<number>();
  const [configError, setConfigError] = useState<string | null>(null);

  const validateConfig = () => {
    let parsedSalary = parseInt(salaryInput);

    if (isNaN(parsedSalary)) {
      setConfigError("Invalid Salary");
      return;
    }

    setConfigError(null);
    setConfirmedSalary(parsedSalary);
  };

  return (
    <div>
      {configError && <h3 style={{ color: "red" }}>{configError}</h3>}
      {confirmedSalary && !configError && (
        <h3>Your salary is {confirmedSalary} per year!</h3>
      )}

      <div>
        <label form="salary">What's your salary?</label>
        <input
          id="salary"
          onChange={(e) => setSalary(e.target.value)}
          value={salaryInput}
        />
        <button onClick={validateConfig}>Confirm</button>
      </div>
    </div>
  );
};

export default Home;
