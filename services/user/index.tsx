import api from "../../config/api";

export const getAllUsers = async (): Promise<Result<User[]>> => {
  try {
    const res = await api.get<User[]>(`/users/`);
    return { type: "success", value: res.data } as unknown as Result<User[]>;
  } catch (error: any) {
    if (error instanceof Error) return { type: "error", error, value: undefined };

    return {
      type: "error",
      error: new Error("Erro desconhecido"),
      value: error.response.data,
    };
  }
};

export const updateUser = async (user: User): Promise<Result<User | undefined>> => {
  try {
    const res = await api.put<User>(`/users/${user.cpf}`, user);
    return { type: "success", value: res.data } as unknown as Result<User>;
  } catch (error: any) {
    if (error instanceof Error) return { type: "error", error, value: undefined };

    return {
      type: "error",
      error: new Error("Erro desconhecido"),
      value: error.response.data,
    };
  }
};

export const updateUserStatus = async (user: User): Promise<Result<User | undefined>> => {
  try {
    const res = await api.put<User>(`/users/alterstatus/${user.cpf}`);
    return { type: "success", value: res.data } as unknown as Result<User>;
  } catch (error) {
    if (error instanceof Error) return { type: "error", error, value: undefined };

    return {
      type: "error",
      error: new Error("Erro desconhecido"),
      value: undefined,
    };
  }
}
