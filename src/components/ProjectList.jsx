export default function ProjectList() {
  return (
    <section className='bg-stone-900 rounded-tr-2xl'>
      <div className='pl-16 w-96'>
        <h2 className='mt-20 mb-10 uppercase text-3xl font-semibold text-white'>
          Your Projects
        </h2>
        <button className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'>
          + Add Project
        </button>
      </div>
    </section>
  );
}
