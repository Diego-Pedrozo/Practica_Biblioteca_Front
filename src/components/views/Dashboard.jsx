import Sidebar from '../Sidebar'
import Tabla from '../Tabla'

function Dashboard() {
    return (
        <>
            <div className='flex justify-center'>
                <Sidebar />
                <Tabla />
            </div>
        </>
    )
}

export default Dashboard