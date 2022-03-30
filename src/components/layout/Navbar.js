import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'

export function Navbar () {
    return (
        <nav className={styles.navbar}>
            <div className={styles.nav_container}>
                <Link to="/">
                    <img src={logo} alt="Costs Logo" className={styles.logo} />
                </Link>
                <ul className={styles.navbar_list}>
                    <li><Link to="/" className={styles.navbar_items}>Home</Link></li>
                    <li><Link to="/company" className={styles.navbar_items}>Empresa</Link></li>
                    <li><Link to="/projects" className={styles.navbar_items}>Projetos</Link></li>
                    <li><Link to="/contact" className={styles.navbar_items}>Contato</Link></li>
                </ul>
            </div>
        </nav>
    )
}