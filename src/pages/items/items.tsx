/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import { GlobalWrapper } from "../../components/GlobalWrapper";
import Card from "antd/es/card/Card";
import { theme } from "../../theme";
import { Typography } from "antd";
import api from "../../services/api";
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
import moment from "moment";

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
  const [billResume, setBillResume] = React.useState({
    open: 0,
    paid: 0,
    due: 0,
    total: 0,
  });
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
      moment(date, "DDMMYYYY HH:mm:ss").format("DD/MM/YY")
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

  const billsResume = useCallback((bills: Boleto[]) => {
    setBillResume({
      open: bills.filter((boleto: Boleto) => {
        return (
          boleto.DHBAIXA === null &&
          moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isAfter(moment())
        );
      }).length,
      paid: bills.filter((x: Boleto) => {
        return x.DHBAIXA !== null;
      }).length,
      due: bills.filter((boleto: Boleto) => {
        return (
          boleto.DHBAIXA === null &&
          moment(boleto.DTVENC, "DDMMYYYY HH:mm:ss").isBefore(moment())
        );
      }).length,
      total: bills.length,
    });
  }, []);

  const getBoletos = useCallback(() => {
    setLoadingBills(true);
    const cache = localStorage.getItem("boletos_in_cache");
    if (cache) {
      const { boletos, date } = JSON.parse(cache);
      if (
        moment().diff(moment(date, "DDMMYYYY HH:mm:ss"), "minute") < time_cache
      ) {
        setBoletos(boletos);
        billsResume(boletos);
        setLoadingBills(false);
        return;
      }
    }
    api
      .get("/boleto/")
      .then((response) => {
        setBoletos(response.data);
        billsResume(response.data);
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
  }, [billsResume]);

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
            height: "100px",
            backgroundColor: theme.token.colorPrimary,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              bottom: -60,
              height: 60,
              borderRadius: "0 0 100% 100%",
              backgroundColor: theme.token.colorPrimary,
            }}
          >
          </div>
        </div>
        <div
          style={{
            padding: "32px 16px 24px",
            display: "grid",
            gap: "16px",
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
              height: "180px",
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
              Boletos
            </Title>
            <Pie
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
                        size: 12,
                      },
                    },
                  },
                },
              }}
              data={{
                labels: ["Pagos", "A vencer", "Vencidos"],
                datasets: [
                  {
                    label: "Boletos",
                    data: [billResume.paid, billResume.open, billResume.due],
                    backgroundColor: ["#64C280", "#4299E1", "#E53E3E"],
                    borderColor: ["#64C280", "#4299E1", "#E53E3E"],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Card>
          <Card
            loading={loadingBills}
            bodyStyle={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              height: "200px",
              paddingBottom: "40px",
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
