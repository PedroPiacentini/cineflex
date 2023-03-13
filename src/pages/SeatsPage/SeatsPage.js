import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Seat from "../../components/Seat";
import { Link } from "react-router-dom";

export default function SeatsPage({ idSessao, setOrder }) {
    const [session, setSession] = useState(null);
    const order = {
        ids: [],
        name: "",
        cpf: ""
    };

    const movie = session !== null ? session.movie : null;
    const seats = session !== null ? session.seats : null;

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        request.then(response => {
            setSession(response.data);
        })
    }, []);

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session === null ? <div>carregando</div> :
                    seats.map(seat => <Seat key={seat.id} seat={seat} order={order} />)
                }
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color={{ border: "#0E7D71", background: "#1AAE9E" }} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={{ border: "#7B8B99", background: "#C3CFD9" }} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={{ border: "#F7C52B", background: "#FBE192" }} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" placeholder="Digite seu nome..." onChange={name => order.name = name.target.value} />

                CPF do Comprador:
                <input data-test="client-cpf" placeholder="Digite seu CPF..." onChange={cpf => order.cpf = cpf.target.value} />

                <Link to={"/sucesso"} >
                    <button data-test="book-seat-btn"
                        onClick={() => {
                            const request = axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`, order);
                            setOrder(order);
                            request.then(response => {
                                console.log(response);
                            })
                        }}
                    >Reservar Assento(s)</button>
                </Link>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    {movie !== null ? <img src={movie.posterURL} alt="poster" /> : "carregando"}
                </div>
                <div>
                    <p>{movie !== null ? movie.title : "carregando"}</p>
                    {session !== null ? <p>{session.day.weekday} - {session.name}</p> : "carregando"}
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.color.border};         // Essa cor deve mudar
    background-color: ${props => props.color.background};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`