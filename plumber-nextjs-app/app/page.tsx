// app/page.tsx

'use client'

import { useState, ChangeEvent } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [echo, setEcho] = useState('')
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [sum, setSum] = useState<number | null>(null)
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [mapUrl, setMapUrl] = useState('')

  const handleEcho = async () => {
    const response = await fetch(`/api/echo?msg=${encodeURIComponent(message)}`)
    const data: { msg: string } = await response.json()
    setEcho(data.msg)
  }

  const handleSum = async () => {
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: num1, y: num2 }),
    })
    const data: { result: number } = await response.json()
    setSum(data.result)
  }

  const handleMap = async () => {
    const response = await fetch(`/api/map?lat=${lat}&lon=${lon}`)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setMapUrl(url)
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value)

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Next.js with R Plumber</h1>
      
      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={handleInputChange(setMessage)}
          placeholder="Enter a message"
          className="border p-2 mr-2"
        />
        <button onClick={handleEcho} className="bg-blue-500 text-white p-2">Echo</button>
        {echo && <p className="mt-2">Echo: {echo}</p>}
      </div>

      <div>
        <input
          type="number"
          value={num1}
          onChange={handleInputChange(setNum1)}
          placeholder="Enter first number"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={num2}
          onChange={handleInputChange(setNum2)}
          placeholder="Enter second number"
          className="border p-2 mr-2"
        />
        <button onClick={handleSum} className="bg-green-500 text-white p-2">Sum</button>
        {sum !== null && <p className="mt-2">Sum: {sum}</p>}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={lat}
          onChange={handleInputChange(setLat)}
          placeholder="Enter latitude"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={lon}
          onChange={handleInputChange(setLon)}
          placeholder="Enter longitude"
          className="border p-2 mr-2"
        />
        <button onClick={handleMap} className="bg-yellow-500 text-white p-2">Show Map</button>
      </div>

      {mapUrl && (
        <div className="mt-4">
          <iframe src={mapUrl} width="100%" height="400" frameBorder="0"></iframe>
        </div>
      )} 
    </main>
  )
}