import { useState, useRef } from 'react';

import ProjectList from './components/ProjectList.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import InputModal from './components/InputModal.jsx';

function App() {
  const [projects, setProjects] = useState([
    { projectName: 'Project 1' },
    { projectName: 'Project 2' },
  ]);
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  function handleSave() {
    // Save new project code goes here
    modal.current.close();
  }

  return (
    <>
      <main className='h-screen mt-8 flex gap-8'>
        <InputModal ref={modal} save={handleSave} />
        <ProjectList projects={projects} openModal={handleOpenModal} />
        <ProjectDetails />
      </main>
    </>
  );
}

export default App;
