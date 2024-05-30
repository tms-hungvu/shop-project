import { IProduct } from "@/interface/product.interface";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { Tag } from 'antd';
import classNames from "classnames/bind";
import styles from "./Product.module.scss";

import { useCrud } from "@/hooks/useCrud";
import { useState } from "react";
import AddProduct from "./_components/Add";
import EditProduct from "./_components/Edit";
import { toast } from "react-toastify";
import { Typography } from 'antd';

const { Title } = Typography;
const cx = classNames.bind(styles);
export default function ListProduct() {
  const [add, setAddTab] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IProduct | null>(null);
  const [edit, setEditTab] = useState<boolean>(false);

  const {fetcher, remove} = useCrud(`products`, 'PRODUCT_API');
  

  
  const dataSource = fetcher?.data?.map((item : IProduct) => {
    return {
        ...item,
        key : item.id
    }
  });

  const confirm = async (id : number | string) => {
      await remove(false, id );
      toast.success(`Delete product success`)
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price : number) => <span>{price}$</span>
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image : string) => <img src={image} alt="" width={110} />
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (item : IProduct) => <div className={cx('cursorPointed')}>
            <Tag onClick={() => {
                setEditTab(true);
                setDataEdit(item)
            }}  icon={<FormOutlined />} color="#d1b307">
              Edit
            </Tag>

                <Popconfirm
                    disabled={fetcher.loading}
                    title="Delete the product"
                    description={`Are you sure to delete "${item.title}" ?`}
                    onConfirm={() => confirm(String(item.id))}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tag  icon={<DeleteOutlined />} color="#EC2E21">
                        Delete
                    </Tag>
                  </Popconfirm>
            
        </div>,
      },
  ];

  return (
   <>
   <EditProduct dataEdit={dataEdit} setEditTab={setEditTab} edit={edit}/>
   {add && <AddProduct add={true} setAddTab={setAddTab}/>}
    <div style={{ marginTop: "100px" }}>
      <div className="container">
      <Title level={3}>List products</Title>
        <Table 
            loading={fetcher.loading}
            pagination={{ 
                defaultPageSize: 5, 
                showSizeChanger: true, 
                pageSizeOptions: ['5', '50', '100']
            }} 
            dataSource={dataSource}
            columns={columns}
            bordered
         />
         
      </div>
      <div className="container">
        <Button type="primary" danger onClick={() => setAddTab(true)} >
            Add product
        </Button>
      </div>
    </div>
   </>
  );
}