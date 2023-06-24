import api from "../config/api";

export const updateUserWallet = async (
  cpf: string,
  payload: UpdatedWallet
): Promise<Result<Wallet | undefined>> => {
  try {
    const res = await api.put<Wallet>(`/wallet/aprovaCreditos/${cpf}`, payload);
    return { type: "success", value: res.data } as unknown as Result<Wallet>;
  } catch (error: any) {
    if (error instanceof Error)
      return { type: "error", error, value: undefined };

    return {
      type: "error",
      error: new Error("Erro desconhecido"),
      value: error.response.data,
    };
  }
};
