import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const Layout = () => {

    const padding = {
        padding: 5
    };

    return (
        <div className="wrapper">
            <Toaster
                position="bottom-right"
                richColors
            />
            <h1>React Example App</h1>
            <div>
                <nav>
                    <Link style={padding} to="/">Home</Link>
                    <Link style={padding} to="/anecdotes">Anecdotes</Link>
                    <Link style={padding} to="/left-right">Left-Right</Link>
                    <Link style={padding} to="/lista-compra">Lista Compra</Link>
                    <Link style={padding} to="/part1">Part 1</Link>
                    <Link style={padding} to="counter">Counter</Link>
                    <Link style={padding} to="/unicafe">Unicafe</Link>
                </nav>
                <hr className='nav-hr'/>
            </div>
            <Outlet />
        </div >
    )
}

export default Layout