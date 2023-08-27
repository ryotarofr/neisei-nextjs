import React, { Children, SyntheticEvent, useState } from 'react';
import axios from 'axios';

const EvaluationType = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
}


const CreateNaiseiForm = () => {
  const [naisei, setNaisei] = useState('');
  // const [evaluationType, setEvaluationType] = useState('');
  const [evaluationType, setEvaluationType] = useState(EvaluationType.A);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3000/naisei';
      const response = await axios.post(apiUrl, {
        naisei: naisei,
        evaluation_type: evaluationType,
      });

      // console.log(ressponse.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Naisei:
        <input type="text" value={naisei} onChange={(e) => setNaisei(e.target.value)} />
      </label>
      <label>
        Evaluation Type:
        <select value={evaluationType} onChange={(e) => setEvaluationType(e.target.value)}>
          {Object.values(EvaluationType).map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>
      <button type="submit">Create Naisei</button>
    </form>
  );
};

export default CreateNaiseiForm;
