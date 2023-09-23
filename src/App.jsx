//hooks
import { useEffect, useState } from "react";

//Estilizacao
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box, Flex, Button, useDisclosure, Table, Thead,
  Tr, Th, Tbody, Td, useBreakpointValue
} from "@chakra-ui/react";

//components
import ModalComp from "./components/ModalComp";

//services
import { Service } from "./services/Service";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false
  });

  useEffect(() => {
    const service = new Service();
    service.list().then(response => {
      setData(response.data)
    });
  }, [setData]);

  const handleRemove = (id) => {
    const service = new Service();
    service.excluir(id).then(response => {
      setData(data.filter(x => x.id !== id));
    }).catch(err => {
      alert("Erro ao excluir usuario")
    });
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box w="80%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Novo Cadastro
        </Button>
        <Box overflow="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 150} fontSize="20px">
                  Sobrenome
                </Th>
                <Th maxW={isMobile ? 5 : 200} fontSize="20px">
                  CEP
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length ? data.map(({ id, nome, sobrenome, cep, logradouro, complemento, bairro }, index) => (
                <Tr key={index} cursor="pointer" hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{nome}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{sobrenome}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{cep}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [setDataEdit({id, nome, sobrenome, cep, logradouro, complemento, bairro, index }),
                      onOpen()]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id)} />
                  </Td>
                </Tr>
              ))
                : <Tr>
                  <Td>Nenhum registro Cadastrado</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              }
            </Tbody>
          </Table>
        </Box>
      </Box>
      {
        isOpen && (
          <ModalComp
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}
    </Flex >
  )
};

export default App;
