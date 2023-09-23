import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, FormControl, FormLabel,
    Input, Box, Flex, Checkbox
} from "@chakra-ui/react";
import { useState } from "react";
import { Service } from "../services/Service"

import axios from 'axios';


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [id] = useState(dataEdit.id || 0);
    const [nome, setNome] = useState(dataEdit.nome || "");
    const [sobrenome, setSobrenome] = useState(dataEdit.sobrenome || "");
    const [cep, setCep] = useState(dataEdit.cep || "");
    const [logradouro, setLogradouro] = useState(dataEdit.logradouro || "");
    const [complemento, setComplemento] = useState(dataEdit.complemento || "");
    const [bairro, setBairro] = useState(dataEdit.bairro || "");

    const [seiCep, setSeiCep] = useState(id ? true : false);

    const handleSave = () => {
        const service = new Service();

        if (!nome || !sobrenome) return;

        if (Object.keys(dataEdit).length) {
            service.alterar({ id, nome, sobrenome, cep, logradouro, complemento, bairro }).then(response => {
                setData(response.data)
            }).catch(error => {
                console.error(error)
            });
        } else {
            service.CriarUsuario({ id, nome, sobrenome, cep, logradouro, complemento, bairro }).then(response => {
                setData(response.data)
            }).catch(error => {
                console.error(error)
            });
        }

        onClose();
    };

    const handleBuscarEndereco = async (e) => {
        e.preventDefault();
        setSeiCep(true);
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            // const data = service.BuscarEndereco(cep);

            if (data.erro) {
                setEndereco('CEP não encontrado');
            } else {
                setLogradouro(data.logradouro);
                setComplemento(data.complemento);
                setBairro(data.bairro);
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)} />
                            </Box>
                            <Box>
                                <FormLabel>Sobrenome</FormLabel>
                                <Input type="text"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)} />
                            </Box>
                            <Box>
                                <FormLabel>CEP</FormLabel>
                                <Flex>
                                    <Input type="text"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)} />
                                    <Button ml={3} isDisabled={!cep} colorScheme="gray" onClick={handleBuscarEndereco}>Buscar</Button>
                                </Flex>
                                <Checkbox
                                    onChange={(e) => setSeiCep(e.target.checked)}
                                >Não sei meu cep.</Checkbox>
                            </Box>

                            {seiCep && (
                                <div>
                                    <Box>
                                        <FormLabel>Logradouro</FormLabel>
                                        <Input type="text"
                                            value={logradouro}
                                            onChange={(e) => setLogradouro(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Complemento</FormLabel>
                                        <Input type="text"
                                            value={complemento}
                                            onChange={(e) => setComplemento(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Bairro</FormLabel>
                                        <Input type="text"
                                            value={bairro}
                                            onChange={(e) => setBairro(e.target.value)} />
                                    </Box>
                                </div>
                            )}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSave} >Salvar</Button>
                        <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default ModalComp;