import { Outlet } from 'react-router-dom'
import './App.css'
import { CustomersTable } from './components/CustomersTable'

function App() {


  return (
    <>
      <div className='w-full min-h-screen flex bg-gray-200'>
        <div className='w-4/5 max-w-7xl mx-auto p-4 bg-white'>

          <Outlet />
        </div>

      </div>

    </>
  )
}

export default App
