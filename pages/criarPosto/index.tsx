import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import Router from "next/router";
import AuthProtect from "@/components/AuthProtect";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./mapa"), {
  ssr: false,
});

const CriarPosto = () => {
  const theme = useTheme();
  const toast = useToast();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<postFormData>();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const MyComponent = () => {
    useMapEvents({
      click: (currentEvent) => {
        const { lat, lng } = currentEvent.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
        console.log("latitude:" + lat, "longitude:" + lng);
      },
    });
    return null;
  };

  const onSubmit = (data: postFormData) => {
    console.log("data", data);
  };

  return (
    <AuthProtect>
      <Navbar />
      <Flex
        w="100%"
        minHeight={"90vh"}
        h="auto"
        flexDir="column"
        padding="2% 10% 5% 10%"
        backgroundColor={`${theme.colors.lightGray.main}`}
      >
        <Text fontWeight={"bold"} fontSize={18}>
          Criar posto
        </Text>
        <Flex flexDirection={"row"} mt={2}>
          <Flex width={"50%"} mr={1} flexDirection={"column"}>
            <Flex flexDirection={"column"} width={"100%"} mt={2}>
              <Text fontSize={14}>Nome</Text>
              <Controller
                control={control}
                name="name"
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
              {errors?.name && (
                <Alert status="warning" height={5} mt={2} fontSize={12}>
                  <AlertIcon />
                  {errors.name.message}
                </Alert>
              )}
            </Flex>
            <Flex flexDirection={"column"} width={"100%"} mt={2}>
              <Text fontSize={14}>Descrição</Text>
              <Controller
                control={control}
                name="description"
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

              {errors?.description && (
                <Alert status="warning" height={5} mt={2} fontSize={12}>
                  <AlertIcon />
                  {errors.description.message}
                </Alert>
              )}
            </Flex>
            <Flex width={"100%"} mt={2}>
              <MapContainer
                center={[-15.9831845, -48.0413209]}
                zoom={12}
                style={{
                  width: "100%",
                  height: 280,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 5,
                }}
              >
                <MyComponent />
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {position.latitude !== 0 && (
                  <Marker
                    position={[position.latitude, position.longitude]}
                  ></Marker>
                )}
              </MapContainer>
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} width={"50%"} ml={1}>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Horário de Funcionamento</Text>
                <Controller
                  control={control}
                  name="horarioDeFuncionamento"
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
                {errors?.horarioDeFuncionamento && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.horarioDeFuncionamento.message}
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
                      <option value="tipo2">Tipo 2</option>
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
                    <Input
                      width={"100%"}
                      size={"md"}
                      borderRadius={"5"}
                      borderWidth={0}
                      backgroundColor={`${theme.colors.white.main}`}
                      placeholder="Ex: Estacionamento privado"
                      color={`${theme.colors.lightBlack.main}`}
                      fontSize={14}
                      value={value}
                      onChange={onChange}
                    />
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
                  name="status"
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
                    </Select>
                  )}
                />
                {errors?.status && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.status.message}
                  </Alert>
                )}
              </Flex>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} width={"100%"} mt={2} mr={1}>
                <Text fontSize={14}>Custo por Khw</Text>
                <Controller
                  control={control}
                  name="custo"
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
                        <FaCoins
                          color={`${theme.colors.secundary.main}`}
                          size={20}
                        />
                      </InputRightElement>
                    </InputGroup>
                  )}
                />
                {errors?.custo && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.custo.message}
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
                    {errors.cabo.message}
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
                <Text fontSize={14}>Bairro</Text>
                <Controller
                  control={control}
                  name="bairro"
                  rules={{
                    required: "Campo obrigatório",
                  }}
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
                {errors?.bairro && (
                  <Alert status="warning" height={5} mt={2} fontSize={12}>
                    <AlertIcon />
                    {errors.bairro.message}
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
            <Flex width={"100%"} height={"100%"}>
              <Flex
                flexDirection={"column"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                width={"100%"}
              >
                <Alert
                  status="info"
                  height={5}
                  mt={2}
                  fontSize={12}
                  justifyContent={"center"}
                >
                  <AlertIcon />
                  <Text>
                    Ajude os usuários definindo precisamente o local no mapa.
                  </Text>
                </Alert>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          width={"100%"}
          mt={5}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button
            colorScheme="teal"
            w={250}
            h={10}
            backgroundColor={`${theme.colors.primary.main}`}
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
          <Button
            colorScheme="teal"
            w={250}
            h={10}
            variant="link"
            color={`${theme.colors.primary.main}`}
            onClick={() => Router.back()}
          >
            Cancelar
          </Button>
        </Flex>
      </Flex>
    </AuthProtect>
  );
};

export default CriarPosto;
