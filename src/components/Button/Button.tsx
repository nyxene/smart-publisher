import styled from 'styled-components';

const Button = styled.button`
    position: relative;
    padding: 0 20px;
    min-width: 8em;
    height: 36px;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 0.75em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fff;
    border: 0;
    outline: 0;
    background-color: #27982b;
    border-radius: 2px;
    transition: background-color 0.2s 0.1s;

    &:hover:not([disabled]) {
        background-color: #197e23;
        cursor: pointer;
    }

    &[disabled] {
        opacity: 0.5;
    }

    &[type='reset'] {
        background-color: #d6691f;

        &:hover:not([disabled]) {
            background-color: #e55121;
        }
    }
`;

export default Button;
