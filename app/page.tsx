"use client"

import { useState } from "react";

type InventoryType =
  {
    id: number,
    name: string,
    price: number,
    quantity: number
  }

export default function Home() {

  const [cashBox, setCashBox] = useState(0);

  const [inventory, setInventory] = useState([
    { id: 1, name: "Laptop", price: 200, quantity: 5 },
    { id: 2, name: "Phone", price: 100, quantity: 15 },
    { id: 3, name: "Microwave", price: 500, quantity: 2 },
    { id: 4, name: "Pen", price: 10, quantity: 20 },
  ])

  const [newInventory, setNewInventory] = useState({
    id: 0,
    name: "",
    price: 0,
    quantity: 0
  })

function search(e){
 console.log(e.target.value)
  setInventory(current=>
      current.filter(item=>
        item.name.includes(e.target.value)
      )
    )
  
}

  function delet(inv:InventoryType){
    setInventory(current=>
      current.filter(item=>
        item.id !=inv.id
      )
    )

  }

  function sellItem(inv: InventoryType) {
    if (inv.quantity < 1) {
      return
    }

    setInventory(current =>
      current.map(item =>
        item.id === inv.id ? { ...item, quantity: item.quantity - 1 } : item
      )
    )

    setCashBox(current => current + inv.price)
  }

  return (
    <div className="">

       <div>
        <input onChange={(e) => {

         search(e)

        }}
          type="text" className="border p-1" placeholder="Search Item" />
      </div>

      <h1 className="text-4xl">Inventory Tracker</h1>

      <div className="text-2xl">Cash Box: {cashBox}</div>

      <form
        onSubmit={(e) => {
          e.preventDefault()

          setNewInventory(current => ({ ...current, id: Date.now() }))

          setInventory(current => ([newInventory, ...current]))
        }}>
        <input type="text"
          placeholder="Name"
          className="border"
          value={newInventory.name}
          onChange={(e) => setNewInventory(current =>
            ({ ...current, name: e.target.value })
          )}
        />

        <input type="number"
          placeholder="Price"
          className="border"
          value={newInventory.price}
          onChange={(e) => setNewInventory(current =>
            ({ ...current, price: parseInt(e.target.value) })
          )}
        />

        <input type="number"
          placeholder="Quantity"
          className="border"
          value={newInventory.quantity}
          onChange={(e) => setNewInventory(current =>
            ({ ...current, quantity: parseInt(e.target.value) })
          )}
        />

        <button type="submit">
          Submit
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Action</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map(inv =>
            <tr key={inv.id}>
              <td>
                {inv.name}
              </td>
              <td>
                {inv.quantity}
              </td>
              <td>
                {inv.price}
              </td>
              <td className="p-2">
                <button
                  disabled={inv.quantity < 1}
                  onClick={() => sellItem(inv)}
                  className="bg-blue-700 text-white p-2 disabled:bg-gray-700">
                  Sell
                </button>
              </td>
               <td>
                  <button
                  onClick={() => delet(inv)}
                  className="bg-red-700 text-white p-2 "> Delete</button>
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}