import { Button, Form, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import {  useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IProduct } from "@/interface/product.interface";
import { useCrud } from "@/hooks/useCrud";
import { toast } from "react-toastify";
import { schemaProduct } from "@/components/inputs/product/product.schema";
import BaseInput from "@/components/inputs/baseInput";
interface IAddProductProp {
    setAddTab :  Dispatch<SetStateAction<boolean>>;
    add : boolean;
}



export default function AddProduct({setAddTab, add} : IAddProductProp){
    const {create, fetcher} = useCrud(`products`, 'PRODUCT_API');


    const { control, register, handleSubmit, formState: { errors }  } = useForm<IProduct>({
        resolver: joiResolver(schemaProduct),
    });

    const onSubmit = async (data : IProduct) => {
      await create(data as any, true);
      toast.success(`Add product "${data.title}" success`);
      setAddTab(false)
    }
  
    return (<>
       <Modal title='Add product' open={true} onCancel={() => setAddTab(false)}>
        <Form
          layout="vertical" 
          name='nest-messages'
        
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit(onSubmit)}
        >
         
          <BaseInput 
             control={control}
             title="Title"
             name="title"
             messageError={errors.title?.message}
             placeholder="Enter title"
          />

         <BaseInput 
             control={control}
             title="Price"
             name="price"
             messageError={errors.price?.message}
             placeholder="Enter price"
          />

         <BaseInput 
             control={control}
             title="Content"
             name="content"
             messageError={errors.content?.message}
             placeholder="Enter content"
          />

         <BaseInput 
             control={control}
             title="Image"
             name="image"
             messageError={errors.image?.message}
             placeholder="Enter url image"
          />


          
          <Form.Item >
            <Button loading={fetcher.loading} disabled={fetcher.loading} type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    
    </>)
}