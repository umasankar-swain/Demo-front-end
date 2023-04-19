import { useEffect } from 'react'
import { React, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateProduct() {
    let auth = JSON.parse(localStorage.getItem('user'))
    // let userId=auth._id
    const [product, setUpdateProduct] = useState({
        name: "",
        price: "",
        category: "",
        userId: `${auth._id}`,
        company: ""
    })
    const navigate=useNavigate()
    const params = useParams()
    useEffect(() => {
        getProductDetails()
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        setUpdateProduct(result)
    }

    const handleChange = (e) => {
        setUpdateProduct({ ...product, [e.target.name]: e.target.value })
    }
    const UpdateProduct = async () => {
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'Put',
            body: JSON.stringify({...product}),
            headers:{
                'Content-type':"application/json"
            }
        })
        result=await result.json()
        navigate('/')
    }

    // useEffect(()=>{
    //     if()
    // })

    return (
        <div>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-12 login-form-1">
                        <h3>Update Product</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="">Product name</label>
                                <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} placeholder="enter product name *" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Price</label>
                                <input type="text" className="form-control" name="price" value={product.price} onChange={handleChange} placeholder="enter product price *" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Category</label>
                                <input type="text" className="form-control" name="category" value={product.category} onChange={handleChange} placeholder="enter product category *" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Company</label>
                                <input type="text" className="form-control" name="company" value={product.company} onChange={handleChange} placeholder="enter product company *" />
                            </div>

                            <div className="form-group d-flex justify-content-center">
                                <input type="button" onClick={UpdateProduct} className="btnSubmit" value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
