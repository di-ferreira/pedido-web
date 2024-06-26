import styled from 'styled-components';
import { devices } from '../../utils/Constants';

interface iInputContainer {
    width?: string;
    height?: string;
    align?: 'center' | 'left';
}

interface iRow {
    width?: string;
    height?: string;
}
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    ${`@media screen and ${devices.xs}`} {
        overflow: hidden auto;
    }
`;
export const FormEditOrcamento = styled.form`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0rem 0rem 1rem 1.5rem;
`;
export const FormEditOrcamentoRow = styled.div<iRow>`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : 'auto')};
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &:first-child {
        margin-top: 0;
    }
    &:last-child {
        margin-bottom: 0;
    }

    ${`@media screen and ${devices.xs}`} {
        margin: 0.5rem 0;
    }
`;

export const FormEditOrcamentoColumn = styled.div<iRow>`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '1rem')};
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
`;
export const FormEditOrcamentoInputContainer = styled.div<iInputContainer>`
    width: ${(props) => (props.width ? props.width : '100%')};
    margin: 0.5rem;
    & * input {
        font-size: 1.7rem;
    }

    ${`@media screen and ${devices.xs}`} {
        width: ${(props) => (props.width ? '45%' : '100%')};

        & * input {
            font-size: 1.5rem;
        }
    }
`;
export const FormEditOrcamentoSwitchContainer = styled.div<iInputContainer>`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '1rem')};
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    & label {
        margin: 0 0.5rem;
        color: ${(props) => props.theme.colors.onSurface};
    }
`;
export const FormFooter = styled.footer`
    width: 100%;
    display: flex;
`;
