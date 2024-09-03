export default function BudgetForm() {
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
        />
      </div>
      <input
        type="text"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
      />
    </form>
  );
}
