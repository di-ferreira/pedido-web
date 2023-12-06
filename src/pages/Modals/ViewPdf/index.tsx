import React, { useEffect } from 'react';

import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import generatePDF, { Margin, Options, Resolution } from 'react-to-pdf';
import { iOrcamento } from '../../../@types/Orcamento';
import Logo from '../../../assets/imperio_logo2.png';
import Button from '../../../components/Button';
import { FlexComponent } from '../../../components/FlexComponent';
import useModal from '../../../hooks/useModal';
import {
  InfoHeader,
  TDataC,
  TDataL,
  TDataR,
  THeadC,
  THeadL,
  THeadR,
  TRow,
  TableContainer,
  TableHeader,
} from './styles';

interface iPDFView {
  callback: () => void;
  content: iOrcamento;
}

const ViewPdf: React.FC<iPDFView> = ({ callback, content }) => {
  const { Modal, showModal } = useModal();
  const DataAtual = dayjs().format('DD/MM/YYYY');
  const options: Options = {
    // default is `save`
    method: 'open',
    resolution: Resolution.MEDIUM,
    page: {
      margin: Margin.SMALL,
      format: 'A4',
      orientation: 'portrait',
    },
    canvas: {
      mimeType: 'image/png',
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };

  useEffect(() => {
    showModal();
  }, []);

  const getTargetElement = () => document.getElementById('contentPDF');

  return (
    Modal && (
      <Modal
        Title={'SALVAR PDF'}
        width='65vw'
        height='90vh'
        bodyWidth='65vw'
        bodyHeight='90vh'
        sm={{ width: '100%', height: '100vh' }}
        xs={{ width: '100%', height: '100vh' }}
        OnCloseButtonClick={() => callback()}
      >
        <FlexComponent
          direction='column'
          alignItems='center'
          overflow='hidden scroll'
          width='100%'
          height='100%'
        >
          <FlexComponent
            background='#fff'
            width='826px'
            height='100%'
            minHeight='1169px'
            padding='3.4rem 3.6rem 3.6rem 3.4rem'
            id='contentPDF'
          >
            <FlexComponent
              direction='column'
              padding='3rem'
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSmooth: 'always',
                fontWeight: '400',
                color: '#111',
                border: '1px solid #000',
                position: 'relative',
              }}
            >
              {/* header  */}
              <FlexComponent style={{ zIndex: 10 }} direction='column'>
                <FlexComponent gapColumn='2rem'>
                  <FlexComponent width='250px'>
                    <img
                      src={Logo}
                      alt='Logo Império'
                      title='Império Diesel'
                      width='100%'
                      height='auto'
                    />
                  </FlexComponent>

                  <FlexComponent direction='column' gapRow='0.3rem'>
                    <InfoHeader>
                      DATA: <strong>{DataAtual}</strong>
                    </InfoHeader>

                    <InfoHeader>
                      CLIENTE:
                      <strong>{content.CLIENTE.NOME}</strong>
                    </InfoHeader>
                    <InfoHeader>
                      VENDEDOR:
                      <strong>{content.VENDEDOR.NOME}</strong>
                    </InfoHeader>
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent margin='1.5rem 0' background='#000' height='2px'></FlexComponent>
                <FlexComponent
                  justifyContent='center'
                  margin='0rem 0rem 1.5rem 0rem'
                  style={{ fontSize: '1.8rem' }}
                >
                  <InfoHeader>
                    ORÇAMENTO:
                    <strong>{content.ORCAMENTO}</strong>
                  </InfoHeader>
                </FlexComponent>
              </FlexComponent>
              {/* body */}
              <FlexComponent
                margin='0.5rem 0'
                direction='column'
                justifyContent='space-between'
                flexBasis={0}
                flexGrow={1}
                flexShrink={1}
                style={{ zIndex: 10 }}
              >
                <TableContainer>
                  <TableHeader>
                    <THeadL>PRODUTO</THeadL>
                    <THeadL>FABRICANTE</THeadL>
                    <THeadL>DESCRIÇÃO</THeadL>
                    <THeadC>QTD</THeadC>
                    <THeadR>PREÇO</THeadR>
                    <THeadR>TOTAL</THeadR>
                  </TableHeader>
                  <tbody>
                    {content.ItensOrcamento.map((it, idx) => (
                      <TRow key={idx}>
                        <TDataL>{it.PRODUTO.PRODUTO}</TDataL>
                        <TDataL>{it.PRODUTO.FABRICANTE.NOME}</TDataL>
                        <TDataL>{it.PRODUTO.NOME}</TDataL>
                        <TDataC>{it.QTD}</TDataC>
                        <TDataR>
                          {(it.TOTAL / it.QTD).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TDataR>
                        <TDataR>
                          {it.TOTAL.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </TDataR>
                      </TRow>
                    ))}
                  </tbody>
                </TableContainer>

                <FlexComponent justifyContent='space-between' style={{ fontSize: '2rem' }}>
                  <p>
                    <strong>TOTAL:</strong>
                  </p>
                  <p>__________________________________________</p>
                  <p>
                    <strong>
                      {content.TOTAL.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </strong>
                  </p>
                </FlexComponent>
              </FlexComponent>
            </FlexComponent>
          </FlexComponent>
          <FlexComponent
            justifyContent='flex-end'
            width='90%'
            padding='1rem'
            margin='1rem 1rem 1rem 1rem'
            height='2rem'
          >
            <Button
              Icon={faFileLines}
              Text='GERAR PDF'
              Height='3.5rem'
              Type='primary'
              onclick={() => generatePDF(getTargetElement, options)}
            />
          </FlexComponent>
        </FlexComponent>
      </Modal>
    )
  );
};

export default ViewPdf;
