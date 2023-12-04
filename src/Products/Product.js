import React from 'react'
import "./Product.css"

function Product(props) {
    return (

        <tr>
        <td>{props.packageName}</td>
        <td>{props.packageDescription}</td>
        <td>${props.packagePrice}</td>
        <td>{props.tenure}</td>
        <td>
            <input type="checkbox" name="item1" />
        </td>
        </tr>
    )
}

export default Product
