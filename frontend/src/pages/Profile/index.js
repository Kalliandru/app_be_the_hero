import React, {useEffect, useState} from 'react';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [casos, setCasos] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setCasos(res.data);
        })
    }, [ongId]);


    async function handleDeleteCaso(id){

        try{
            await api.delete(`casos/${id}`, 
            {
                headers: {
                    Authorization: ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id != id));

        }catch(err){
            alert('erro ao deletar o caso. Tente novamente.')
        }
    }

    function handleLogout(){

        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button"
                onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>


            <ul>
                {casos.map(caso => (
                                    <li key={caso.id}>
                                    <strong>CASO:</strong>
                                    <p>{caso.title}</p>
                
                                    <strong>DESCRIÇÃO:</strong>
                                    <p>{caso.description}</p>
                
                                    <strong>VALOR:</strong>
                                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p>
                
                                    <button type="button"
                                    onClick={
                                        () => 
                                            handleDeleteCaso(caso.id)
                                        }>
                                        <FiTrash2 size={20} color="#a8a8b3" />
                                    </button>
                                </li>
                ))}
            </ul>
        </div>
    );
}