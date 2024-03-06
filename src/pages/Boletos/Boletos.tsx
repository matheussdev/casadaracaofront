import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import {
  Avatar,
  Button,
  DatePicker,
  List,
  Tag,
  Typography,
  message,
} from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import { currency } from "../../utils";
import { FaFileInvoiceDollar } from "react-icons/fa";
import moment from "moment";
import { AlertOutlined, DownloadOutlined } from "@ant-design/icons";
const time_cache = import.meta.env.VITE_TIME_CACHE || 5;
function verifyStatusByDate(date: string, pago?: string) {
  if (pago) {
    return {
      color: "#38A169",
      text: "Pago",
    };
  } else if (moment(date, "DDMMYYYY HH:mm:ss").isBefore(moment())) {
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
  const [fileredBoletos, setFileredBoletos] = useState<Boleto[]>([]);
  const [billLoading, setBillLoading] = useState<number[]>([]);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const getBoletos = useCallback(() => {
    setLoadingBills(true);
    const cache = localStorage.getItem("boletos_in_cache");
    if (cache) {
      const { boletos, date } = JSON.parse(cache);
      if (
        moment().diff(moment(date, "DD/MM/YYYY HH:mm:ss"), "minute") <
        time_cache
      ) {
        setBoletos(boletos);
        setLoadingBills(false);
        return;
      }
    }
    api
      .get("/boleto/")
      .then((response) => {
        setBoletos(response.data);
        localStorage.setItem(
          "boletos_in_cache",
          JSON.stringify({
            boletos: response.data,
            date: moment().format("DD/MM/YYYY HH:mm:ss"),
          })
        );
      })
      .catch((error) => {
        console.log(error);
        errorActions(error);
      })
      .finally(() => {
        setLoadingBills(false);
      });
  }, []);

  const handleDownload = useCallback(
    (NUFIN: number) => {
      setBillLoading([...billLoading, NUFIN]);
      api
        .get(`/contrato/boleto/${NUFIN}`)
        .then((response) => {
          if (response.data) {
            const link = document.createElement("a");
            link.href = `${
              import.meta.env.VITE_API_URL
            }/contrato/boleto/${NUFIN}`;
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
          } else {
            message.error({
              content: "Boleto não encontrada",
              icon: <AlertOutlined />,
            });
          }
        })
        .catch((error) => {
          errorActions(error);
          message.error({
            content: "Boleto não encontrada",
            icon: <AlertOutlined />,
          });
        })
        .finally(() => {
          setBillLoading(billLoading.filter((bill) => bill !== NUFIN));
        });
    },
    [billLoading]
  );
  const hasUpdated = useRef(false);
  useEffect(() => {
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      getBoletos();
    }
  }, [getBoletos]);

  useEffect(() => {
    if (initialDate && finalDate) {
      setFileredBoletos(
        boletos.filter((item) => {
          return (
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isBetween(
              moment(initialDate, "DD/MM/YYYY"),
              moment(finalDate, "DD/MM/YYYY")
            ) ||
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isSame(
              moment(initialDate, "DD/MM/YYYY")
            ) ||
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isSame(
              moment(finalDate, "DD/MM/YYYY")
            )
          );
        })
      );
    } else if (initialDate) {
      setFileredBoletos(
        boletos.filter((item) => {
          return (
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(
              moment(initialDate, "DD/MM/YYYY")
            ) ||
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isSame(
              moment(initialDate, "DD/MM/YYYY")
            )
          );
        })
      );
    } else if (finalDate) {
      setFileredBoletos(
        boletos.filter((item) => {
          return (
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isBefore(
              moment(finalDate, "DD/MM/YYYY")
            ) ||
            moment(item.DTVENC, "DDMMYYYY HH:mm:ss").isSame(
              moment(finalDate, "DD/MM/YYYY")
            )
          );
        })
      );
    } else {
      setFileredBoletos(boletos);
    }
  }, [boletos, initialDate, finalDate]);

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
        <div
          style={{
            display: "flex",
            marginBottom: 16,
            gap: 16,
          }}
        >
          <DatePicker
            format={"DD/MM/YYYY"}
            size="large"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Data inicial"
            onChange={(date, dateString) => setInitialDate(dateString)}
          />
          <DatePicker
            format={"DD/MM/YYYY"}
            size="large"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Data final"
            onChange={(date, dateString) => setFinalDate(dateString)}
          />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={fileredBoletos.map((item: Boleto) => {
            return {
              due: item.DTVENC,
              valor: item.VLRDESDOB,
              dhbaixa: item.DHBAIXA,
              NUFIN: item.NUFIN,
            };
          })}
          loading={loadingBills}
          renderItem={(item: {
            due: string;
            valor: number;
            dhbaixa?: string;
            NUFIN: number;
          }) => (
            <List.Item
              actions={[
                <Tag
                  key={"tag"}
                  color={verifyStatusByDate(item.due, item.dhbaixa).color}
                >
                  {verifyStatusByDate(item.due, item.dhbaixa).text}
                </Tag>,
                <Button
                  // type="primary"
                  key={"download"}
                  icon={<DownloadOutlined />}
                  loading={billLoading.includes(item.NUFIN)}
                  onClick={() => handleDownload(item.NUFIN)}
                >
                  Baixar Boleto
                </Button>,
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
                description={moment(item.due, "DDMMYYYY HH:mm:ss").format(
                  "DD/MM/YYYY"
                )}
              />
            </List.Item>
          )}
        />
      </div>
    </GlobalWrapper>
  );
};
