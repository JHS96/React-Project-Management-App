export default function ProjectList() {
  return (
    <section className='bg-stone-900 rounded-tr-2xl'>
      <div className='pl-16 w-96'>
        <h2 className='mt-20 mb-10 uppercase text-3xl font-semibold text-white'>
          Your Projects
        </h2>
        <button className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100'>
          + Add Project
        </button>
      </div>
    </section>
  );
}
