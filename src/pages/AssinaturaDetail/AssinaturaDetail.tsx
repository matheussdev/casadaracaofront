/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { Alert, Avatar, Button, List, Spin } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Contract {
  IDFILA: number;
  NUDOCUMENTO: number;
  ORIGEM: string;
  ARGUMENTOS: any;
  STATUS: string;
  DHGERACAO: string;
  DHALTERACAO: string;
  MENSAGEM: string;
  URLDOCUMENTO: string;
}

export const AssinaturaDetail: React.FC = () => {
  const [contracts, setContracts] = useState<Contract | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = useState("");

  const get_contrato = useCallback(() => {
    setRefreshing(true);
    api
      .get("/contrato/detail/" + id)
      .then((response) => {
        setContracts(response.data);
        fetchPdf(response.data.ARGUMENTOS?.body?.members?.documentoBase64);
      })
      .catch((error) => {
        console.log(error);
        errorActions(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [id]);

  const fetchPdf = async (base64: string) => {
    const response = await fetch(`data:application/pdf;base64,${base64}`);
    const blob = await response.blob();
    setPdfUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    if (id) {
      get_contrato();
    }
  }, [get_contrato, id]);

  return (
    <GlobalWrapper>
      {contracts ? (
        <div style={{ width: "100vw", padding: "1rem" }}>
          <List
            itemLayout="horizontal"
            dataSource={contracts.ARGUMENTOS?.body?.members?.participantesDocumento.map(
              (item: any) => {
                return {
                  name: item.participanteNome,
                  email: item.participanteEmail,
                  link: contracts.URLDOCUMENTO + item.participanteEmail,
                };
              }
            )}
            loading={refreshing}
            renderItem={(item: {
              name: string;
              email: string;
              link: string;
            }) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    key={"download"}
                    href={item.link}
                    target="_blank"
                  >
                    Assinar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<FaUser size={16} color="#01408C" />}
                      size={20}
                      style={{
                        background: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  }
                  title={item.name}
                  // ellipsis in the end of the string with 30 chars
                  description={item.email.substring(0, 25) + "..."}
                />
              </List.Item>
            )}
          />
          <Document file={pdfUrl} options={{}}>
            <Page pageNumber={1} height={500} />
          </Document>
        </div>
      ) : (
        <>
          {refreshing ? (
            <div
              style={{
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin spinning={refreshing} size="large" />
            </div>
          ) : (
            <div style={{ padding: "1rem" }}>
              <Alert message="Contrato não encontrado" type="error" />
            </div>
          )}
        </>
      )}
    </GlobalWrapper>
  );
};
