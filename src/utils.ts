import { CatIcon, DogIcon } from "./assets/icons";

export const IconMap = {
  Cachorro: DogIcon,
  Gato: CatIcon,
};

export const currency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function formatPhoneNumber(value: string): string {
  const cleaned = ("" + value).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return value;
}

export function formatCnpj(value: string) {
  const cleaned = ("" + value).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
  if (match) {
    return [
      match[2],
      ".",
      match[3],
      ".",
      match[4],
      "/",
      match[5],
      "-",
      match[6],
    ].join("");
  }
  return value;
}
