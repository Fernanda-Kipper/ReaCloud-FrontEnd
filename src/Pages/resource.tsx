import React, { useEffect, useState } from 'react';
import {  useParams, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import LinkIcon from '@material-ui/icons/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RateReviewIcon from '@material-ui/icons/RateReview';
import StorageIcon from '@material-ui/icons/Storage';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GrStatusWarning } from 'react-icons/gr';

import axios from '../Services/axiosConfig'

import '../Styles/pages/resource.css'
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Components/header'
import EvaluationForm from '../Components/form-evaluation'
import Resource from '../Interfaces/resource'
import ParameterPassedToUrl from '../Interfaces/parameter-id'
import CommentsList from '../Components/comments'
import StyledRate from '../Components/styled-rating';

interface Licence{
    title: string,
    image: string,
    message: string
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      color: '#cccccc',
      background: 'white'
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#ccc',
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 18,
      overflowX: 'auto'
    },
    body: {
      fontSize: 16,
      overflowX: 'auto'
    },
}))(TableCell);
  
function ResourcePage() {
    const params: ParameterPassedToUrl = useParams();
    const [resource, setResource]= useState<Resource>()
    const [licence, setLicence] = useState<Licence>()
    const [avgStars, setAvg] = useState(0)
    const [shouldCommentsUpdate, setShouldCommentsUpdate] = useState(false)
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
      setValue(newValue);
    };

    useEffect(()=>{
        axios.get(`/resource/${params.id}`)
        .then(response =>{
            setResource(response.data)
            setLicence(JSON.parse(response.data.licence))})
        .catch((e)=>{
            toast.warn('Não foi possivel carregar dados do recurso')
        })
        axios.get(`/resource/evaluations/avarage/${params.id}`)
        .then(response =>{
            console.log(response.data)
            setAvg(response.data.Avarage)
        })
        .catch((e)=>{
            toast.warn('Não foi possivel carregar dados do recurso')
        })

    }, [params.id])
    
  return (
    <div className="resource-content">
        <Header></Header>
        <main>
            <section className="resource-header">
                <div className="identity">
                    <h1 className="title">{resource?.title}</h1>
                </div>
                <div className="interaction">
                    <LinkIcon color="primary"/>
                    <a href={resource?.external_url}>Visualizar material</a>
                </div>
            </section>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab icon={< StorageIcon/>} label="DADOS"/>
                    <Tab icon={<ThumbUpIcon />} label="AVALIAÇÕES" />
                    <Tab icon={<RateReviewIcon />} label="AVALIE" />
                </Tabs>
            </Paper> 
            {value === 0 &&
            <section className="data">

                <div className="media">
                    <img src={resource?.image.url} alt={`Imagem do recurso ${resource?.title}`}/>
                    { resource?.video_link ? <iframe title="video" src={resource?.video_link.replace('watch?v=', 'embed/')} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> : null}
                </div>

                <div className="license">
                    <GrStatusWarning/>
                    <p>Esse recurso você pode: {licence?.message}</p>
                </div>

                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Propriedade</StyledTableCell>
                                <StyledTableCell align="left">Valor</StyledTableCell>
                                <StyledTableCell align="left">Nome do metadado Dublin Core</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell align="left">Autor</StyledTableCell>
                                <StyledTableCell align="left">{resource?.author}</StyledTableCell>
                                <StyledTableCell align="left">dc.author</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Quando o recurso foi criado</StyledTableCell>
                                <StyledTableCell align="left">{resource?.date_of_publishment}</StyledTableCell>
                                <StyledTableCell align="left">dc.date</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Descrição</StyledTableCell>
                                <StyledTableCell align="left">{resource?.description}</StyledTableCell>
                                <StyledTableCell align="left">dc.description</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Público alvo</StyledTableCell>
                                <StyledTableCell align="left">{resource?.audience}</StyledTableCell>
                                <StyledTableCell align="left">dc.audience</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Área do conhecimento</StyledTableCell>
                                <StyledTableCell align="left">{resource?.subject}</StyledTableCell>
                                <StyledTableCell align="left">dc.subject</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Palavras chave</StyledTableCell>
                                <StyledTableCell align="left">{resource?.keywords}</StyledTableCell>
                                <StyledTableCell align="left">dc.keywords</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Licença</StyledTableCell>
                                <StyledTableCell align="left">{licence?.title}</StyledTableCell>
                                <StyledTableCell align="left">dc.licence</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Compartilhador por</StyledTableCell>
                                <StyledTableCell align="left">{resource?.userName}</StyledTableCell>
                                <StyledTableCell align="left">dc.created_by</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Recurso correlato</StyledTableCell>
                                <StyledTableCell align="left">{resource?.relation}</StyledTableCell>
                                <StyledTableCell align="left">dc.relation</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Ultima modificação</StyledTableCell>
                                <StyledTableCell align="left">{resource?.last_modification}</StyledTableCell>
                                <StyledTableCell align="left">dc.last_modification</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Tipo de recurso</StyledTableCell>
                                <StyledTableCell align="left">{resource?.type}</StyledTableCell>
                                <StyledTableCell align="left">dc.type</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Formato do recurso</StyledTableCell>
                                <StyledTableCell align="left">{resource?.format}</StyledTableCell>
                                <StyledTableCell align="left">dc.format</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Linguagem</StyledTableCell>
                                <StyledTableCell align="left">{resource?.language}</StyledTableCell>
                                <StyledTableCell align="left">dc.language</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Contribuidores do recurso</StyledTableCell>
                                <StyledTableCell align="left">{resource?.contributor}</StyledTableCell>
                                <StyledTableCell align="left">dc.contributor</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Local que o recurso foi publicado</StyledTableCell>
                                <StyledTableCell align="left">{resource?.publisher}</StyledTableCell>
                                <StyledTableCell align="left">dc.publisher</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="left">Pré-requisitos técnicos</StyledTableCell>
                                <StyledTableCell align="left">{resource?.technical_requirements}</StyledTableCell>
                                <StyledTableCell align="left">dc.?</StyledTableCell>
                            </TableRow>
                            {resource?.description_of_technical_requirements && (
                            <TableRow>
                                <StyledTableCell align="left">Descrição dos pré-requisitos técnicos</StyledTableCell>
                                <StyledTableCell align="left">{resource?.description_of_technical_requirements}</StyledTableCell>
                                <StyledTableCell align="left">dc.?</StyledTableCell>
                            </TableRow>                                
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
            }
            {value === 1 &&             
                <EvaluationForm setShouldUpdate={setShouldCommentsUpdate}/>
            }
            {value === 2 &&
                <div className="stars">
                    <h5>Média das avaliações</h5>
                    <StyledRate value={avgStars}/>
                    <CommentsList shouldUpdate={shouldCommentsUpdate}/>
                </div>
            }
        </main>
    </div>
  )}

export default withRouter(ResourcePage);
