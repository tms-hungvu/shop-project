import { Button, Form, Input, Modal } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IProduct } from "@/interface/product.interface";
import { useCrud } from "@/hooks/useCrud";
import { toast } from "react-toastify";
import { schemaProduct } from "@/components/inputs/product/product.schema";
import BaseInput from "@/components/inputs/baseInput";
interface IEditProductProp {
    dataEdit : IProduct | null;
    setEditTab :  Dispatch<SetStateAction<boolean>>;
    edit : boolean;
}




export default function EditProduct({dataEdit, setEditTab, edit} : IEditProductProp){
    const {update, fetcher} = useCrud(`products`, 'PRODUCT_API');


    const {reset, control, register, handleSubmit, formState: { errors }  } = useForm<IProduct>({
        resolver: joiResolver(schemaProduct),
    });
  
    const onSubmit = async (data : any) => {
      delete data.key;
      await update(data, false);
      toast.warning(`Edit product "${data.title}" success`);
      setEditTab(false);
    }
    useEffect(() => {
        if(dataEdit) {
            reset(dataEdit)
        }
    }, [dataEdit])
  
    return (<>
       <Modal title={`Edit product "${dataEdit?.title}"`} open={edit} onCancel={() => setEditTab(false)}>
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

          <div>
             <img src={dataEdit?.image} width={250}/>
          </div>
          
          <Form.Item >
            <Button loading={fetcher.loading} disabled={fetcher.loading} danger  type="primary" htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    
    </>)
}