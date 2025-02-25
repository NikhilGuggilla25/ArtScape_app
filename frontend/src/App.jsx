import './App.scss'

import TopBar from './structure/TopBar.jsx';
import Content from './structure/Content.jsx';
import Toasts from './structure/Toasts';

function App() {
  return (
    <>
      <div className="App">
        <TopBar/>
        <Content/>
        <Toasts/> 
      </div>
    </>
  )
}

export default App
