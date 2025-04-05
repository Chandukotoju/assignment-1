import { useState } from 'react'


function App() { 
  
  const [cartItems,setCartItems]=useState([])
  const products = [
    { id: 1, name: "Laptop", price: 500 },
    { id: 2, name: "Smartphone", price: 300 },
    { id: 3, name: "Headphones", price: 100 },
    { id: 4, name: "Smartwatch", price: 150 },
  ]; 
  
  const subTotal=cartItems.reduce((total,item)=>total+item.price*item.quantity,0) 
  console.log(subTotal)

  const addToCart=(product)=>{ 
    
     const existingItem=cartItems.find((item)=>(item.id==product.id)) 
     if (existingItem){
      const updatedCart=cartItems.map(item=>(
        item.id===product.id ?{...item,quantity:item.quantity+1}:item
      )); 
      setCartItems(updatedCart)
     }
     else{
      setCartItems([...cartItems,{...product,quantity:1}]);
     }
  } 

  const increaseQuantity = (productId)=>{
    setCartItems(cartItems.map(item=>
      item.id===productId ? {...item,quantity:item.quantity+1}:item
    ))
  } 

  const decreaseQuantity=(productId)=>{
    setCartItems(cartItems.map(item=>
      item.id===productId ? {...item,quantity:item.quantity-1}:item
    ).filter(item=>item.quantity >0)
  )
  }
  
  return(
    <div className='bg-gray-500 min-h-screen'>
      <h1 className='text-center'>shopping cart</h1> 
      <div className='ml-9'>
        <p>products list</p> 
        <div className='flex justify-around mt-6'>
          {products.map((product)=>(
            <div key={product.id} className='border-1 border-gray-100 p-4 bg-gray-500 gap-6' >
              <p>{product.name}</p> 
              <p>price: {product.price}</p>
              <button className='bg-blue-500 text-white' onClick={()=>addToCart(product)}>Add to cart</button>
            </div>
          ))}
        </div> 
        <div className='mt-6 text-white'>
          <h1>Cart Summary</h1> 
          <div className='m-7 gap-9'>
            <h1>sub total :<span className='ml-9'>{subTotal}</span></h1> 
            {subTotal>1000 ?(<p>you got a free wireless blue tooth</p>):(<p>add {1000-subTotal} more to get a free gift</p>)}
          </div>
        </div> 
        <div className='mt-6 text-white'>
          <h1>Cart Items</h1> 
          {cartItems?.map((item)=>(
            <div className='mt-4' key={item.id}>
             <p>{item.name}</p>
             <div className='flex justify-around'>
              <p>{item.price} * {item.quantity} = {item.price*item.quantity}</p> 
              <div className='flex gap-3'>
                <p className='bg-red-500 p-2 text-white' onClick={()=>decreaseQuantity(item.id)}>-</p> 
                <p>{item.quantity}</p> 
                <p className='bg-green-500 p-2 text-white' onClick={()=>increaseQuantity(item.id)}>+</p>
              </div>
             </div>
            </div>
          ))}
          {subTotal>=1000 && (
            <div className='mt-4'>
            <p>wireless bluetooth</p>
            <div className='flex justify-around'>
             <p>{`0 * 1 = 0`}</p> 
             <div className='flex gap-3'>
               <p className='bg-green-500 p-2 text-white'>FREE GIFT</p> 
               
             </div>
            </div>
           </div>
          )}
        </div> 
        
      </div>
    </div>
  )
}
export default App
