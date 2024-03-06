import React, { useCallback, useEffect } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import Card from "antd/es/card/Card";
import { theme } from "../../theme";
import { List, Statistic, Tag, Typography } from "antd";
import api from "../../services/api";
import { errorActions } from "../../utils/errorActions";
import { currency } from "../../utils";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ToolChart,
  Legend,
} from "chart.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, ToolChart, Legend);
const time_cache = import.meta.env.VITE_TIME_CACHE || 5;
const { Text, Title } = Typography;
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
interface Item {
  CODEMP: number;
  CODGRUPOPROD: number;
  CODPARC: number;
  CODPROD: number;
  DESCRGRUPOPROD: string;
  DESCRPROD: string;
  DTNEG: string;
  IMAGEM: string;
  NOMEPARC: string;
  NUMNOTA: number;
  NUNOTA: number;
  VLRUNIT: number;
}
export const Home: React.FC = () => {
  const [loadingBills, setLoadingBills] = React.useState(false);
  const [openBillsTotal, setOpenBillsTotal] = React.useState(0);
  const [openBills, setOpenBills] = React.useState(0);
  const [loadingItems, setLoadingItems] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const navigate = useNavigate();
  const getItems = useCallback(() => {
    setLoadingItems(true);
    const cache = localStorage.getItem("items_in_cache");
    if (cache) {
      const { items, date } = JSON.parse(cache);
      if (
        moment().diff(moment(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache
      ) {
        setItems(items);
        setLoadingItems(false);
        return;
      }
    }
    api
      .get("/item/")
      .then((response) => {
        setItems(response.data);
        localStorage.setItem(
          "items_in_cache",
          JSON.stringify({
            items: response.data,
            date: moment().format("DDMMYYYY HH:mm:ss"),
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingItems(false);
      });
  }, []);
  const [width, setWidth] = React.useState(window.innerWidth);
  const getBoletos = useCallback(() => {
    setLoadingBills(true);
    const cache = localStorage.getItem("boletos_in_cache");
    if (cache) {
      const { boletos, date } = JSON.parse(cache);
      if (
        moment().diff(moment(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache
      ) {
        setOpenBillsTotal(
          boletos
            .filter((boleto: Boleto) => {
              return (
                boleto.DHBAIXA === null &&
                moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(moment())
              );
            })
            .reduce((acc: number, boleto: Boleto) => {
              return acc + boleto.VLRDESDOB;
            }, 0)
        );
        setOpenBills(
          boletos.filter((boleto: Boleto) => {
            return (
              boleto.DHBAIXA === null &&
              moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(moment())
            );
          }).length
        );
        setLoadingBills(false);
        return;
      }
    }
    api
      .get("/boleto/")
      .then((response) => {
        setOpenBillsTotal(
          response.data
            .filter((boleto: Boleto) => {
              return (
                boleto.DHBAIXA === null &&
                moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(moment())
              );
            })
            .reduce((acc: number, boleto: Boleto) => {
              return acc + boleto.VLRDESDOB;
            }, 0)
        );
        setOpenBills(
          response.data.filter((boleto: Boleto) => {
            return (
              boleto.DHBAIXA === null &&
              moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(moment())
            );
          }).length
        );
        localStorage.setItem(
          "boletos_in_cache",
          JSON.stringify({
            boletos: response.data,
            date: moment().format("DDMMYYYY HH:mm:ss"),
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

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const hasUpdated = React.useRef(false);
  useEffect(() => {
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      getBoletos();
      getItems();
    }
  }, [getBoletos, getItems]);

  return (
    <GlobalWrapper>
      <div
        style={{
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "40px",
            backgroundColor: theme.token.colorPrimary,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -((44 / 375)  * width),
            }}
          >
            <svg
              width={"100%"}
              height={((44 / 375)  * width)}
              viewBox="0 0 375 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M388 0.499893C388 24.5243 298.233 43.9999 187.5 43.9999C76.7669 43.9999 -13 24.5243 -13 0.499893L187.5 0.499954L388 0.499893Z"
                fill="#01408C"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            padding: "32px 16px 0",
            display: "flex",
            gap: "16px",
          }}
        >
          <Card
            onClick={() => navigate("/boletos")}
            loading={loadingBills}
            bodyStyle={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
            }}
            style={{
              borderRadius: "22px",
              boxShadow: "0px 4px 17px 2px rgba(0, 0, 0, 0.10)",
              width: "100%",
            }}
            bordered={false}
          >
            <Statistic
              title="Boletos em aberto"
              value={openBills}
              precision={0}
              valueStyle={{ color: "#3182CE", fontWeight: 700 }}
            />
          </Card>
          <Card
            onClick={() => navigate("/boletos")}
            loading={loadingBills}
            bodyStyle={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
            }}
            style={{
              width: "100%",
              borderRadius: "22px",
              boxShadow: "0px 4px 17px 2px rgba(0, 0, 0, 0.10)",
            }}
            bordered={false}
          >
            <Statistic
              title="Total a pagar (R$)"
              value={currency(openBillsTotal)}
              precision={2}
              valueStyle={{ color: "#3f8600", fontWeight: 700 }}
            />
          </Card>
        </div>
        <div
          style={{
            padding: "16px",
            background: "#fff",
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
              Últimas compras
            </Title>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={items.map((item: Item) => {
              return {
                date: item.DTNEG,
                name: item.DESCRPROD,
                price: item.VLRUNIT,
                category: item.DESCRGRUPOPROD,
              };
            })}
            loading={loadingItems}
            renderItem={(item: {
              name: string;
              date: string;
              price: number;
              category: string;
            }) => (
              <List.Item
                actions={[
                  <Text
                    key={"price"}
                    style={{
                      color: "#48BB78",
                      fontWeight: 700,
                    }}
                  >
                    {currency(item.price)}
                  </Text>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <span>
                        {moment(item.date, "DDMMYYYY HH:mm:ss").format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                      <Tag color={"green"}>
                        {item.category.length > 15
                          ? item.category.substring(0, 15) + "..."
                          : item.category}
                      </Tag>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </GlobalWrapper>
  );
};
