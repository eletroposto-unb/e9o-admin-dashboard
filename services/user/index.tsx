import api from "../../config/api";

export const getAllUsers = async (): Promise<Result<User[]>> => {
  try {
    const res = await api.get<User[]>(`/users/`);
    return { type: "success", value: res.data } as unknown as Result<User[]>;
  } catch (error) {
    if (error instanceof Error)
      return { type: "error", error, value: undefined };

    return {
      type: "error",
      error: new Error("Erro desconhecido"),
      value: undefined,
    };
  }
};
