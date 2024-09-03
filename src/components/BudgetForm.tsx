import { useMemo, useState } from 'react';

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.valueAsNumber);
  };

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);
  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          id="budget"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="text"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={isValid}
      />
    </form>
  );
}
