import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface IBaseInput {
    control : any;
    title : string;
    name : string;
    messageError : string;
    placeholder : string;
}
export default function BaseInput({control ,title, name, messageError, placeholder} : IBaseInput){
     return (<Form.Item  label={title}  validateStatus={messageError ? 'error' : ''} help={messageError}>
     <Controller
         name={name}
         control={control}
         render={({ field }) => <Input placeholder={placeholder} {...field} />}
     />
</Form.Item>)
}