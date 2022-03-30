import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { Loading } from '../layout/Loading'

export function Project() {

    const { id } = useParams();
   
    const [project, setProject] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id }`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then((data) => {
                    setProject(data);
                })
                .catch(err => console.log(err));
        }, 1000)
    }, [id])

    return (
        <>
            { project.name ? (
                <div className={styles.project_container}>
                    <div>
                        <h1>Projeto: {project.name}</h1>
                        <button>Editar Projeto</button>
                        <p>teste</p>
                    </div>
                </div>
                
            ): (
                 <Loading /> 
            )}
        </>
    )
}