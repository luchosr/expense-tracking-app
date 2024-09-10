import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';

import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { useEffect, useState } from 'react';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previusAmount, setPreviusAmount] = useState(0);
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];
      setExpense(editingExpense);
      setPreviusAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({ ...expense, [name]: isAmountField ? +value : value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (expense.amount - previusAmount > remainingBudget) {
      setError('El gasto se sale del presupuesto');
      return;
    }

    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
        <select
          id="category"
          value={expense.category}
          className="bg-slate-100 p-2"
          name="category"
          onChange={handleChange}
        >
          <option value="">--Seleccione--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Fecha del Gasto:
        </label>
        <DatePicker
          onChange={handleChangeDate}
          value={expense.date}
          className="bg-slate-100 p-2 border-0"
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-wrap uppercase font-bold rounded-lg text-white"
        value={state.editingId ? 'Actualizar Gasto' : 'Añadir Gasto'}
      />
    </form>
  );
}
