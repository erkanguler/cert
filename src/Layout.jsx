import { Outlet } from 'react-router'
import NavComponent from './Nav'
import Footer from './Footer'

export default function Layout({ context }) {
    return (
        <div id='root_c'>
            <div className='nav_c'>
                <NavComponent />
            </div>
            <div>
                <Outlet context={context} />

                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
