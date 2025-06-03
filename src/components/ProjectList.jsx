export default function ProjectList({
  projects,
  openModal,
  setSelectedProject,
}) {
  return (
    <section className='bg-stone-900 rounded-tr-2xl'>
      <div className='pl-16 w-96'>
        <h2 className='mt-20 mb-10 uppercase text-3xl font-semibold text-white'>
          Your Projects
        </h2>
        <button
          className='px-6 py-2 rounded-md bg-stone-700 text-stone-400 hover:bg-stone-950'
          onClick={openModal}
        >
          + Add Project
        </button>
        <ul className='mt-10'>
          {projects.map((project, index) => {
            return (
              <li
                key={Math.random() + index}
                className='text-stone-400 text-lg py-2 cursor-pointer'
                onClick={() => setSelectedProject({ project, index })}
              >
                {project.title}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
