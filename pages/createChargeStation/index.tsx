/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  useTheme,
  Select,
  Textarea,
  Button,
  useToast,
  Alert,
  AlertIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Spinner,
} from "@chakra-ui/react";
import { MdLiveHelp } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { ImPowerCord } from "react-icons/im";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import AuthProtect from "@/components/AuthProtect";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { createStation, getStation } from "@/services/station";
import { StationEditDto } from "@/dto/stationEdit.dto";
import { updateStation } from "../../services/station";

const CurrentMap = dynamic(() => import("../../components/CurrentMap"), {
  ssr: false,
});

const CriarPosto = () => {
  const theme = useTheme();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<postFormData>();
  const [position, setPosition] = useState({
    PLat: 0,
    PLng: 0,
  });

  const handleStation = async (id: number) => {
    setLoading(true);
    const data = await getStation(id);
    handleLatAndLng(data.value.address.latitude, data.value.address.longitude);
    const station = {
      nome: data.value.station.nome,
      descricao: data.value.station.descricao,
      horarioFuncionamento: data.value.station.horarioFuncionamento,
      tipoTomada: data.value.station.tipoTomada,
      comodidade: data.value.address.comodidade,
      statusFuncionamento: data.value.station.statusFuncionamento,
      precoKwh: data.value.station.precoKwh,
      cabo: data.value.station.cabo ? 1 : 0,
      potencia: data.value.station.potencia,
      latitude: data.value.address.latitude,
      longitude: data.value.address.longitude,
      endereco: data.value.address.endereco,
      estado: data.value.address.estado,
      cep: data.value.address.cep,
      cidade: data.value.address.cidade,
      numero: data.value.address.numero,
      complemento: data.value.address.complemento,
    };
    setLoading(false);
    return station;
  };

  useEffect(() => {
    async function fetchMyAPI() {
      if (router.query.idPosto) {
        const res = await handleStation(Number(router.query.idPosto));

        setPosition({
          PLat: res.latitude,
          PLng: res.longitude,
        });

        Object.entries(res).forEach(([key, value]) => {
          setValue(key as keyof StationEditDto, value);
        });
      }
    }

    fetchMyAPI();
  }, []);

  const handleLatAndLng = (lat: number, lng: number) => {
    setPosition({
      PLat: lat,
      PLng: lng,
    });
  };

  const formatData = (data: postFormData) => {
    const payload = {
      // DADOS DO POSTO
      nome: data.nome,
      descricao: data.descricao,
      horarioFuncionamento: data.horarioFuncionamento,
      tipoTomada: data.tipoTomada,
      comodidade: data.comodidade,
      statusFuncionamento: data.statusFuncionamento,
      precoKwh: Number(data.precoKwh),
      cabo: Number(data.cabo) === 1 ? 1 : 0,
      potencia: Number(data.potencia),
      // ENDEREÇO
      latitude: position.PLat,
      longitude: position.PLng,
      endereco: data.endereco,
      estado: data.estado,
      cep: data.cep,
      cidade: data.cidade,
      numero: Number(data.numero),
      complemento: data.complemento,
    };
    return payload;
  };

  const handleResetForm = () => {
    reset({
      nome: "",
      descricao: "",
      horarioFuncionamento: "",
      tipoTomada: "",
      comodidade: "",
      statusFuncionamento: "",
      precoKwh: Number(""),
      cabo: "",
      potencia: Number(""),
      endereco: "",
      estado: "",
      cep: "",
      cidade: "",
      numero: Number(""),
      complemento: "",
    });
  };

  const onSubmit = async (data: postFormData) => {
    setLoading(true);
    const payload = formatData(data);

    let station;
    let descricao;
    let descricaoErro;
    if (!router.query.idPosto) {
      station = await createStation(payload);
      descricao = "A estação de carregamento foi cadastrada com sucesso!";
      descricaoErro = "Erro no cadastro da estação de carregamento. Tente novamente!";
      handleResetForm();
    } else {
      station = await updateStation(payload, Number(router.query.idPosto));
      descricao = "A estação de carregamento foi editada com sucesso!";
      descricaoErro = "Erro no cadastro da Estação de Carregamento. Tente novamente!";
    }

    if (station?.value?.station.idPosto) {
      toast({
        id: "create-station-success",
        title: "Sucesso!",
        description: descricao,
        status: "success",
      });
    } else {
      toast({
        id: "create-station-error",
        title: "Alerta!",
        description: descricaoErro,
        status: "warning",
      });
    }
    setLoading(false);
  };

  const HelpComponent = (): JSX.Element => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button fontSize={14} backgroundColor={`${theme.colors.lightGray.main}`} color={`${theme.colors.primary.main}`}>
            <MdLiveHelp size={30} />
          </Button>
        </PopoverTrigger>
        <PopoverContent zIndex={2} backgroundColor={`${theme.colors.primary.main}`}>
          <PopoverArrow />
          <PopoverCloseButton color={`${theme.colors.white.main}`} />
          <PopoverBody padding={"10% 5%"} textAlign={"justify"} color={`${theme.colors.white.main}`}>
            Marcar a localização no mapa é uma ferramenta extremamente útil que auxilia os usuários a encontrar a estação de carregamento criada.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <AuthProtect>
      <Navbar />
      <Flex w="100%" minHeight={"calc(100vh - 74px)"} h="auto" flexDir="column" padding="2% 10% 5% 10%" backgroundColor={`${theme.colors.lightGray.main}`}>
        <BiArrowBack size={25} color={`${theme.colors.primary.main}`} onClick={() => Router.back()} style={{ cursor: "pointer", marginBottom: 10 }} />
        <Text fontWeight={"bold"} fontSize={18}>
          {router.query.idPosto ? "Editar posto" : "Criar posto"}
        </Text>
        <Flex flexDirection={"row"} mt={2} gap={15}>
          <Flex width={"50%"} mr={1} flexDirection={"column"}>
            <Flex flexDirection={"column"} width={"100%"} mt={2}>
              <Text fontSize={14}>Nome</Text>
              <Controller
                control={control}
                name="nome"
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    width={"100%"}
                    size={"md"}
                    borderRadius={"5"}
                    borderWidth={0}
                    value={value}
                    onChange={onChange}
                    fontSize={14}
                    backgroundColor={`${theme.colors.white.main}`}
                    placeholder="Ex: EletroPosto FGA"
                    color={`${theme.colors.lightBlack.main}`}
                  />
                )}
              />
              {errors?.nome && (
                <Alert status="warning" height={5} mt={2} fontSize={12}>
                  <AlertIcon />
                  {errors.nome.message}
                </Alert>
              )}
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} mt={2}>
              <Text fontSize={14}>Descrição</Text>
              <Controller
                control={control}
                name="descricao"
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    width={"100%"}
                    size={"sm"}
                    borderRadius={"5"}
                    borderWidth={0}
                    rows={5}
                    value={value}
                    onChange={onChange}
                    fontSize={14}
                    backgroundColor={`${theme.colors.white.main}`}
                    placeholder="Ex: Posto Publico da Faculdade do Gama -  FGA (UnB)"
                    color={`${theme.colors.lightBlack.main}`}
                  />
                )}
              />

              {errors?.descricao && (
                <Alert status="warning" height={5} mt={2} fontSize={12}>
                  <AlertIcon />
                  {errors.descricao.message}
                </Alert>
              )}
            </Flex>
            <Flex width={"100%"} mt={2} zIndex={1}>
              {!loading ? (
                <CurrentMap handleLatAndLng={handleLatAndLng} lat={position.PLat} lng={position.PLng} />
              ) : (
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" />
              )}
            </Flex>
            <Flex>
              <HelpComponent />
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} width={"50%"} ml={1}>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Horário de Funcionamento</Text>
                <Controller
                  control={control}
                  name="horarioFuncionamento"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder="Ex: 8h às 18h"
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.horarioFuncionamento && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.horarioFuncionamento.message}
                  </Alert>
                )}
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} ml={1}>
                <Text fontSize={14}>Tipo de tomada</Text>
                <Controller
                  control={control}
                  name="tipoTomada"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      borderRadius={"5"}
                      width={"100%"}
                      size={"md"}
                      mr={"1"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      color={`${theme.colors.lightBlack.main}`}
                      placeholder={"Selecione"}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    >
                      <option value="tipo 2">Tipo 2</option>
                    </Select>
                  )}
                />
                {errors?.tipoTomada && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.tipoTomada.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Comodidade</Text>
                <Controller
                  control={control}
                  name="comodidade"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      borderRadius={"5"}
                      width={"100%"}
                      size={"md"}
                      mr={"1"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder={"Selecione"}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    >
                      <option value="Estacionamento Público">Estacionamento Público</option>
                      <option value="Estacionamento Privado">Estacionamento Privado</option>
                      <option value="Shopping">Shooping</option>
                      <option value="Faculdade/Universidade">Faculdade/Universidade</option>
                      <option value="Órgãos Públicos">Órgãos Públicos</option>
                      <option value="Loja">Loja</option>
                      <option value="Outro">Outro</option>
                    </Select>
                  )}
                />
                {errors?.comodidade && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.comodidade.message}
                  </Alert>
                )}
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} ml={1}>
                <Text fontSize={14}>Status</Text>
                <Controller
                  control={control}
                  name="statusFuncionamento"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      borderRadius={"5"}
                      width={"100%"}
                      size={"md"}
                      mr={"1"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder={"Selecione"}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    >
                      <option value="disponivel">Disponível</option>
                      <option value="indisponivel">Indisponível</option>
                      <option value="bloqueado">Bloqueado</option>
                      <option value="em manutencao">Em Manutenção</option>
                      <option value="inativo">Inativo</option>
                    </Select>
                  )}
                />
                {errors?.statusFuncionamento && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.statusFuncionamento.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Custo por Khw</Text>
                <Controller
                  control={control}
                  name="precoKwh"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <InputGroup>
                      <Input
                        width={"100%"}
                        size={"md"}
                        borderRadius={"5"}
                        borderWidth={0}
                        backgroundColor={`${theme.colors.white.main}`}
                        placeholder="Ex: 4"
                        color={`${theme.colors.lightBlack.main}`}
                        fontSize={14}
                        value={value}
                        onChange={onChange}
                      />
                      <InputRightElement>
                        <FaCoins color={`${theme.colors.secundary.main}`} size={20} />
                      </InputRightElement>
                    </InputGroup>
                  )}
                />
                {errors?.precoKwh && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.precoKwh.message}
                  </Alert>
                )}
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} ml={1}>
                <Text fontSize={14}>Precisa levar cabo?</Text>
                <Controller
                  control={control}
                  name="cabo"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      borderRadius={"5"}
                      width={"100%"}
                      size={"md"}
                      mr={"1"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder={"Selecione"}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    >
                      <option value={1}>Sim</option>
                      <option value={0}>Não</option>
                    </Select>
                  )}
                />
                {errors?.cabo && (
                  <Alert status="warning" height={8} mt={2} fontSize={12}>
                    <AlertIcon />
                    <>{errors.cabo.message}</>
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2}>
                <Text fontSize={14}>Potencia aproximada de carregamento? (Em Khw)</Text>
                <Controller
                  control={control}
                  name="potencia"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <InputGroup>
                      <Input
                        width={"100%"}
                        size={"md"}
                        borderRadius={"5"}
                        borderWidth={0}
                        type="number"
                        backgroundColor={`${theme.colors.white.main}`}
                        placeholder="Ex: 3,7"
                        color={`${theme.colors.lightBlack.main}`}
                        fontSize={14}
                        value={value}
                        onChange={onChange}
                      />
                      <InputRightElement>
                        <ImPowerCord color={`${theme.colors.secundary.main}`} size={20} />
                      </InputRightElement>
                    </InputGroup>
                  )}
                />
                {errors?.potencia && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.potencia.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Endereço</Text>
                <Controller
                  control={control}
                  name="endereco"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder="Ex: Faculdade UnB Gama - FGA UnB"
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.endereco && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.endereco.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Estado</Text>
                <Controller
                  control={control}
                  name="estado"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      placeholder="Ex: Distrito Federal"
                      backgroundColor={`${theme.colors.white.main}`}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.cep && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.cep.message}
                  </Alert>
                )}
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} ml={1}>
                <Text fontSize={14}>Cidade</Text>
                <Controller
                  control={control}
                  name="cidade"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      placeholder="Ex: Gama"
                      backgroundColor={`${theme.colors.white.main}`}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.cidade && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.cidade.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>CEP</Text>
                <Controller
                  control={control}
                  name="cep"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      placeholder="Ex: 72.444-240"
                      backgroundColor={`${theme.colors.white.main}`}
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.cep && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.cep.message}
                  </Alert>
                )}
              </Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} ml={1}>
                <Text fontSize={14}>Número</Text>
                <Controller
                  control={control}
                  name="numero"
                  rules={{
                    required: "Campo obrigatório",
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      placeholder="09"
                      backgroundColor={`${theme.colors.white.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors?.numero && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.numero.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} mt={2}>
              <Text fontSize={14}>Complemento</Text>
              <Controller
                control={control}
                name="complemento"
                render={({ field: { value, onChange } }) => (
                  <Input
                    width={"100%"}
                    size={"md"}
                    borderRadius={"5"}
                    borderWidth={0}
                    placeholder="Ex: St. Leste Projeção A"
                    backgroundColor={`${theme.colors.white.main}`}
                    color={`${theme.colors.lightBlack.main}`}
                    fontSize={14}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors?.complemento && (
                <Alert status="warning" height={5} mt={2} fontSize={12}>
                  <AlertIcon />
                  {errors.complemento.message}
                </Alert>
              )}
            </Flex>
            <Flex width={"100%"} height={"100%"}>
              <Flex flexDirection={"column"} justifyContent={"flex-end"} alignItems={"center"} width={"100%"}>
                <Alert status="info" height={10} mt={2} fontSize={12} justifyContent={"center"} borderRadius={5}>
                  <AlertIcon />
                  <Text>Ajude os usuários definindo precisamente o local no mapa.</Text>
                </Alert>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex width={"100%"} mt={5} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
          <Button
            colorScheme="teal"
            w={250}
            h={10}
            backgroundColor={`${theme.colors.primary.main}`}
            onClick={handleSubmit(onSubmit)}
            rightIcon={loading ? <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="md" /> : <></>}
          >
            {loading ? "Salvando" : "Salvar"}
          </Button>
          <Button colorScheme="teal" w={250} h={10} variant="link" color={`${theme.colors.primary.main}`} onClick={() => Router.back()}>
            Cancelar
          </Button>
        </Flex>
      </Flex>
    </AuthProtect>
  );
};

export default CriarPosto;
