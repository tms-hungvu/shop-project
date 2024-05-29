import { Button, Form, Input, Modal } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { IProduct } from "@/interface/product.interface";
import { useCrud } from "@/hooks/useCrud";
import { toast } from "react-toastify";
interface IEditProductProp {
    dataEdit : IProduct | null;
    setEditTab :  Dispatch<SetStateAction<boolean>>;
    edit : boolean;
}

const schema = Joi.object({
    id : Joi.allow(),
    key : Joi.allow(),
    title : Joi.string().required(),
    price : Joi.number().required(),
    content : Joi.string().required(),
    image : Joi.string().required()
})

export default function EditProduct({dataEdit, setEditTab, edit} : IEditProductProp){
    const {update, fetcher} = useCrud(`products`, 'PRODUCT_API');


    const {reset, control, register, handleSubmit, formState: { errors }  } = useForm<IProduct>({
        resolver: joiResolver(schema),
    });
  
    const onSubmit = async (data : any) => {
      delete data.key;
      await update(data, false, `products/${data.id}`);
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
            <Button loading={fetcher.loading} disabled={fetcher.loading} danger  type="primary" htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    
    </>)
}