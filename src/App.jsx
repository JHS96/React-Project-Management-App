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

  // TODO => Below function may need revision/improvement
  function handleSaveNewTask(newTask) {
    setProjects((prevProjects) => {
      const curTasksArr = [...prevProjects[selectedProject.index].tasks];
      curTasksArr.push(newTask);
      return [
        ...prevProjects,
        (prevProjects[selectedProject.index].tasks = curTasksArr),
      ];
    });
  }

  // TODO => Below function may need revision/improvement
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
      <main className='h-screen mt-8 flex gap-8'>
        <InputModal ref={modal} save={handleSaveNewProject} />
        <ProjectList
          projects={projects}
          openModal={handleOpenModal}
          setSelectedProject={setSelectedProject}
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
