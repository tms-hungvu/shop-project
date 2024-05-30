import { axiosClient } from "@/api/axios";
import { IProduct } from "@/interface/product.interface";

class ProductService {
    async getAll(){
        return await axiosClient.get('products');
    }
    async create(payload : IProduct){
        return await axiosClient.post('products', payload);
    }
    async update( payload : IProduct, id : number | string){
        return await axiosClient.put(`products/${id}`, payload)
    }
    async delete(id : number | string){
        return await axiosClient.delete(`products/${id}`);
    }
}
export default new ProductService();