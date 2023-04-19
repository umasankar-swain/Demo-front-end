import {React,useState} from 'react'

export default function AddProduct() {
    let auth=JSON.parse(localStorage.getItem('user'))
    // let userId=auth._id
    const [product,setProduct]=useState({
        name:"",
        price:"",
        category:"",
        userId:`${auth._id}`,
        company:""
    })

    const handleChange=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleClick= async ()=>{
        console.log(product)
        let result=await fetch('http://localhost:5000/add-product',{
        method:'post',
        body: JSON.stringify({ ...product }),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        result=await result.json()
        console.log(result)
    }
  return (
    <div>
      <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form-1">
                    <h3>Add Product</h3>
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
                            <input type="text" className="form-control" name="company" value={product.company}  onChange={handleChange} placeholder="enter product company *" />
                        </div>

                        <div className="form-group d-flex justify-content-center">
                            <input type="button" onClick={handleClick} className="btnSubmit" value="Add"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
