import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import { Avatar, Button, DatePicker, List, Typography, message } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import { currency } from "../../utils";
import { FaFileInvoice } from "react-icons/fa";
import { AlertOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";

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
  const [noteLoading, setNoteLoading] = useState<number[]>([]);
  const [filteredNotas, setFilteredNotas] = useState<Nota[]>([]);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const getNotas = useCallback(() => {
    setRefreshing(true);
    const cache = localStorage.getItem("notas_in_cache");
    if (cache) {
      const { notas, date } = JSON.parse(cache);
      if (
        moment().diff(moment(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache
      ) {
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
            date: moment().format("DDMMYYYY HH:mm:ss"),
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
    }
  }, [getNotas]);

  useEffect(() => {
    if (initialDate && finalDate) {
      setFilteredNotas(
        notas
          .filter((item) => {
            return (
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isBetween(
                moment(initialDate, "DD/MM/YYYY"),
                moment(finalDate, "DD/MM/YYYY")
              ) ||
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isSame(
                moment(initialDate, "DD/MM/YYYY")
              ) ||
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isSame(
                moment(finalDate, "DD/MM/YYYY")
              )
            );
          })
          .sort((a, b) => {
            return (
              moment(b.DTNEG, "DDMMYYYY HH:mm:ss").unix() -
              moment(a.DTNEG, "DDMMYYYY HH:mm:ss").unix()
            );
          })
      );
    } else if (initialDate) {
      setFilteredNotas(
        notas
          .filter((item) => {
            return (
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isAfter(
                moment(initialDate, "DD/MM/YYYY")
              ) ||
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isSame(
                moment(initialDate, "DD/MM/YYYY")
              )
            );
          })
          .sort((a, b) => {
            return (
              moment(b.DTNEG, "DDMMYYYY HH:mm:ss").unix() -
              moment(a.DTNEG, "DDMMYYYY HH:mm:ss").unix()
            );
          })
      );
    } else if (finalDate) {
      setFilteredNotas(
        notas
          .filter((item) => {
            return (
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isBefore(
                moment(finalDate, "DD/MM/YYYY")
              ) ||
              moment(item.DTNEG, "DDMMYYYY HH:mm:ss").isSame(
                moment(finalDate, "DD/MM/YYYY")
              )
            );
          })
          .sort((a, b) => {
            return (
              moment(b.DTNEG, "DDMMYYYY HH:mm:ss").unix() -
              moment(a.DTNEG, "DDMMYYYY HH:mm:ss").unix()
            );
          })
      );
    } else {
      const newNotes = notas
      
      newNotes.sort((a, b) => {
        return (
          moment(b.DTNEG, "DDMMYYYY HH:mm:ss").unix() -
          moment(a.DTNEG, "DDMMYYYY HH:mm:ss").unix()
        );
      });
      setFilteredNotas(newNotes);
    }
  }, [notas, initialDate, finalDate]);

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
            onChange={(_, dateString) => setInitialDate(dateString as string)}
          />
          <DatePicker
            format={"DD/MM/YYYY"}
            size="large"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Data final"
            onChange={(_, dateString) => setFinalDate(dateString as string)}
          />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={filteredNotas.map((item: Nota) => {
            return {
              date: item.DTNEG,
              valor: Number(
                item.XMLENVCLI.split("<vNF>")[1].split("</vNF>")[0]
              ),
              base64: item.base64,
              NUNOTA: item.NUNOTA,
            };
          })}
          loading={refreshing}
          renderItem={(item: {
            valor: number;
            date: string;
            base64: string | null;
            NUNOTA: number;
          }) => (
            <List.Item
              actions={[
                <Button
                  key={"download"}
                  icon={<DownloadOutlined />}
                  loading={noteLoading.includes(item.NUNOTA)}
                  onClick={() => {
                    setNoteLoading([...noteLoading, item.NUNOTA]);
                    api
                      .get(`contrato/note/${item.NUNOTA}`)
                      .then((response) => {
                        if (response.data) {
                          const link = document.createElement("a");
                          link.href = `${
                            import.meta.env.VITE_API_URL
                          }/contrato/note/${item.NUNOTA}`;
                          document.body.appendChild(link);
                          link.click();
                        } else {
                          messageApi.error({
                            content: "Nota não encontrada",
                            icon: <AlertOutlined />,
                          });
                        }
                      })
                      .catch((error) => {
                        errorActions(error);
                        messageApi.error({
                          content: "Nota não encontrada",
                          icon: <AlertOutlined />,
                        });
                      })
                      .finally(() => {
                        setNoteLoading(
                          noteLoading.filter((note) => note !== item.NUNOTA)
                        );
                      });
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
                description={moment(item.date, "DDMMYYYY HH:mm:ss").format(
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
