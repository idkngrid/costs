import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Projects.module.css'

import { Message } from "../layout/Message"
import { LinkButton } from '../layout/LinkButton'
import { Card } from '../project/Card'
import { Loading } from '../layout/Loading'

export function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = ''; 
    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(err => console.log(err))
        }, 1000)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage('Projeto removido com sucesso!');
            })
            .catch(err => console.log(err));
    }


    return (
        <section className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <div className={styles.card_container}>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <Card 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {/* {removeLoading && projects.length === 0 (
                    <p>Não há projetos cadastrados!</p>
                )} */}
            </div>
        </section>
    )
}
