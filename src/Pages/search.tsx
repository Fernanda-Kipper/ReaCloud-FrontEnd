import React, { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import ContentLoader from 'styled-content-loader';
import { Link } from 'react-router-dom';
import { BsSearch, BsFilter, BsArrowLeft } from 'react-icons/bs';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../Services/axiosConfig';

import ResourceCard from '../Components/resource-card';
import { Select } from '../Components/select';
import resourceTypes from '../Interfaces/resource-types';
import subjects from '../Interfaces/subjects';
import Resource from '../Interfaces/resource';
import publicTypes from '../Interfaces/public-types';

import '../Styles/pages/search.css';

function SearchPage() {
    const [keyword,setKeyword] = useState('');
    const [filter, setFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultsBackup, setBackup] = useState<Resource[]>([]);
    const [results, setResults] = useState<Resource[]>([]);
    const [audience, setAudience] = useState('');
    const [type, setType] = useState('');
    const [subject, setSubject] = useState('');

    function handleSubmit(event: FormEvent){
        setLoading(true)
        event.preventDefault()
        axios.get('/resources/search', {params: {keywords: keyword}}).then(res =>{
            setResults(res.data)
            setBackup(res.data)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            toast.error('Erro ao buscar por recurso. Confira os dados e tente novamente mais tarde')
        })
    };

    function handleFiltering(event: FormEvent){
        setLoading(true)
        event.preventDefault()
        if(audience || type || subject){
            const filterResults =  resultsBackup.filter(result => {
                return result.audience === audience || result.type === type || result.subject === subject
            })
            setResults(filterResults)
            setFilter(false)
            setLoading(false)
        }
    };

    function handleFilterClick(){
        setFilter(!filter)
    };

    return (
        <div className="search-content">
            <header className="search-header">
                <Link to="/" className="goBack"><BsArrowLeft/></Link>
                <form onSubmit={handleSubmit}>
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Busque palavras chaves/titulo/autor. Ex: Matemática"/>
                    <button type="submit">
                        <BsSearch/>
                    </button>
                </form>
            </header>
            <main>
                <aside className="filter">
                    <button onClick={handleFilterClick}>
                        <BsFilter size="lg"/>
                    </button>
                    <form onSubmit={handleFiltering} className={filter ? 'enabled' : 'disabled'}>
                        <Select
                        value={audience}
                        handleChange={setAudience}
                        label="Público alvo"
                        options={publicTypes}
                        name="audience" />

                        <Select
                        options={subjects}
                        label="Área do conhecimento"
                        name="subject"
                        value={subject}
                        handleChange={setSubject} />

                        <Select
                        options={resourceTypes}
                        label="Tipo de material"
                        name="type"
                        value={type}
                        handleChange={setType} />
                        <button type="submit">Filtrar</button>
                    </form>
                </aside>
                <section className="results">
                    <ContentLoader
                      isLoading={loading}
                    >
                        {results.length > 0 ? (
                            <div className="result-container">
                                {results.map((element) => (
                                    <ResourceCard 
                                        key={element.id}
                                        title={element.title}
                                        id={element.id}
                                        description={element.description}
                                        image={element.image.url}>
                                    </ResourceCard>
                                ))}
                            </div>
                        ): (<h2>Nenhum recurso bate com a sua busca</h2>)}
                    </ContentLoader>
                </section>
            </main>
        </div>
    );
}

export default SearchPage;
