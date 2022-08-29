import styled, {keyframes} from 'styled-components'

const show = keyframes`
    0%{
        opacity: 0;
        transform: translate(-50%, -30px);
    }
    25%, 50%, 75%{
        opacity: 1;
        transform: translate(-50%, 0);
    }
    100%{
        opacity: 0;
        transform: translate(-50%, 0);
    }
`;

export const PopupContainer = styled.div.attrs(props => ({
    color: props.color ? props.theme.secondaryColor : "black"
}))`
    position: fixed;
    left: 50%;
    top: 100px;
    padding: 1.5rem 2.5rem;
    background-color: ${props => props.color};
    color: white;
    z-index: 100;
    border-radius: 10px;
    font-weight: bolder;
    font-size: 1.2rem;
    animation: ${show} 2s linear forwards;
`;