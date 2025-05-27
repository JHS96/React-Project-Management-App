import ProjectList from './components/ProjectList.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';

function App() {
  return (
    <>
      <main className='h-screen mt-8 flex gap-8'>
        <ProjectList />
        <ProjectDetails />
      </main>
    </>
  );
}

export default App;
