import logo from '../assets/no-projects.png';

export default function ProjectDetails({ openModal }) {
  return (
    <section className='flex flex-col flex-auto items-center gap-8 pt-36'>
      <div className='w-20 h-20'>
        <img
          src={logo}
          alt='logo - clipboard and pen'
          className='object-contain'
        />
      </div>
      <h2 className='text-3xl font-semibold text-stone-500'>
        No Project Selected
      </h2>
      <p className='text-stone-400 text-lg'>
        Select a project or get started with a new one
      </p>
      <button
        className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100'
        onClick={openModal}
      >
        Create new project
      </button>
    </section>
  );
}
