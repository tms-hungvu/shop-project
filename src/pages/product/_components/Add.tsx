import { Button, Form, Input, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IProduct } from "@/interface/product.interface";
import { useCrud } from "@/hooks/useCrud";
import { toast } from "react-toastify";
interface IAddProductProp {
    setAddTab :  Dispatch<SetStateAction<boolean>>;
    add : boolean;
}

const schema = Joi.object({
    id : Joi.allow(),
    title : Joi.string().required(),
    price : Joi.number().required(),
    content : Joi.string().required(),
    image : Joi.string().required()
})

export default function AddProduct({setAddTab, add} : IAddProductProp){
    const {create, fetcher} = useCrud(`${process.env.NEXT_PUBLIC_URL_API}/products`, 'PRODUCT_API');


    const { control, register, handleSubmit, formState: { errors }  } = useForm<IProduct>({
        resolver: joiResolver(schema),
    });
    const onSubmit = async (data : IProduct) => {
      await create(data as any, true);
      toast.success(`Add product "${data.title}" success`);
      setAddTab(false)

    }
  
    return (<>
       <Modal title='Add product' open={add} onCancel={() => setAddTab(false)}>
        <Form
          layout="vertical" 
          name='nest-messages'
        
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item  label='Title'  validateStatus={errors.title ? 'error' : ''} help={errors.title?.message}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
          </Form.Item>

          <Form.Item  label='Price' validateStatus={errors.price ? 'error' : ''} help={errors.price?.message}>
               <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
          </Form.Item>

          <Form.Item label='Content' validateStatus={errors.content ? 'error' : ''} help={errors.content?.message} >
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
          </Form.Item>

          <Form.Item  label='Image' validateStatus={errors.image ? 'error' : ''} help={errors.image?.message} >
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
          </Form.Item>


          
          <Form.Item >
            <Button loading={fetcher.loading} disabled={fetcher.loading} type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    
    </>)
}