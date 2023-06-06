import api from "../../config/api";

export const getAllStations = async (): Promise<Result<postFormData[]>> => {
  try {
    const res = await api.get<postFormData>(`/stations/`);

    return { type: "success", value: res.data } as unknown as Result<
      postFormData[]
    >;
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

export const createStation = async (
  payload: postFormData
): Promise<Result<postFormData>> => {
  try {
    const res = await api.post<postFormData>(`/stations/register/`, payload);
    return {
      type: "success",
      value: res.data,
    } as unknown as Result<postFormData>;
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

export const deleteStation = async (
  idPosto: number
): Promise<Result<postFormData>> => {
  try {
    const res = await api.delete<postFormData>(`/stations/station/${idPosto}`);
    return {
      type: "success",
      value: res.data,
    } as unknown as Result<postFormData>;
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

export const getStation = async (idPosto: number): Promise<Result<postFormData[]>> => {
  try {
    const res = await api.get<postFormData>(`/stations/station/${idPosto}`);

    return { type: "success", value: res.data } as unknown as Result<
      postFormData[]
    >;
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
