import { useCallback, useEffect, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { Avatar, Button, List, Tag, Typography } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import dayjs from "dayjs";
import { FaFileSignature } from "react-icons/fa";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface Contract {
  IDFILA: number;
  NUDOCUMENTO: number;
  ORIGEM: string;
  ARGUMENTOS: unknown;
  STATUS: string;
  DHGERACAO: string;
  DHALTERACAO: string;
  MENSAGEM: string;
  URLDOCUMENTO: string;
}

export const Assinaturas: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNotas = useCallback(() => {
    setRefreshing(true);
    api
      .get("/contrato/")
      .then((response) => {
        setContracts(response.data);
      })
      .catch((error) => {
        console.log(error);
        errorActions(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    getNotas();
  }, [getNotas]);

  return (
    <GlobalWrapper>
      <div
        style={{
          padding: "1rem",
        }}
      >
        <div>
          <Title
            level={3}
            style={{
              color: "#A0AEC0",
              fontWeight: 700,
            }}
          >
            Documentos para assinar
          </Title>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={contracts.map((item: Contract) => {
            return {
              date: item.DHGERACAO,
              numero: item.NUDOCUMENTO,
              status: item.STATUS,
              id: item.IDFILA,
            };
          })}
          loading={refreshing}
          renderItem={(item: {
            date: string;
            numero: number;
            status: string;
            id: number;
          }) => (
            <List.Item
              actions={[
                <Link to={`/assinatura/${item.id}`} key={'d'}>
                  <Button type="primary" key={"download"} size="large">
                    Assinar
                  </Button>
                </Link>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<FaFileSignature size={30} color="#01408C" />}
                    size={40}
                    style={{
                      background: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                }
                title={"Documento: " + item.numero}
                description={
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <span>
                      {dayjs(item.date, "DDMMYYYY").format("DD/MM/YYYY")}
                    </span>
                    <Tag color={item.status !== "F" ? "green" : "blue"}>
                      {item.status !== "F" ? "Assinado" : "Pendente"}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </GlobalWrapper>
  );
};
