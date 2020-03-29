import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');
    

    const history = useHistory();

    async function handleRegister(event){

        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try{

            const res = await api.post('ongs', data);
            alert(`Seu id de acesso:${res.data.id}`);

            history.push('/');
        } catch(err) {

            alert('Erro no Cadastro, tente novamente.');
        }
        
    }



    return (
       <div className="register-container">

           <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem a sua ONG.</p>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#e02041"/>Voltar para o Logon</Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input type="text"
                      placeholder="Nome da ONG"
                      value={name}
                      onChange={ event => setName(event.target.value)}
                    />
                    <input type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={ event => setEmail(event.target.value)}
                    />
                    <input type="tel" 
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={ event => setWhatsapp(event.target.value)}
                     />
                    <div className="input-group">
                        <input type="text" 
                        placeholder="Cidade" 
                        value={city}
                        onChange={ event => setCity(event.target.value)}
                        />
                        <input type="text"
                         placeholder="UF"
                         value={uf}
                         onChange={ event => setUf(event.target.value)}
                        style={{width: 80}
                        }/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
           </div>
       </div>
    );
}