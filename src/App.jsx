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

  function handleSaveNewProject(title, description, date) {
    setProjects((prevProjects) => {
      return [...prevProjects, { title, description, date, tasks: [] }];
    });
    modal.current.close();
  }

  function handleDeleteProject() {
    setProjects((prevProjects) => {
      return prevProjects.filter((_, index) => index !== selectedProject.index);
    });
    setSelectedProject({ project: undefined, index: undefined });
  }

  function handleSaveNewTask(newTask) {
    const curTasks = [...projects[selectedProject.index].tasks];
    const curProjects = [...projects];

    curTasks.push(newTask);
    curProjects[selectedProject.index].tasks = curTasks;
    setProjects(curProjects);
  }

  function handleDeleteTask(taskIndex) {
    const updatedTasks = projects[selectedProject.index].tasks.filter(
      (_, index) => index !== taskIndex
    );
    const curProjects = [...projects];
    curProjects[selectedProject.index].tasks = updatedTasks;
    setProjects(curProjects);
  }

  return (
    <>
      <main className='min-h-screen mt-8 flex gap-8'>
        <InputModal ref={modal} save={handleSaveNewProject} />
        <ProjectList
          projects={projects}
          openModal={handleOpenModal}
          setSelectedProject={setSelectedProject}
          selectedProjectIndex={selectedProject.index}
        />
        <ProjectDetails
          openModal={handleOpenModal}
          selectedProject={selectedProject}
          deleteProjectHandler={handleDeleteProject}
          saveNewTaskHandler={handleSaveNewTask}
          deleteTaskHandler={handleDeleteTask}
        />
      </main>
    </>
  );
}

export default App;
