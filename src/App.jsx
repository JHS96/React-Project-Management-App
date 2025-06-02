import { useState, useRef } from 'react';

import ProjectList from './components/ProjectList.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import InputModal from './components/InputModal.jsx';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    project: undefined,
    index: undefined,
  });
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  //TODO => Write code to handle saving/deletion of tasks as the tasks array below just contains some hardcoded placeholder tasks
  function handleSave(title, description, date) {
    setProjects((prevProjects) => {
      return [
        ...prevProjects,
        { title, description, date, tasks: ['Task 1', 'Task 2', 'Task 3'] },
      ];
    });
    modal.current.close();
  }

  function handleDelete() {
    setProjects((prevProjects) => {
      return prevProjects.filter((_, index) => index !== selectedProject.index);
    });
    setSelectedProject({ project: undefined, index: undefined });
  }

  return (
    <>
      <main className='h-screen mt-8 flex gap-8'>
        <InputModal ref={modal} save={handleSave} />
        <ProjectList
          projects={projects}
          openModal={handleOpenModal}
          setSelectedProject={setSelectedProject}
        />
        <ProjectDetails
          openModal={handleOpenModal}
          selectedProject={selectedProject}
          deleteHandler={handleDelete}
        />
      </main>
    </>
  );
}

export default App;
