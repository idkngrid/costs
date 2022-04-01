import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import { Loading } from '../layout/Loading'
import { Form } from '../project/Form'
import { Message } from '../layout/Message'

export function Project() {

    const { id } = useParams();
   
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

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
        }, 300)
    }, [id])

    function editPost(project) {
        //budget validation
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto.');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}` , {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        })
        .then(res => res.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!');
            setType('success');
        })
        .catch(err => console.log(err))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            { project.name ? (
                <div className={styles.project_container}>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.details_button} onClick={toogleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento: </span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado: </span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <Form handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                            </div>
                        )}
                    </div>
                </div>
                
            ): (
                 <Loading /> 
            )}
        </>
    )
}