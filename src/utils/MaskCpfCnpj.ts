export class MaskCpfCnpj {
  static formatCpfCnpj(numero: string): string {
    // Remove caracteres não numéricos
    const apenasDigitos = numero.replace(/\D/g, '');

    // Verifica se é CPF ou CNPJ baseado na quantidade de caracteres
    if (apenasDigitos.length === 11) {
      // Se for CPF, adiciona a máscara de CPF
      return apenasDigitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (apenasDigitos.length === 14) {
      // Se for CNPJ, adiciona a máscara de CNPJ
      return apenasDigitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      // Se não for nem CPF nem CNPJ, retorna o número original
      return numero;
    }
  }

  static desformatar(cpf: string): string {
    // Remove caracteres não numéricos
    return cpf.replace(/\D/g, "");
  }
}
