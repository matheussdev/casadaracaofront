import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

interface OrdemServicoProps {
  data: {
    id_ordem_servico: number;
    numero_ordem_servico: number;
    data_cadastro: string;
    tipo: string;
    descricao_servico: string;
    descricao_fechamento: string;
    status: string;
    data_inicio_programado: string;
    data_termino_programado: string;
  };
}

export const OrdemServico: React.FC<OrdemServicoProps> = (
  props: OrdemServicoProps
) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text strong>Id: </Text>
        <Text>{props.data.id_ordem_servico}</Text>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Data inicio programado: </Text>
          <Text>{props.data.data_inicio_programado}</Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Data termino programado: </Text>
          <Text>{props.data.data_termino_programado}</Text>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Data de cadastro: </Text>
          <Text>{props.data.data_cadastro}</Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text strong>Ordem de serviço: </Text>
          <Text>{props.data.numero_ordem_servico}</Text>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text strong>Tipo: </Text>
        <Text>{props.data.tipo}</Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text strong>Status: </Text>
        <Text>{props.data.status}</Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text strong>Descrição de serviço: </Text>
        <Text>{props.data.descricao_servico}</Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text strong>Descrição de fechamento: </Text>
        <Text>{props.data.descricao_fechamento ?? "Não definido"}</Text>
      </div>
    </div>
  );
};
