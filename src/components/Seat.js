import styled from "styled-components";
import { useState } from "react";

export default function Seat({ seat }) {
    const [selected, setSelected] = useState(false);

    return (
        <SeatItem
            key={seat.id} isAvailable={seat.isAvailable} selected={selected}
            onClick={() => {
                if (seat.isAvailable) {
                    setSelected(!selected);
                }
            }}
        >
            {seat.name}
        </SeatItem>
    );
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.isAvailable ?
        props.selected ? "#0E7D71" : "#808F9D"
        : "#F7C52B"};        // Essa cor deve mudar
    background-color: ${props => props.isAvailable ?
        props.selected ? "#1AAE9E" : "#C3CFD9"
        : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`