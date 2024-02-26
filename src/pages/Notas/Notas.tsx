import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { Avatar, Button, List, Typography, message } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import dayjs from "dayjs";
import { currency } from "../../utils";
import { FaFileInvoice } from "react-icons/fa";
import { AlertOutlined, DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const time_cache = import.meta.env.VITE_TIME_CACHE || 5;
interface Nota {
  CODEMP: number;
  CODPARC: number;
  DTNEG: string;
  NOMEPARC: string;
  NUMNOTA: number;
  NUNOTA: number;
  XMLENVCLI: string;
  base64: string | null;
}

export const Notas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const openPdf = (base64: string) => {
    // Converte a string Base64 em um Blob
    const blob = b64toBlob(base64, "application/pdf");
    // Cria uma URL a partir do Blob
    const blobUrl = URL.createObjectURL(blob);
    // Abre a URL em uma nova aba
    window.open(blobUrl, "_blank");
  };

  const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const getNotas = useCallback(() => {
    setRefreshing(true);
    const cache = localStorage.getItem("notas_in_cache");
    if (cache) {
      const { notas, date } = JSON.parse(cache);
      if (dayjs().diff(dayjs(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache) {
        setNotas(notas);
        setRefreshing(false);
        return;
      }
    }
    api
      .get("/nota/")
      .then((response) => {
        setNotas(response.data);
        localStorage.setItem(
          "notas_in_cache",
          JSON.stringify({
            notas: response.data,
            date: dayjs().format("DDMMYYYY HH:mm:ss"),
          })
        );
      })
      .catch((error) => {
        console.log(error);
        errorActions(error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);
  const hasUpdated = useRef(false);
  useEffect(() => {
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      getNotas();
      return;
    }
  }, [getNotas]);

  return (
    <GlobalWrapper>
      {contextHolder}
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
            Minhas notas
          </Title>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={notas.map((item: Nota) => {
            return {
              date: item.DTNEG,
              valor: Number(
                item.XMLENVCLI.split("<vNF>")[1].split("</vNF>")[0]
              ),
              base64: item.base64,
            };
          })}
          loading={refreshing}
          renderItem={(item: {
            valor: number;
            date: string;
            base64: string | null;
          }) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  key={"download"}
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={() => {
                    if (item.base64) {
                      openPdf(item.base64);
                    } else {
                      messageApi.open({
                        type: "error",
                        content: "Arquivo de nota não disponível",
                        icon: <AlertOutlined />,
                      });
                    }
                  }}
                >
                  Baixar nota
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<FaFileInvoice size={30} color="#01408C" />}
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
                description={dayjs(item.date, "DDMMYYYY").format("DD/MM/YYYY")}
              />
            </List.Item>
          )}
        />
      </div>
    </GlobalWrapper>
  );
};
