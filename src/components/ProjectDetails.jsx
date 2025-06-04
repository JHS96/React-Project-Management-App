import { useRef, useState } from 'react';

import logo from '../assets/no-projects.png';

function DefaultContent({ launchModal }) {
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
        onClick={launchModal}
      >
        Create new project
      </button>
    </section>
  );
}

function SelectedProjectDetails({
  projectToDisplay,
  deleteProjectHandler,
  saveNewTaskHandler,
  deleteTaskHandler,
}) {
  const title = projectToDisplay.project.title;
  const dueDate = new Date(projectToDisplay.project.date).toDateString();
  const description = projectToDisplay.project.description;

  const addTaskInputRef = useRef();
  const [isNewTaskValid, setIsNewTaskValid] = useState(true);

  function handleSaveNewTask() {
    if (!addTaskInputRef.current.value) {
      setIsNewTaskValid(false);
      return;
    }
    saveNewTaskHandler(addTaskInputRef.current.value);
    addTaskInputRef.current.value = '';
  }

  return (
    <section className='w-full pt-20 flex flex-col items-start'>
      <div className='w-5/6 flex justify-between'>
        <h1 className='text-5xl text-stone-700 font-semibold'>{title}</h1>
        <button
          className='text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
          onClick={deleteProjectHandler}
        >
          Delete
        </button>
      </div>
      <p className='mt-4 text-xl text-stone-500'>{dueDate}</p>
      <pre className='mt-4 text-xl text-stone-600'>{description}</pre>
      <div className='mt-5 mb-4 w-5/6 border-b-2 border-stone-300'></div>
      <h2 className='text-3xl font-bold text-stone-700 mb-4'>Tasks</h2>
      <form
        className='w-2/3 flex gap-4'
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          ref={addTaskInputRef}
          type='text'
          id='add-task-input'
          onChange={() => setIsNewTaskValid(true)}
          className={`mt-1 w-2/3 p-1 border-b-2 rounded-sm border-stone-300 text-stone-600 focus:outline-none focus:border-stone-600 ${
            isNewTaskValid ? 'bg-stone-200' : 'bg-red-200'
          }`}
        />
        <button
          className='text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
          onClick={handleSaveNewTask}
        >
          Add Task
        </button>
      </form>
      {projectToDisplay.project.tasks.length === 0 && (
        <p className='mt-4 text-xl text-stone-600'>
          This project does not have any tasks yet.
        </p>
      )}
      {projectToDisplay.project.tasks.length !== 0 && (
        <div className='w-5/6'>
          <ul className='p-4 mt-8 rounded-md bg-stone-100'>
            {projectToDisplay.project.tasks.map((task, index) => {
              return (
                <li
                  key={Math.random() + index}
                  className='flex justify-between my-4'
                >
                  {task}
                  <button
                    className='text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'
                    onClick={() => deleteTaskHandler(index)}
                  >
                    Clear
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default function ProjectDetails({
  openModal,
  selectedProject,
  deleteProjectHandler,
  saveNewTaskHandler,
  deleteTaskHandler,
}) {
  return (
    <>
      {!selectedProject.project && <DefaultContent launchModal={openModal} />}
      {selectedProject.project && (
        <SelectedProjectDetails
          projectToDisplay={selectedProject}
          deleteProjectHandler={deleteProjectHandler}
          saveNewTaskHandler={saveNewTaskHandler}
          deleteTaskHandler={deleteTaskHandler}
        />
      )}
    </>
  );
}
