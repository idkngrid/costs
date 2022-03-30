import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import styles from './Footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li className={styles.social_icons}><FaFacebook /></li>
                <li className={styles.social_icons}><FaInstagram /></li>
                <li className={styles.social_icons}><FaLinkedin /></li>
            </ul>
            <p className={styles.copy_right}><span>Costs</span>&copy; 2021</p>
        </footer>
    )
}