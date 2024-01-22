import { useCallback, useEffect, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { Avatar, List, Tag, Typography } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import dayjs from "dayjs";
import { currency } from "../../utils";
import { FaFileInvoiceDollar } from "react-icons/fa";

function verifyStatusByDate(date: string, pago?: string) {
  if (pago) {
    return {
      color: "#38A169",
      text: "Pago",
    };
  } else if (dayjs(date, "DDMMYYYY HH:mm:ss").isBefore(dayjs())) {
    return {
      color: "#FF0000",
      text: "Vencido",
    };
  } else {
    return {
      color: "#3182CE",
      text: "A vencer",
    };
  }
}
const { Title } = Typography;

interface Boleto {
  CODEMP: number;
  NUFIN: number;
  NUMNOTA: number;
  DTNEG: string;
  DTVENC: string;
  DHBAIXA?: string;
  CODPARC: number;
  NOMEPARC: string;
  VLRDESDOB: number;
  NOSSONUM: string;
  CODIGOBARRA: string;
  LINHADIGITAVEL: string;
}

export const Boletos: React.FC = () => {
  const [loadingBills, setLoadingBills] = useState(false);
  const [boletos, setBoletos] = useState<Boleto[]>([]);

  const getBoletos = useCallback(() => {
    setLoadingBills(true);
    api
      .get("/boleto/")
      .then((response) => {
        setBoletos(response.data);
      })
      .catch((error) => {
        console.log(error);
        errorActions(error);
      })
      .finally(() => {
        setLoadingBills(false);
      });
  }, []);

  useEffect(() => {
    getBoletos();
  }, [getBoletos]);

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
            Meus Boletos
          </Title>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={boletos.map((item: Boleto) => {
            return {
              due: item.DTVENC,
              valor: item.VLRDESDOB,
              dhbaixa: item.DHBAIXA,
            };
          })}
          loading={loadingBills}
          renderItem={(item: {
            due: string;
            valor: number;
            dhbaixa?: string;
          }) => (
            <List.Item
              actions={[
                <Tag key={'tag'} color={verifyStatusByDate(item.due, item.dhbaixa).color}>
                  {verifyStatusByDate(item.due, item.dhbaixa).text}
                </Tag>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<FaFileInvoiceDollar size={28} color="#01408C" />}
                    size={40}
                    style={{
                      background: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                }
                title={currency(item.valor)}
                description={dayjs(item.due, "DDMMYYYY").format("DD/MM/YYYY")}
              />
            </List.Item>
          )}
        />
      </div>
    </GlobalWrapper>
  );
};
