import React from 'react'
import { CartContext } from '../App.jsx'
import { useContext } from 'react'

const Cart = () => {
  const { cart, setCart } = useContext(CartContext)

  const handelDelete = (id) => {
    let updatedCart = cart.filter(c => c.id !== id)
    setCart(updatedCart)
  }   //handelremove function

  const handelClearCart = () => {
    setCart([])
  }

  const handelChange = (e, item) => {
    const value = parseInt(e.target.value) || 1

    const updated = cart.map(c => {
      if (c.id === item.id) {
        return { ...c, quantity: value }
      }
      return c
    })
    setCart(updated)
  }

  const handelQtyIncrement = (item) => {
    const updated = cart.map(c => {
      if (c.id === item.id) {
        return { ...c, quantity: c.quantity + 1 }
      }
      return c
    })
    setCart(updated)
  }

  const handelQtyDecrement = (item) => {
    const updated = cart.map(c => {
      if (c.id === item.id) {
        const newQty = c.quantity - 1
        return { ...c, quantity: newQty > 1 ? newQty : 1 }
      }
      return c
    })
    setCart(updated)
  }

  // Calculate grand total
  const grandTotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  return (
    <div className='container'>
      <table className="table">
        <thead style={{ background: 'black', color: 'white' }}>
          <tr>
            <th scope="col" className='tabel-heading'>image</th>
            <th scope="col" className='tabel-heading'>Title</th>
            <th scope="col" className='tabel-heading'>Price</th>
            <th scope="col" className='tabel-heading'>Quantity</th>
            <th scope="col" className='tabel-heading'>Total</th>
            <th scope="col" className='tabel-heading'>Delete</th>
          </tr>
        </thead>

        <tbody>
          {cart.map(item => (
            <tr key={item.id} style={{ marginBlock: '1rem', border: '1px solid black', padding: '20px 40px' }}>
              <td><img width={50} src={item.image} alt="" /></td>
              <td>{item.title}</td>
              <td>{item.price}</td>

              <td>
                <div className='d-flex'>
                  <button className='btn bg-custom' onClick={() => handelQtyDecrement(item)}>-</button>

                  <input
                    type="number"
                    className='form-control'
                    value={item.quantity}
                    onChange={(e) => handelChange(e, item)}
                    style={{ width: '50px' }}
                  />

                  <button className='btn bg-custom' onClick={() => handelQtyIncrement(item)}>+</button>
                </div>
              </td>

              <td>{item.price * item.quantity}</td>

              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => handelDelete(item.id)} >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grand Total */}
      <h3 className='mt-3'>Grand Total: {Math.ceil(grandTotal)}/-Rs</h3>

      <button className='btn btn-danger mt-2' onClick={handelClearCart}>Clear Cart</button>
    </div>
  )
}

export default Cart
