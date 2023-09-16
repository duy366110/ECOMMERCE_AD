import React from 'react';
import { useSelector } from 'react-redux';
import config from "../../../configs/config.env";
import CommonButtonComponent from "../Common-Button-Component/Common-Button-Component";
import classes from "./Common-Table-Component.module.css";

const CommonTableComponent = (props) => {
  const auth = useSelector((state) => state.auth);
  const pagination = useSelector((state) => state.pagination);

    return (
        <div className={classes['table-component']}>
          <table className="table table-hover">
              {/* PHẦN ĐẦU CỦA BẢN */}
              <thead>
                <tr>
                  {props?.head.length > 0 && props?.head.map((head, index) => {
                    return (
                      <>
                        {head === 'Action' && auth.role === 'Admin' && (
                          <th key={index}>{head}</th>
                        )}

                        {head !== 'Action' && (
                          <th key={index}>{head}</th>
                        )}
                      </>
                    )
                  })}
                </tr>
              </thead>

              {/* PHẦN THÂN CỦA BẢNG */}
              <tbody>

                {/* PHẦN NỘI DUNG BẢNG PHÂN QUYỀN */}
                {props?.type === 'role' && props?.list.length > 0 && props?.list.map((elm, index) => {

                  return (
                    <tr key={elm._id}>
                      <th scope="row">{((pagination.role.elementOfPage * pagination.role.currentPage) + index) + 1}</th>
                      <td>{elm.name}</td>
                      <td>{elm.users.length}</td>
                      
                      {auth.role === 'Admin' && (
                        <td>
                          <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                          <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                        </td>
                      )}
                      
                    </tr>
                  )
                })}

                {/* PHẦN NỘI DUNG BẢNG CỦA USERS */}
                {props?.type === 'user' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{((pagination.user.elementOfPage * pagination.user.currentPage) + index) + 1}</th>
                        <td style={{minWidth: '135px'}}>{elm.username}</td>
                        <td style={{minWidth: '180px'}}>{elm.fullname}</td>
                        <td>{elm.email}</td>
                        <td style={{minWidth: '135px'}}>{elm.phonenumber}</td>
                        <td>{elm.cart.length}</td>
                        <td>{elm.order.length}</td>
                        <td>{elm.role.name}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG CỦA CATEGORY */}
                  {props?.type === 'category' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{((pagination.category.elementOfPage * pagination.category.currentPage) + index) + 1}</th>
                        <td>{elm.title}</td>
                        <td>{elm.collections.length}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG BẢNG  PRODUCT */}
                  {props?.type === 'product' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{((pagination.product.elementOfPage * pagination.product.currentPage) + index) + 1}</th>
                        <td>{elm.name}</td>
                        <td>{Number(elm?.price.$numberDecimal).toFixed(3)}</td>
                        <td>
                          <img src={`${config.URI.replace('api/', '').trim()}${elm?.images[0]}`} alt="image product" />
                        </td>
                        <td>{elm.category?.title}</td>
                        <td>{elm.quantity}</td>
                        <td>{elm.ref}</td>

                        {auth.role === 'Admin' && (
                          <td>
                            <CommonButtonComponent click={props.edit} kind="contained" title="Edit"  type="button" id={elm._id}/>
                            <CommonButtonComponent click={props.delete} kind="contained" title="Delete"  type="button" id={elm._id}/>
                          </td>
                        )}
                      </tr>
                    )
                  })}

                  {/* PHẦN NỘI DUNG BẢNG  ORDER */}
                  {props?.type === 'order' && props?.list.length > 0 && props?.list.map((elm, index) => {
                    return (
                      <tr key={elm._id}>
                        <th scope="row">{((pagination.product.elementOfPage * pagination.product.currentPage) + index) + 1}</th>
                        <td style={{minWidth: '195px'}}>{elm?.fullName}</td>
                        <td>{elm.email}</td>
                        <td style={{minWidth: '135px'}}>{elm?.phone}</td>
                        <td style={{minWidth: '135px'}}>{elm?.address}</td>
                        <td style={{minWidth: '135px'}}>{elm?.total.toFixed(6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VND</td>
                        <td style={{minWidth: '135px'}}>Chưa vận chuyển</td>
                        <td style={{minWidth: '135px'}}>Chưa thanh toán</td>
                        <td>
                          <CommonButtonComponent click={props.edit} kind="contained" title="View"  type="button" id={elm._id}/>
                        </td>
                      </tr>
                    )
                  })}

              </tbody>

          </table>
        </div>
    )
}

export default CommonTableComponent;