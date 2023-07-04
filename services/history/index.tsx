import api from "../config/api";

export const getAllHistories = async (): Promise<Result<History[]>> => {
  try {
    const res = await api.get<History[]>(`/history/`);
    return { type: "success", value: res.data } as unknown as Result<History[]>;
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
