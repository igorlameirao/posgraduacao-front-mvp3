import { api } from './_base'
import axios, { AxiosInstance } from 'axios';


export class Service {
    private nomeController = "usuarios";

    public CriarUsuario(data: any) {
        return api.post(`${this.nomeController}`,  data);
    }
    
    public async BuscarEndereco(cep){

          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          const data = response.data;
        // return api.get(`${this.nomeController}/BuscarEndereco`, {
        //     params: { cep }
        // });
    }

    public list() {
        return api.get(`${this.nomeController}`);
    }

    public getById(id) {
        return api.get(`${this.nomeController}`, {
            params: { id }
        });
    }

    public alterar(data: any) {
        return api.put(`${this.nomeController}`, data);
    }

    public excluir(id): Promise<any> {
        return api.delete(`${this.nomeController}`, {
            params: { id }
        });
    }
}

