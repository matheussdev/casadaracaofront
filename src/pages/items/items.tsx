/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import Card from "antd/es/card/Card";
import { theme } from "../../theme";
import { Typography } from "antd";
import api from "../../services/api";
import dayjs from "dayjs";
import { errorActions } from "../../utils/errorActions";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ToolChart,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  ToolChart,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip
);

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
const time_cache = import.meta.env.VITE_TIME_CACHE || 5;

export const Items: React.FC = () => {
  const [loadingBills, setLoadingBills] = React.useState(false);
  const [boletos, setBoletos] = React.useState<Boleto[]>([]);
  const [loadingItems, setLoadingItems] = React.useState(false);
  const [items, setItems] = React.useState<Item[]>([]);
  const countGroups = (
    items: Item[]
  ): Record<string, { count: number; totalValue: number }> => {
    const groupCounts: Record<string, { count: number; totalValue: number }> =
      {};

    items.forEach((item) => {
      const group = groupCounts[item.DESCRGRUPOPROD] || {
        count: 0,
        totalValue: 0,
      };
      group.count++;
      group.totalValue += item.VLRUNIT;
      groupCounts[item.DESCRGRUPOPROD] = group;
    });

    return groupCounts;
  };
  const getTopFiveGroups = (
    groupCounts: Record<string, { count: number; totalValue: number }>
  ): Record<string, number> => {
    return Object.entries(groupCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .reduce((acc: Record<string, number>, [key, value]) => {
        acc[key] = value.totalValue;
        return acc;
      }, {});
  };
  const prepareChartData = (groupedItems: Record<string, number>) => {
    const labels = Object.keys(groupedItems);
    const data = Object.values(groupedItems);

    return {
      labels,
      datasets: [
        {
          label: "Valor Total por Grupo de Produto",
          data,
          backgroundColor: [
            "#E53E3E",
            "#4299E1",
            "#64C280",
            "yellow",
            "purple",
          ],
          borderColor: ["#E53E3E", "#4299E1", "#64C280", "yellow", "purple"],
          borderWidth: 1,
        },
      ],
    };
  };
  const getItems = useCallback(() => {
    setLoadingItems(true);
    const cache = localStorage.getItem("items_in_cache");
    if (cache) {
      const { items, date } = JSON.parse(cache);
      if (dayjs().diff(dayjs(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache) {
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
            date: dayjs().format("DDMMYYYY HH:mm:ss"),
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

  const groupBoletosByDueDate = (boletos: Boleto[]): Record<string, number> => {
    return boletos.reduce((acc: Record<string, number>, boleto: Boleto) => {
      acc[boleto.DTVENC] = (acc[boleto.DTVENC] || 0) + boleto.VLRDESDOB;
      return acc;
    }, {});
  };
  const prepareLineChartData = (groupedBoletos: Record<string, number>) => {
    const sortedDates = Object.keys(groupedBoletos).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    const labels = sortedDates.map((date) =>
      dayjs(date, "DDMMYYYY HH:mm:ss").format("DD/MM/YY")
    );

    const data = sortedDates.map((date) => groupedBoletos[date]);

    return {
      labels,
      datasets: [
        {
          label: "Total a Pagar por Dia",
          data,
          fill: false,
          borderColor: "#E53E3E",
          tension: 0.1,
        },
      ],
    };
  };

  const getBoletos = useCallback(() => {
    setLoadingBills(true);
    const cache = localStorage.getItem("boletos_in_cache");
    if (cache) {
      const { boletos, date } = JSON.parse(cache);
      if (dayjs().diff(dayjs(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache) {
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
            date: dayjs().format("DDMMYYYY HH:mm:ss"),
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

  const hasUpdated = React.useRef(false);

  useEffect(() => {
    if (!hasUpdated.current) {
      hasUpdated.current = true;
      getBoletos();
      getItems();
      return;
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
            height: "100px",
            backgroundColor: theme.token.colorPrimary,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -((44 / 375) * window.innerWidth),
            }}
          >
            <svg
              width={"100%"}
              height={(44 / 375) * window.innerWidth}
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
            padding: "32px 16px 24px",
          }}
        >
          <Card
            loading={loadingItems}
            bodyStyle={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              height: "200px",
            }}
            style={{
              borderRadius: "22px",
              boxShadow: "0px 4px 17px 2px rgba(0, 0, 0, 0.10)",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#A0AEC0",
                fontWeight: 700,
                margin: 0,
                position: "absolute",
              }}
            >
              Categorias
            </Title>
            <Pie
              style={{
                marginTop: "16px",
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "left",
                    labels: {
                      boxWidth: 12,
                      boxHeight: 12,
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
              data={prepareChartData(getTopFiveGroups(countGroups(items)))}
            />
          </Card>
          <Card
            loading={loadingBills}
            bodyStyle={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              height: "200px",
            }}
            style={{
              borderRadius: "22px",
              boxShadow: "0px 4px 17px 2px rgba(0, 0, 0, 0.10)",
              marginTop: "16px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#A0AEC0",
                fontWeight: 700,
                margin: 0,
                position: "absolute",
              }}
            >
              Prvisão de cobranças
            </Title>
            <Line
              style={{
                marginTop: "32px",
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    position: "left",
                    display: false,
                    labels: {
                      boxWidth: 12,
                      boxHeight: 12,
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
              data={prepareLineChartData(groupBoletosByDueDate(boletos))}
            />
          </Card>
        </div>
      </div>
    </GlobalWrapper>
  );
};
