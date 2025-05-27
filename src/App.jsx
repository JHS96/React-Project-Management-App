import { useState } from 'react';

import ProjectList from './components/ProjectList.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';

function App() {
  const [projects, setProjects] = useState([
    { projectName: 'Project 1' },
    { projectName: 'Project 2' },
  ]);

  return (
    <>
      <main className='h-screen mt-8 flex gap-8'>
        <ProjectList projects={projects} />
        <ProjectDetails />
      </main>
    </>
  );
}

export default App;
