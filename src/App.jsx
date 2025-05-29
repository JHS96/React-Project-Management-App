import { useState, useRef } from 'react';

import ProjectList from './components/ProjectList.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import InputModal from './components/InputModal.jsx';

function App() {
  const [projects, setProjects] = useState([]);
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  function handleSave(title, description, date) {
    setProjects((prevProjects) => {
      return [...prevProjects, { title, description, date }];
    });
    modal.current.close();
  }

  return (
    <>
      <main className='h-screen mt-8 flex gap-8'>
        <InputModal ref={modal} save={handleSave} />
        <ProjectList projects={projects} openModal={handleOpenModal} />
        <ProjectDetails openModal={handleOpenModal} />
      </main>
    </>
  );
}

export default App;
