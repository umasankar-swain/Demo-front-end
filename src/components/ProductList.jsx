import { useEffect } from "react"
import { React, useState } from "react"
import { Link } from 'react-router-dom'

export default function ProductList() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/get-products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        setProduct(result)
    }
    const deleteProduct = async (id) => {
        let result = fetch(`http://localhost:5000/del-product/${id}`, {
            method: 'Delete'
        })
        result = (await result).json()
        if (result) {
            alert('Record is deleted...')
            getProducts()
        }
    }

    const SearchHandle = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/product/search/${key}`)
            result = await result.json()
            if (result) {
                setProduct(result)
            }
        }else{
            getProducts()
        }

    }

    return (
        <div className="login-container">
            <h2>Product list</h2>
            <input className="search-box" type="text" placeholder="Search Here"
                onChange={SearchHandle}
            />
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Serial No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Operation</th>
                    </tr>
                </thead>
                {
                    product.length>0?
                    product.map((item, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row" key={item._id}>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <div class="hstack gap-2">
                                            <button type="button" class="btn btn-danger"
                                                onClick={() => deleteProduct(item._id)}
                                            >
                                                Delete</button>
                                            <div class="vr"></div>
                                            <Link to={`/update/${item._id}`}>
                                                <button type="button" class="btn btn-success">Update</button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )

                    })
                    :
                    <tr><h1 style={{color: "black"}}>No Result Found</h1></tr>
                    
                }
            </table>
        </div>
    )
}
