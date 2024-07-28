import styled, { css } from 'styled-components';

// "as" prop is used to determine the heading level 
// it is a part of styled-components library and used to say what HTML element to render
const Heading = styled.h1`
    ${ props => props.as === 'h1' && css`
        font-size: 3rem;
        font-weight: 600;
    `}
    ${ props => props.as === 'h2' && css`
        font-size: 2rem;
        font-weight: 600;
    `}
    ${ props => props.as === 'h3' && css`
        font-size: 2rem;
        font-weight: 500;
    `}
    line-height: 1.4;
`;

export default Heading;
