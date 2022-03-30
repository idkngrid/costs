import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import { LinkButton } from '../layout/LinkButton'

export function Home() {
    return (
    <div>
        <section className={styles.home_container}>
            <div>
                <h1>Bem-vinde ao <span>Costs</span></h1>
                <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            </div>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <div className={styles.home_img}>
                <img src={savings} alt="Costs" />
            </div>
        </section>
    </div>
    )
}

